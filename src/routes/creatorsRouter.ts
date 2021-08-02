import express from 'express'
import { creatorsAPI } from '../controllers'

const router = express.Router()

router.get('/', async (req, res) => await creatorsAPI(req, res))
router.get('/:creatorID', async (req, res) => await creatorsAPI(req, res))
router.get(
    '/:creatorID/:category',
    async (req, res) => await creatorsAPI(req, res)
)

export default router
