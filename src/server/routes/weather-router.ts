import express from 'express'
import { getDefaultCity, getCity, addCity, getCities } from '../controllers/weather-controller'

const router = express.Router()

router.get('/', getDefaultCity)
router.get('/search?', getCities)
router.get('/:city_id', getCity)
router.post('/:city_id', addCity)

export default router