import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.SUPABASE_URL,
    ssl: { rejectUnauthorized: false },
});

// Function to safely parse JSON from request body
const parseRequestBody = (event) => {
    try {
        if (!event.body) return {};
        return typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    } catch (error) {
        console.error('Error parsing request body:', error);
        return {};
    }
};

// Function to get client IP from Netlify headers
const getClientIp = (headers) => {
    // Netlify-specific IP header (most reliable)
    const netlifyIp = headers['x-nf-client-connection-ip'];
    
    // Common proxy headers (fallbacks)
    const forwardedFor = headers['x-forwarded-for']?.split(',')[0]?.trim();
    const clientIp = headers['client-ip'];
    const cfConnectingIp = headers['cf-connecting-ip'];
    
    return netlifyIp || cfConnectingIp || forwardedFor || clientIp || 'unknown';
};

// Cache for location data to reduce API calls
const locationCache = new Map();
const LOCATION_CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

// Function to get location data with caching
const getLocationData = async (ip) => {
    if (!ip || ip === 'unknown') return {};
    
    // Check cache first
    const cached = locationCache.get(ip);
    if (cached && (Date.now() - cached.timestamp < LOCATION_CACHE_TTL)) {
        return cached.data;
    }
    
    try {
        // Using ipapi.co which supports HTTPS and has a good free tier
        const response = await fetch(
            `http://ip-api.com/json/${ip}?fields=status,country,regionName,city,query`
          );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const location = await response.json();
        
        // Cache the result
        locationCache.set(ip, {
            data: location,
            timestamp: Date.now()
        });
        
        return location;
    } catch (error) {
        console.error('Error fetching location data:', error);
        return {};
    }
};

export async function handler(event, context) {
    // Set CORS headers
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // Parse the request body
        const body = parseRequestBody(event);
        if (!body || !body.sessionId || !body.eventName) {
            throw new Error('Missing required fields in request');
        }

        // Get client IP from headers
        const clientIp = getClientIp(event.headers);
        console.log('Client IP:', clientIp);
        
        // Get location data (non-blocking)
        const locationPromise = getLocationData(clientIp);

        // Prepare data for database
        const { sessionId, eventName, data = {} } = body;
        
        // Wait for location data with timeout
        let location = {};
        try {
            location = await Promise.race([
                locationPromise,
                new Promise(resolve => setTimeout(() => resolve({}), 1000)) // 1s timeout
            ]);
        } catch (locationError) {
            console.error('Error getting location:', locationError);
        }

        // Insert into database
        const query = `
            INSERT INTO weather_dashboard.user_analytics 
            (user_session_id, action, operation, ip, location, user_agent)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, user_session_id;
        `;
        
        const values = [
            sessionId,
            eventName,
            data,
            clientIp,
            JSON.stringify(location),
            data.userAgent || null
        ];

        const result = await pool.query(query, values);
        
        console.log('Event logged successfully:', { 
            sessionId,
            eventName,
            ip: clientIp,
            location: Object.keys(location).length > 0 ? 'found' : 'not found'
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                ok: true, 
                result: {
                    id: result.rows[0]?.id,
                    sessionId
                }
            })
        };
    } catch (error) {
        console.error('Error processing request:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                ok: false, 
                error: 'Failed to log event',
                ...(process.env.VITE_DEBUG === true && { 
                    details: error.message 
                })
            })
        };
    }
}
