import express from 'express'
import { storiesAPI } from '../controllers'

const router = express.Router()

router.get('/', async (req, res) => await storiesAPI(req, res))
router.get('/:storyID', async (req, res) => await storiesAPI(req, res))
router.get(
    '/:storyID/:category',
    async (req, res) => await storiesAPI(req, res)
)

export default router
