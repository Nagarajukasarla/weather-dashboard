import { getSessionId } from "@/utils/uuidGenerator";

export const logEvent = async (eventName: string, data: Record<string, any> = {}) => {
    try {
        const payload = {
            sessionId: getSessionId(),
            eventName,
            data,
            time: new Date().toISOString(),
        };
        await fetch("/.netlify/functions/log-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
    } catch (error) {
        console.error("Failed to log event", error);
    }
};