import { Request, Response, NextFunction } from 'express'
import { Model, Op } from 'sequelize'
import { UUID } from 'crypto'
import { User, City } from '../models'
import { updateCityWeatherInfo } from '../middleware'
import { BadRequestError, NotFoundError } from '../errors'

async function getDefaultCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user_id = req.body.id
    const user = await User.findByPk(user_id)
    const userCities: UUID[] | null = user?.dataValues.cities
    if (userCities == null) {
        next(new BadRequestError('User didnt add any cities to his/her collection'))
    } else {
        const city_id = user?.dataValues.cities[0]
        const city = await City.findByPk(city_id)
        if (city?.dataValues.current_weather == null) {
            await updateCityWeatherInfo(city as Model)
        }
        const data = city?.dataValues
        delete data['createdAt']
        delete data['updatedAt']
        res.status(200).json({ status: 'SUCCESS', data })
    }
}

async function getCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    const city_id = req.params.city_id
    const city = await City.findByPk(city_id)
    if (city == null) {
        next(new NotFoundError('No such city with the given id in the params'))
    } else {
        const user_id = req.body.id
        const user = await User.findByPk(user_id)
        const userCities: UUID[] | null = user?.dataValues.cities
        if (userCities == null) {
            next(new BadRequestError('User didnt add any cities to his/her collection'))
        } else if (userCities.find(value => value == city_id) == undefined) {
            next(new NotFoundError('Cant find such city in user collection'))
        } else {
            if (city?.dataValues.current_weather == null) {
                await updateCityWeatherInfo(city as Model)
            }
            const data = city?.dataValues
            delete data['createdAt']
            delete data['updatedAt']
            res.status(200).json({ status: 'SUCCESS', data })
        }
    }
}

async function addCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    const city_id = req.params.city_id
    const city = await City.findByPk(city_id)
    if (city == null) {
        next(new NotFoundError('No such city with the given id in the params'))
    } else {
        const user_id = req.body.id
        const user = await User.findByPk(user_id)
        const userCities: UUID[] | null = user?.dataValues.cities
        if (userCities == null) {
            await user?.update({
                cities: [city_id]
            })
            res.status(201).json({
                status: 'SUCCESS',
                message: 'City added successfully'
            })
        } else if (userCities.find(value => value == city_id)) {
            next(new BadRequestError(`City was already added to user's collection!`))
        } else if (userCities.length == 10) {
            next(new BadRequestError('User is not allowed to add more than 10 cities to his/her collection'))
        } else {
            await user?.update({
                cities: [...user?.dataValues.cities, city_id]
            })
            res.status(201).json({
                status: 'SUCCESS',
                message: 'City added successfully'
            })
        }
    }
}

async function getCities(req: Request, res: Response, next: NextFunction): Promise<void> {
    let { query } = req.query
    if (query == '' || query == undefined) {
        next(new BadRequestError('Please, provide a valid city/country name'))
    } else if (typeof query == 'object') {
        next(new BadRequestError('Search query must contain only one string'))
    } else {
        query = query.toLowerCase()
        const cities = await City.findAll({
            attributes: ['id', 'name', 'name_ascii', 'country_name'],
            where: {
                [Op.or]: {
                    name: {
                        [Op.iLike]: `%${query}%`
                    },
                    name_ascii: {
                        [Op.iLike]: `%${query}%`
                    },
                    country_name: {
                        [Op.iLike]: `%${query}%`
                    }
                }
            }
        })
        if (cities.length) {
            res.status(200).json({ status: 'SUCCESS', data: cities })
        } else {
            next(new NotFoundError('No such cities'))
        }
    }
}

export {
    getDefaultCity,
    getCity,
    addCity,
    getCities
}