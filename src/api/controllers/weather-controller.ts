import { NextFunction, Request, Response } from 'express'

async function getDefaultCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.status(200).send('<h1>weather route</h1>')
}

async function getCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.status(200).send('<h1>weather route</h1>')
}

export { getDefaultCity, getCity }