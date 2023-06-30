import { Request, Response } from 'express'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import SignupRequestBody from '../interfaces/signup-request-body'
import User from '../models/user-model'

async function signup(req: Request, res: Response) {
    try {
        const { firstName, lastName, email, password }: SignupRequestBody = req.body
        const user = await User.create({
            id: crypto.randomUUID(),
            first_name: firstName,
            last_name: lastName,
            email,
            password
        })
        const token = jwt.sign({
            id: user.dataValues.id
        }, process.env.JWT_SECRET as string, { expiresIn: '30d'})
        res.setHeader('Authorization', `Bearer ${token}`)
        res.status(201).json({ status: 'SUCCESS', message: 'User created successfully' })
    } catch (error) {
        // console.log(JSON.parse(JSON.stringify(error)))
        res.status(400).json({ status: 'FAILED', message: 'Please, submit valid data!' })
    }
}

export { signup }