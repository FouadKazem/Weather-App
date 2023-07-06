import express from 'express'
import { getDefaultCity, getCity } from '../controllers/weather-controller'

const router = express.Router()

router.get('/', getDefaultCity)
router.get('/:city_name', getCity)

export default router