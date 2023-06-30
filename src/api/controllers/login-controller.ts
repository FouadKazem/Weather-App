import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import signVerifyOptions from '../config/sign-verify-options'
import LoginRequestBody from '../interfaces/login-request-body'
import User from '../models/user-model'

async function login(req: Request, res: Response) {
    const { email, password }: LoginRequestBody = req.body
    const user = await User.findOne({
        where: {
            email,
            password
        }
    })
    if (user == null) {
        res.status(404).json({ 
            status: 'FAILED',
            message: 'Email/Password not correct please try again'
        })
    }
    else {
        const token = jwt.sign({
            id: user.dataValues.id
        }, process.env.JWT_SECRET as string, signVerifyOptions as jwt.SignOptions)
        res.setHeader('Authorization', `Bearer ${token}`)
        res.status(200).json({ status: 'SUCCESS', message: 'Login process done successfully' })
    }
}

export { login }