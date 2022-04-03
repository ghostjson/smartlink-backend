
export class SuccessResponse {
    message: string;

    static put() {
        return {
            message: "success"
        }
    }
}