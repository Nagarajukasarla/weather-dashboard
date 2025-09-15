export async function handler(event, context) {
    const body = event.body ? JSON.parse(event.body) : null;
    console.log("TRACK_EVENT:", JSON.stringify(body));
    // In furture will write code to send data to supabase here 
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
}