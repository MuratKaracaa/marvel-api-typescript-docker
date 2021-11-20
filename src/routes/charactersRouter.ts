import express from 'express'
import { charactersAPI } from '../controllers'

const router = express.Router()

router.get('/', charactersAPI)
router.get('/:characterID', charactersAPI)
router.get('/:characterID/:category', charactersAPI)

export default router
