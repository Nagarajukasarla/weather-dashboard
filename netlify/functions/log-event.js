import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.SUPABASE_URL,
    ssl: { rejectUnauthorized: false },
});

// Function to safely parse JSON from request body
const parseRequestBody = async event => {
    try {
        if (!event.body) return {};
        return typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    } catch (error) {
        console.error("Error parsing request body:", error);
        return {};
    }
};

export async function handler(event, context) {
    try {
        console.log("DB_URL: ", process.env.SUPABASE_URL);

        // Parse the request body using our helper function
        const body = await parseRequestBody(event);
        if (!body || Object.keys(body).length === 0) {
            throw new Error("Invalid request body");
        }

        console.log("TRACK_EVENT:", JSON.stringify(body, null, 2));

        // Use client IP from the request body, fallback to server-detected IP
        const clientIp = body.clientIp || getClientIp(event.headers);

        // Get location data if IP is available
        let location = {};
        if (clientIp && clientIp !== "unknown") {
            try {
                const resp = await fetch(
                    `http://ip-api.com/json/${clientIp}?fields=status,country,regionName,city,query`
                );
                location = await resp.json();
            } catch (locationError) {
                console.error("Error fetching location data:", locationError);
                // Continue without location data if the API call fails
            }
        }

        const query = `
            INSERT INTO weather_dashboard.user_analytics 
            (user_session_id, action, operation, ip, location, user_agent)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, user_session_id;
        `;

        const values = [
            body.sessionId,
            body.eventName,
            body.data,
            clientIp,
            JSON.stringify(location),
            body.data?.userAgent || null,
        ];

        const result = await pool.query(query, values);
        console.log("Event logged successfully for sessionId:", body.sessionId);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ok: true,
                result: {
                    id: result.rows[0]?.id,
                    sessionId: body.sessionId,
                },
            }),
        };
    } catch (error) {
        console.error("Error processing request:", error);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ok: false,
                error: "Failed to log event",
            }),
        };
    }
}
