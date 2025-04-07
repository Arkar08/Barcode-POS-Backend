import express from 'express'
import { findCustomerController, findProductController, findStockController, findSupplierController } from '../controllers/findController.js';


const router = express.Router()

router.get("/supplier",findSupplierController)
router.get("/customer",findCustomerController)
router.get("/products",findProductController)

// query params
router.post("/stock",findStockController)

export default router;