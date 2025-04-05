import express from 'express'
import { findCustomerController, findSupplierController } from '../controllers/findController.js';


const router = express.Router()

router.get("/supplier",findSupplierController)
router.get("/customer",findCustomerController)

export default router;