import express from 'express'
import { getCategoryController } from '../controllers/categoryController.js';


const router = express.Router()

router.get("/",getCategoryController)

export default router;