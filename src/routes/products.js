import express from 'express'
import { getProductController } from '../controllers/productController.js';

const router = express.Router()

router.get("/",getProductController)

export default router;