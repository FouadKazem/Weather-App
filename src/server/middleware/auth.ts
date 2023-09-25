import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import signVerifyOptions from '../config/sign-verify-options'
import { UnauthorizedError } from '../errors'

function auth(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        next(new UnauthorizedError('No token provided'))
    }
    else {
        try {
            const token = authHeader.split(' ')[1]
            const decoded: any = jwt.verify(
                token, 
                fs.readFileSync(path.join(__dirname, '..', 'secret.key'), 'utf8'),
                signVerifyOptions
            )
            req.body = {
                ...req.body,
                id: decoded.id
            }
            next()
        } catch (error) {
            next(new UnauthorizedError('Authentication failed! Please login again'))
        }
    }
}

export default auth