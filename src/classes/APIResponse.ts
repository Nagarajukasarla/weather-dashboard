class APIResponse<T = any> {
    public code: number;
    public data: T | null;
    public type: string;
    public description: string;

    static readonly NETWORK_ERROR = -1;

    static readonly SUCCESS = 200;
    static readonly CREATED = 201;
    static readonly PARTIAL_CONTENT = 206;

    static readonly NOT_FOUND = 404;
    static readonly REQUEST_TIMEOUT = 408;
    static readonly CONFLICT = 409;
    static readonly INTERNAL_SERVER_ERROR = 500;

    constructor(code: number, data: T | null) {
        this.code = code;
        this.data = data;
        this.type = this.getTypeFromCode(code);
        this.description = this.getDescriptionFromCode(code);

        switch (code) {
            case APIResponse.SUCCESS:
            case APIResponse.CREATED:
                this.setSuccessResponse();
                break;
            case APIResponse.NOT_FOUND:
                this.setNotFoundResponse();
                break;
            case APIResponse.CONFLICT:
                this.setConflictResponse();
                break;
            case APIResponse.INTERNAL_SERVER_ERROR:
                this.setInternalServerErrorResponse();
                break;
            case APIResponse.NETWORK_ERROR:
                this.setNetworkError();
                break;
            default:
                this.setUnknownErrorResponse();
                break;
        }
    }

    private setNotFoundResponse(): void {
        this.type = "Not Found";
        this.description = "The endpoint you're requesting is not available";
        this.data = null;
    }

    private setSuccessResponse(): void {
        this.type = "Success";
        this.description = "Request was successful";
    }

    private setConflictResponse(): void {
        this.type = "Conflict";
        this.description = "The request could not be completed due to a conflict";
        this.data = null;
    }

    private setInternalServerErrorResponse(): void {
        this.type = "Internal Server Error";
        this.description = "The server encountered an unexpected condition";
        this.data = null;
    }

    private setNetworkError(): void {
        this.type = "Network Error";
        this.code = -1;
        this.description = "Network error or request was blocked. Please check your internet connection.";
    }

    private setUnknownErrorResponse(): void {
        this.type = "Unknown";
        this.description = "Unknown error occurred";
        this.data = null;
    }

    private getTypeFromCode(code: number): string {
        switch (code) {
            case APIResponse.SUCCESS:
                return "Success";
            case APIResponse.CREATED:
                return "Created";
            case APIResponse.NOT_FOUND:
                return "Not Found";
            case APIResponse.REQUEST_TIMEOUT:
                return "Request Timeout";
            case APIResponse.CONFLICT:
                return "Conflict";
            case APIResponse.INTERNAL_SERVER_ERROR:
                return "Internal Server Error";
            case APIResponse.NETWORK_ERROR:
                return "Network Error";
            default:
                return "Unknown";
        }
    }

    private getDescriptionFromCode(code: number): string {
        switch (code) {
            case APIResponse.SUCCESS:
                return "Request successful";
            case APIResponse.NOT_FOUND:
                return "Resource not found";
            case APIResponse.INTERNAL_SERVER_ERROR:
                return "Internal server error";
            case APIResponse.REQUEST_TIMEOUT:
                return "Request timeout";
            case APIResponse.CONFLICT:
                return "Conflict";
            case APIResponse.NETWORK_ERROR:
                return "Network error";
            default:
                return "An unknown error occurred";
        }
    }
}

export default APIResponse;