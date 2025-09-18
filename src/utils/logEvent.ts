import { getSessionId } from "@/utils/uuidGenerator";
import logger from "./logger";

interface EventData extends Record<string, any> {
    userAgent?: string;
    timestamp?: string;
}

interface LogEventResponse {
    ok: boolean;
    result?: {
        id: string;
        sessionId: string;
    };
    error?: string;
}

export const logEvent = async (eventName: string, data: EventData = {}): Promise<void> => {
    try {
        const payload = {
            sessionId: getSessionId(),
            eventName,
            data: {
                ...data,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString(),
            },
        };

        const response = await fetch("/.netlify/functions/log-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: LogEventResponse = await response.json();

        if (result.ok) {
            logger.log("Event logged successfully", {
                sessionId: result.result?.sessionId,
                eventName,
            });
        } else {
            throw new Error(result.error || "Unknown error logging event");
        }
    } catch (error) {
        logger.error("Failed to log event", {
            error: error instanceof Error ? error.message : String(error),
            eventName,
        });
    }
};
