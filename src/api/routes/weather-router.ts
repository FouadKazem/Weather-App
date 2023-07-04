import express from 'express'
import viewsHandler from '../middleware/views-handler'
import { getDefaultCity, getCity } from '../controllers/weather-controller'

const router = express.Router()

router.get('/', viewsHandler, getDefaultCity)
router.get('/:city_name', viewsHandler, getCity)

export default router