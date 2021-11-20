import express from 'express'
import { storiesAPI } from '../controllers'

const router = express.Router()

router.get('/', storiesAPI)
router.get('/:storyID', storiesAPI)
router.get('/:storyID/:category', storiesAPI)

export default router
