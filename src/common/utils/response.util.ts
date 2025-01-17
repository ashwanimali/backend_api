export class ResponseUtil {
    static success(data: any, message = 'Operation successful') {
        return {
            status: 'success',
            message,
            data,
        };
    }

    static error(error: any, message = 'Operation failed') {
        return {
            status: 'error',
            message,
            error,
        };
    }
}
