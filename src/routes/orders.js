import express from 'express'
import { getOrderController } from '../controllers/orderController.js';

const router = express.Router()


router.get("/",getOrderController)

export default router;