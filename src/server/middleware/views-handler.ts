import { Request, Response, NextFunction } from 'express'
import path from 'path'

function viewsHandler(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.accept == 'application/json' || req.method != 'GET') {
        next()
    } else {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
    }
}

export default viewsHandler