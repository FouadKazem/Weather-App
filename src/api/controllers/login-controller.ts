import { Request, Response } from 'express'
import User from '../models/user-model'

async function login(req: Request, res: Response) {
    res.send('login route')
}

export { login }