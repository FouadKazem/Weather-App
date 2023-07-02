import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import signVerifyOptions from '../config/sign-verify-options'

function auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ 
            status: 'FAILED',
            message: 'No token provided'
        })
    }
    else {
        try {
            const token = authHeader.split(' ')[1]
            const decoded: any = jwt.verify(
                token, 
                fs.readFileSync(path.join(__dirname, '..', 'jwt.key'), 'utf8'),
                signVerifyOptions
            )
            req.body = {
                ...req.body,
                id: decoded.id
            }
            next()
        } catch (error) {
            res.status(401).json({ 
                status: 'FAILED',
                message: 'Authentication failed! Please login again'
            })
        }
    }
}

export default auth