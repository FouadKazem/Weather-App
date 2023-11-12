import { Request, Response, NextFunction } from 'express'
import util from 'util'

function logger(req: Request, res: Response, next: NextFunction): void {
    const request = {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body
    }
    console.log(`- Request: ${util.inspect(request, true, null, true)}`)
    next()
}

export default logger