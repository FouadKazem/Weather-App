import CustomAPIError from './custom-api-error'

class BadRequestError extends CustomAPIError {
    constructor(message: string) {
        super(400, message)
    }
}

export default BadRequestError