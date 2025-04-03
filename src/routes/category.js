import express from 'express'
import { deleteCategoryController, getCategoryController, getCategoryIdControler, patchCategoryController, postCategoryController } from '../controllers/categoryController.js';


const router = express.Router()

router.get("/",getCategoryController)
router.post("/",postCategoryController)
router.get("/:id",getCategoryIdControler)
router.patch("/:id",patchCategoryController)
router.delete("/:id",deleteCategoryController)

export default router;