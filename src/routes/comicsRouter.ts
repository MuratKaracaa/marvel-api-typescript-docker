import express from 'express'
import { comicsAPI } from '../controllers'

const router = express.Router()

router.get('/', comicsAPI)
router.get('/:comicID', comicsAPI)
router.get('/:comicID/:category', comicsAPI)

export default router
