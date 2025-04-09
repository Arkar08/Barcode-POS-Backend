import express from 'express'
import { findCustomerController, findProductController, findRoleController, findStateController, findStockController, findSupplierController, findTownshipController } from '../controllers/findController.js';


const router = express.Router()

router.get("/supplier",findSupplierController)
router.get("/customer",findCustomerController)
router.get("/products",findProductController)
router.get("/role",findRoleController)
router.get("/state",findStateController)
router.post("/township",findTownshipController)
// query params
router.post("/stock",findStockController)

export default router;