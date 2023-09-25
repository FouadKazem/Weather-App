import { Model } from 'sequelize'

async function updateCityWeatherInfo(city: Model): Promise<void> {
    const { latitude, longitude } = city.dataValues
    const url = 'https://api.open-meteo.com/v1/forecast?' +
        `latitude=${latitude}&` +
        `longitude=${longitude}&` +
        `timezone=${'auto'}&` +
        `current_weather=${true}&` +
        `forecast_days=${7}&` +
        `hourly=${'temperature_2m,relativehumidity_2m,apparent_temperature,windspeed_10m,winddirection_10m,precipitation,snowfall,precipitation_probability,weathercode,snow_depth,visibility,is_day'}&` +
        `daily=${'precipitation_probability_mean,weathercode,sunrise,sunset,windspeed_10m_max'}`
    const response = await fetch(url)
    const data = await response.json()
    await city.update({
        current_weather: data.current_weather,
        hourly: data.hourly,
        daily: data.daily,
    })
}

export default updateCityWeatherInfo