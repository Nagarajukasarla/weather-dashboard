import { getSessionId } from "@/utils/uuidGenerator";
import logger from "./logger";

// Function to get client's IP address
const getClientIp = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || 'unknown';
  } catch (error) {
    console.error('Failed to get IP address:', error);
    return 'unknown';
  }
};

export const logEvent = async (eventName: string, data: Record<string, any> = {}) => {
    try {
        const clientIp = await getClientIp();
        const payload = {
            sessionId: getSessionId(),
            eventName,
            clientIp,
            data: {
                ...data,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString(),
            },
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
            logger.log("Event logged successfully on sessionId: ", result.result);
        } else {
            logger.error("Failed to log event", result.error);
        }
    } catch (error) {
        logger.error("Failed to log event", error);
    }
};