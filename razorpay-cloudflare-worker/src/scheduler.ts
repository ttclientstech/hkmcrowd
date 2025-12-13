import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { campaigns, leaderboard } from './db/schema';
import { desc, sql, eq } from 'drizzle-orm'; // ✅ Added 'eq' for deletion

// --- HELPER 1: Updates or inserts a leaderboard entry ---
async function updateLeaderboardEntry(db, category, data) {
    if (!data) return;

    const id = data.id || data.campaign_id;
    const name = data.name || data.campaign_name;
    const img = data.img || data.image_url;
    const val = Number(data.value);

    console.log(`[Leaderboard] Updating ${category}: ${name} (${val})`);

    try {
        await db.insert(leaderboard)
            .values({
                category: category,
                campaignerId: id,
                campaignerName: name,
                campaignerImage: img,
                value: val,
                lastUpdated: new Date()
            })
            .onConflictDoUpdate({
                target: leaderboard.category,
                set: {
                    campaignerId: id,
                    campaignerName: name,
                    campaignerImage: img,
                    value: val,
                    lastUpdated: new Date()
                }
            });
    } catch (dbError) {
        console.error(`[Leaderboard Error] Failed to update ${category}:`, dbError);
    }
}

// --- HELPER 2: Deletes a leaderboard entry (Clears the badge) ---
async function deleteLeaderboardEntry(db, category) {
    console.log(`[Leaderboard] No data for ${category}. Clearing entry...`);
    try {
        await db.delete(leaderboard).where(eq(leaderboard.category, category));
    } catch (error) {
        console.error(`[Leaderboard Error] Failed to delete ${category}:`, error);
    }
}

// --- CORE LOGIC ---
export async function runLeaderboardLogic(env) {
    console.log("Cron Logic: Initializing...");

    if (!env.DATABASE_URL) {
        console.error("Cron Logic Error: DATABASE_URL is missing in env!");
        return;
    }

    const sqlneon = neon(env.DATABASE_URL);
    const db = drizzle(sqlneon);

    try {
        // A. TOP OVERALL
        console.log("Cron Logic: Fetching Top Overall...");
        const topOverall = await db.select({
            id: campaigns.id,
            name: campaigns.campaignName,
            img: campaigns.imgurl,
            value: campaigns.raisedtotal
        })
            .from(campaigns)
            .orderBy(desc(campaigns.raisedtotal))
            .limit(1);

        if (topOverall.length > 0) {
            await updateLeaderboardEntry(db, "top_overall", topOverall[0]);
        } else {
            await deleteLeaderboardEntry(db, "top_overall");
        }

        // B. TOP TODAY (Critical for resetting daily stats)
        console.log("Cron Logic: Fetching Top Today...");
        const topToday = await db.execute(sql`
            SELECT c.id, c.campaign_name as name, c.image_url as img, SUM(p.amount) as value
            FROM userpayment p
                JOIN campaigns c ON p.campaign_id = c.id
            WHERE p.payment_status = true
              AND p.created_at::date = CURRENT_DATE
            GROUP BY c.id
            ORDER BY value DESC
                LIMIT 1
        `);

        if (topToday.rows.length > 0) {
            await updateLeaderboardEntry(db, "top_today", topToday.rows[0]);
        } else {
            // ✅ Fix: If no one donated today, remove the old winner
            await deleteLeaderboardEntry(db, "top_today");
        }

        // C. TOP WEEK
        console.log("Cron Logic: Fetching Top Week...");
        const topWeek = await db.execute(sql`
            SELECT c.id, c.campaign_name as name, c.image_url as img, SUM(p.amount) as value
            FROM userpayment p
                JOIN campaigns c ON p.campaign_id = c.id
            WHERE p.payment_status = true
              AND p.created_at >= date_trunc('week', CURRENT_DATE)
            GROUP BY c.id
            ORDER BY value DESC
                LIMIT 1
        `);

        if (topWeek.rows.length > 0) {
            await updateLeaderboardEntry(db, "top_week", topWeek.rows[0]);
        } else {
            // ✅ Fix: If no one donated this week, remove the old winner
            await deleteLeaderboardEntry(db, "top_week");
        }

        // D. TOP SINGLE DONATION
        console.log("Cron Logic: Fetching Top Single...");
        const topSingle = await db.execute(sql`
            SELECT c.id, c.campaign_name as name, c.image_url as img, p.amount as value
            FROM userpayment p
                JOIN campaigns c ON p.campaign_id = c.id
            WHERE p.payment_status = true
            ORDER BY p.amount DESC
                LIMIT 1
        `);

        if (topSingle.rows.length > 0) {
            await updateLeaderboardEntry(db, "top_single", topSingle.rows[0]);
        } else {
            await deleteLeaderboardEntry(db, "top_single");
        }

        // E. MOST DONORS
        console.log("Cron Logic: Fetching Most Donors...");
        const mostDonors = await db.execute(sql`
            SELECT c.id, c.campaign_name as name, c.image_url as img, COUNT(p.id) as value
            FROM userpayment p
                JOIN campaigns c ON p.campaign_id = c.id
            WHERE p.payment_status = true
            GROUP BY c.id
            ORDER BY value DESC
                LIMIT 1
        `);

        if (mostDonors.rows.length > 0) {
            await updateLeaderboardEntry(db, "most_donors", mostDonors.rows[0]);
        } else {
            await deleteLeaderboardEntry(db, "most_donors");
        }

        // F. TOP STREAK
        console.log("Cron Logic: Fetching Top Streak...");
        const topStreak = await db.execute(sql`
            SELECT c.id, c.campaign_name as name, c.image_url as img, s.current_streak as value
            FROM campaigner_streaks s
                JOIN campaigns c ON s.campaigner_id = c.id
            WHERE s.current_streak > 0
            ORDER BY s.current_streak DESC
                LIMIT 1
        `);

        if (topStreak.rows.length > 0) {
            await updateLeaderboardEntry(db, "top_streak", topStreak.rows[0]);
        } else {
            // ✅ Fix: If no active streaks exist, clear the badge
            await deleteLeaderboardEntry(db, "top_streak");
        }

        console.log("Cron Logic: Finished successfully.");

    } catch (error) {
        console.error("Cron Logic Critical Failure:", error);
        if (error instanceof Error) {
            console.error(error.stack);
        }
    }
}

// --- MAIN SCHEDULER HANDLER ---
export const scheduledHandler = async (event, env, ctx) => {
    console.log("Cron Triggered: Starting execution....");
    ctx.waitUntil(runLeaderboardLogic(env));
};