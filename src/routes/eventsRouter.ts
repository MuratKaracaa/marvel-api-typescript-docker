import express from 'express'
import { eventsAPI } from '../controllers'

const router = express.Router()

router.get('/', eventsAPI)
router.get('/:eventID', eventsAPI)
router.get('/:eventID/:category', eventsAPI)

export default router
