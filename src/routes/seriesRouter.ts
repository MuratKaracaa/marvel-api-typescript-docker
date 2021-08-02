import express from 'express'
import { seriesAPI } from '../controllers'

const router = express.Router()

router.get('/', async (req, res) => await seriesAPI(req, res))
router.get('/:serieID', async (req, res) => await seriesAPI(req, res))
router.get('/:serieID/:category', async (req, res) => await seriesAPI(req, res))

export default router
