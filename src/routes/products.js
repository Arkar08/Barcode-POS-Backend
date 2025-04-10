import express from 'express'
import { deleteProductController, getIdProductController, getProductController, patchProductController, postProductController } from '../controllers/productController.js';
import { authorizeAdmin } from '../middleware/middleware.js';

const router = express.Router()

router.get("/",getProductController)
router.post("/",authorizeAdmin,postProductController)
router.get("/:id",getIdProductController)
router.patch("/:id",authorizeAdmin,patchProductController)
router.delete("/:id",authorizeAdmin,deleteProductController)

export default router;