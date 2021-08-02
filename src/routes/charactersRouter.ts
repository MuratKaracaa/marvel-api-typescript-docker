import express from 'express'
import { charactersAPI } from '../controllers'

const router = express.Router()

router.get('/', async (req, res) => await charactersAPI(req, res))
router.get('/:characterID', async (req, res) => await charactersAPI(req, res))
router.get(
    '/:characterID/:category',
    async (req, res) => await charactersAPI(req, res)
)

export default router
