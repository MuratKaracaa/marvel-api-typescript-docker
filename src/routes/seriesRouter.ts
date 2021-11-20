import express from 'express'
import { seriesAPI } from '../controllers'

const router = express.Router()

router.get('/', seriesAPI)
router.get('/:serieID', seriesAPI)
router.get('/:serieID/:category', seriesAPI)

export default router
