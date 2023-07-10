import { Request, Response, NextFunction } from 'express'

async function getDefaultCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    const url = 'https://api.open-meteo.com/v1/forecast?' +
        `latitude=${25.0772}&` + 
        `longitude=${55.3093}&` + 
        `timezone=${'auto'}&` + 
        `current_weather=${true}&` +
        `forecast_days=${7}&` +
        `hourly=${'temperature_2m,relativehumidity_2m,apparent_temperature,windspeed_10m,winddirection_10m,precipitation,snowfall,precipitation_probability,weathercode,snow_depth,visibility,is_day'}&` +
        `daily=${'precipitation_probability_mean,weathercode,sunrise,sunset,windspeed_10m_max'}`
    const response = await fetch(url)
    const data = await response.json()
    res.status(200).json({ status: 'SUCCESS', data })
}

async function getCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.status(200).send('<h1>weather route</h1>')
}

export { getDefaultCity, getCity }