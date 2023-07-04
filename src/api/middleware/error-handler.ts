import { Request, Response, NextFunction } from 'express'
import CustomAPIError from '../errors/custom-api-error'

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof CustomAPIError) {
        res.status(error.statusCode).json({ status: 'FAILED', message: error.message })
    } else {
        res.status(500).json({ status: 'FAILED', message: 'Something went wrong' })
    }
}

export default errorHandler