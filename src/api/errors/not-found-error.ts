import CustomAPIError from './custom-api-error'

class NotFoundError extends CustomAPIError {
    constructor(message: string) {
        super(404, message)
    }
}

export default NotFoundError