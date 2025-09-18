import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.SUPABASE_URL,
    ssl: { rejectUnauthorized: false },
});

const getClientIp = (headers) => {
    const ipFromXForwardedFor = headers["x-forwarded-for"]?.split(",")[0]?.trim();
    return (
      headers["x-nf-client-connection-ip"] || // Netlify-provided
      headers["cf-connecting-ip"] ||          // Cloudflare
      ipFromXForwardedFor ||                  // Generic proxy
      headers["client-ip"] || 
      "unknown"
    );
  }
  
export async function handler(event, context) {
    try {
        console.log("DB_URL: ", process.env.SUPABASE_URL);
        const body = event.body ? JSON.parse(event.body) : null;
        console.log("TRACK_EVENT:", JSON.stringify(body));

        const ip = getClientIp(event.headers);
        // Optional: lookup geo data
        let location = {};
        if (ip !== "unknown") {
            const resp = await fetch(
                `http://ip-api.com/json/${ip}?fields=status,country,regionName,city,query`
            );
            location = await resp.json();
        }
        const query = `
            INSERT INTO weather_dashboard.user_analytics (user_session_id, action, operation, ip, location)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, user_session_id;
        `;
        const values = [body.sessionId, body.eventName, body.data, ip, location];

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
