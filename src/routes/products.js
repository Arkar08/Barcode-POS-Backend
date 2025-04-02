import express from 'express'
import { deleteProductController, getIdProductController, getProductController, patchProductController, postProductController } from '../controllers/productController.js';

const router = express.Router()

router.get("/",getProductController)
router.post("/",postProductController)
router.get("/:id",getIdProductController)
router.patch("/:id",patchProductController)
router.delete("/:id",deleteProductController)

export default router;