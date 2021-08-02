import express from 'express'
import { eventsAPI } from '../controllers'

const router = express.Router()

router.get('/', async (req, res) => await eventsAPI(req, res))
router.get('/:eventID', async (req, res) => await eventsAPI(req, res))
router.get('/:eventID/:category', async (req, res) => await eventsAPI(req, res))

export default router
