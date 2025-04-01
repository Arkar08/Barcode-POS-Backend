import express from 'express'
import { getInvoiceController } from '../controllers/invoiceController.js';


const router = express.Router()


router.get("/",getInvoiceController)

export default router;