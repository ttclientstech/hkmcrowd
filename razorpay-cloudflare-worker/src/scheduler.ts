// src/scheduler.ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { campaigns, paymentTable, campaignerStreaks, leaderboard } from './db/schema'; // Adjust path if needed
import { desc, sql } from 'drizzle-orm';

// --- HELPER FUNCTION ---
async function updateLeaderboardEntry(db, category, data) {
    if (!data) return;

    // Extract fields safely
    const id = data.id || data.campaign_id;
    const name = data.name || data.campaign_name;
    const img = data.img || data.image_url;
    const val = Number(data.value);

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
}

// --- MAIN SCHEDULER HANDLER ---
export const scheduledHandler = async (event, env, ctx) => {
    console.log("Cron job started: Updating Leaderboard...");

    // Initialize DB Connection using the env passed from the worker
    const sqlneon = neon(env.DATABASE_URL);
    const db = drizzle(sqlneon);

    try {
        // A. TOP OVERALL
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
        }

        // B. TOP TODAY
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

        // C. TOP WEEK
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

        // D. TOP SINGLE DONATION
        const topSingle = await db.execute(sql`
        SELECT c.id, c.campaign_name as name, c.image_url as img, p.amount as value
        FROM userpayment p
        JOIN campaigns c ON p.campaign_id = c.id
        WHERE p.payment_status = true
        ORDER BY p.amount DESC
        LIMIT 1
      `);
        if (topSingle.rows.length > 0) await updateLeaderboardEntry(db, "top_single", topSingle.rows[0]);

        // E. MOST DONORS
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

        // F. TOP STREAK
        const topStreak = await db.execute(sql`
        SELECT c.id, c.campaign_name as name, c.image_url as img, s.current_streak as value
        FROM campaigner_streaks s
        JOIN campaigns c ON s.campaigner_id = c.id
        ORDER BY s.current_streak DESC
        LIMIT 1
      `);
        if (topStreak.rows.length > 0) await updateLeaderboardEntry(db, "top_streak", topStreak.rows[0]);

        console.log("Leaderboard updated successfully.");

    } catch (error) {
        console.error("Error running cron:", error);
    }
};