import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import signVerifyOptions from '../config/sign-verify-options'
import SignupRequestBody from '../interfaces/signup-request-body'
import User from '../models/user-model'
import { BadRequestError } from '../errors'

async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { firstName, lastName, email, password }: SignupRequestBody = req.body
        const user = User.build({
            first_name: firstName,
            last_name: lastName,
            email,
            password
        })
        await user.validate()
        let id = crypto.randomUUID()
        if (id == '00000000-0000-0000-0000-000000000000') {
            id = crypto.randomUUID()
        }
        user.setDataValue('id', id)
        await user.save()

        const token = jwt.sign(
            { id: user.dataValues.id },
            fs.readFileSync(path.join(__dirname, '..', 'secret.key'), 'utf8'),
            signVerifyOptions as jwt.SignOptions
        )
        res.setHeader('Authorization', `Bearer ${token}`)
        res.status(201).json({ status: 'SUCCESS', message: 'User created successfully' })
    } catch (error) {
        next(new BadRequestError('Please, submit valid data!'))
    }
}

export { signup }