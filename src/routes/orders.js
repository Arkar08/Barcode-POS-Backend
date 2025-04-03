import express from 'express'
import { deleteOrderController, getOrderController, getOrderIdController, patchOrderController, postOrderController } from '../controllers/orderController.js';

const router = express.Router()

router.get("/",getOrderController)
router.post("/",postOrderController)
router.get("/:id",getOrderIdController)
router.patch("/:id",patchOrderController)
router.delete("/:id",deleteOrderController)

export default router;