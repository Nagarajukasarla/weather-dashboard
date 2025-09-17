import { getSessionId } from "@/utils/uuidGenerator";

export const logEvent = async (eventName: string, data: Record<string, any> = {}) => {
    try {
        const payload = {
            sessionId: getSessionId(),
            eventName,
            data: {...data, timestamp: new Date().toISOString()},
        };
        const response: Response = await fetch("/.netlify/functions/log-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const result: any = await response.json();

        if (result.ok) {
            console.log("Event logged successfully on sessionId: ", result.result);
        } else {
            console.error("Failed to log event", result.error);
        }
    } catch (error) {
        console.error("Failed to log event", error);
    }
};