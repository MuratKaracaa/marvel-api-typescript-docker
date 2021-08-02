import express from 'express'
import { comicsAPI } from '../controllers'

const router = express.Router()

router.get('/', async (req, res) => await comicsAPI(req, res))
router.get('/:comicID', async (req, res) => await comicsAPI(req, res))
router.get('/:comicID/:category', async (req, res) => await comicsAPI(req, res))

export default router
