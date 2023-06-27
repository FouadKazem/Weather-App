import { Request, Response } from 'express'
/* import uuid from 'uuid' */
import SignupRequestBody from '../interfaces/signup-request-body'
import User from '../models/user-model'

async function signup(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body
    try {
        
    } catch (error) {
        
    }
    res.send('Signup Route!')
}

export { signup }