import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { campaigns, leaderboard } from './db/schema';
import { desc, sql } from 'drizzle-orm';

// --- HELPER FUNCTION: Updates or inserts a leaderboard entry ---
async function updateLeaderboardEntry(db, category, data) {
    if (!data) {
        console.log(`[Leaderboard] No data found for category: ${category}`);
        return;
    }

    // Extract fields safely to handle potential differences in raw SQL vs query builder results
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

// --- CORE LOGIC: Runs the queries and updates ---
// Exported so it can be manually triggered via API for testing if needed
export async function runLeaderboardLogic(env) {
    console.log("Cron Logic: Initializing...");

    // 1. Validate Environment
    if (!env.DATABASE_URL) {
        console.error("Cron Logic Error: DATABASE_URL is missing in env!");
        return;
    }

    // 2. Connect to DB
    const sqlneon = neon(env.DATABASE_URL);
    const db = drizzle(sqlneon);

    try {
        // A. TOP OVERALL (Highest Raised Total)
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

        if (topOverall.length > 0) await updateLeaderboardEntry(db, "top_overall", topOverall[0]);

        // B. TOP TODAY (Sum of payments created today)
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
        if (topToday.rows.length > 0) await updateLeaderboardEntry(db, "top_today", topToday.rows[0]);

        // C. TOP WEEK (Sum of payments this week)
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
        if (topWeek.rows.length > 0) await updateLeaderboardEntry(db, "top_week", topWeek.rows[0]);

        // D. TOP SINGLE DONATION (Max single amount)
        console.log("Cron Logic: Fetching Top Single...");
        const topSingle = await db.execute(sql`
            SELECT c.id, c.campaign_name as name, c.image_url as img, p.amount as value
            FROM userpayment p
            JOIN campaigns c ON p.campaign_id = c.id
            WHERE p.payment_status = true
            ORDER BY p.amount DESC
            LIMIT 1
        `);
        if (topSingle.rows.length > 0) await updateLeaderboardEntry(db, "top_single", topSingle.rows[0]);

        // E. MOST DONORS (Count of payments)
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
        if (mostDonors.rows.length > 0) await updateLeaderboardEntry(db, "most_donors", mostDonors.rows[0]);

        // F. TOP STREAK (From streaks table)
        console.log("Cron Logic: Fetching Top Streak...");
        const topStreak = await db.execute(sql`
            SELECT c.id, c.campaign_name as name, c.image_url as img, s.current_streak as value
            FROM campaigner_streaks s
            JOIN campaigns c ON s.campaigner_id = c.id
            ORDER BY s.current_streak DESC
            LIMIT 1
        `);
        if (topStreak.rows.length > 0) await updateLeaderboardEntry(db, "top_streak", topStreak.rows[0]);

        console.log("Cron Logic: Finished successfully.");

    } catch (error) {
        console.error("Cron Logic Critical Failure:", error);
        // Log stack trace for easier debugging in Cloudflare logs
        if (error instanceof Error) {
            console.error(error.stack);
        }
    }
}

// --- MAIN SCHEDULER HANDLER ---
export const scheduledHandler = async (event, env, ctx) => {
    console.log("Cron Triggered: Starting execution....");

    // ✅ CRITICAL FIX: Use ctx.waitUntil to keep the worker alive
    // This tells Cloudflare "Don't kill this worker until this promise resolves"
    ctx.waitUntil(runLeaderboardLogic(env));
};