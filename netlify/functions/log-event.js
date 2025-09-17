import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.SUPABASE_URL,
    ssl: { rejectUnauthorized: false },
});

export async function handler(event, context) {
    try {
        console.log("DB_URL: ", process.env.SUPABASE_URL);
        const body = event.body ? JSON.parse(event.body) : null;
        console.log("TRACK_EVENT:", JSON.stringify(body));

        const query = `
            INSERT INTO weather_dashboard.user_analytics (user_session_id, action, operation)
            VALUES ($1, $2, $3)
            RETURNING id, user_session_id;
        `;
        const values = [body.sessionId, body.eventName, body.eventData];

        const result = await pool.query(query, values);
        console.log("Event logged successfully on sessionId: ", body.sessionId);
        return {
            statusCode: 200,
            body: JSON.stringify({ ok: true, result: result.rows[0] }),
        };
    } catch (error) {
        console.error("DB Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "DB Insert failed." }),
        };
    }
}
