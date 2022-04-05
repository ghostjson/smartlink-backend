/**
 * SuccessResponse
 * 
 * Object used to return success message (used in controllers)
 */
export class SuccessResponse {
    message: string;

    static put() {
        return {
            message: "success"
        }
    }
}