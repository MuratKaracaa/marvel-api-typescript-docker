import express from 'express'
import { creatorsAPI } from '../controllers'

const router = express.Router()

router.get('/', creatorsAPI)
router.get('/:creatorID', creatorsAPI)
router.get('/:creatorID/:category', creatorsAPI)

export default router
