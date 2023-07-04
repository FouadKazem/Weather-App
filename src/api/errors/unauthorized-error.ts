import CustomAPIError from './custom-api-error'

class UnauthorizedError extends CustomAPIError {
    constructor(message: string) {
        super(401, message)
    }
}

export default UnauthorizedError