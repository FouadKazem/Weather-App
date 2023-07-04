import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import signVerifyOptions from '../config/sign-verify-options'
import LoginRequestBody from '../interfaces/login-request-body'
import User from '../models/user-model'
import { NotFoundError } from '../errors'

async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password }: LoginRequestBody = req.body
    const user = await User.findOne({
        where: {
            email,
            password
        }
    })
    if (user == null) {
        next(new NotFoundError('Email/Password not correct please try again'))
    }
    else {
        const token = jwt.sign(
            { id: user.dataValues.id },
            fs.readFileSync(path.join(__dirname, '..', 'secret.key'), 'utf8'),
            signVerifyOptions as jwt.SignOptions
        )
        res.setHeader('Authorization', `Bearer ${token}`)
        res.status(200).json({ status: 'SUCCESS', message: 'Login process done successfully' })
    }
}

export { login }