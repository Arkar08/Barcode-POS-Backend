import express from 'express'
import { getIdInvoiceController, getInvoiceController, postInvoiceController } from '../controllers/invoiceController.js';


const router = express.Router()


router.get("/",getInvoiceController)
router.post("/",postInvoiceController)
router.get("/:id",getIdInvoiceController)

export default router;