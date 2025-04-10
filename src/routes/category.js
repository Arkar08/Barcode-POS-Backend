import express from 'express'
import { deleteCategoryController, getCategoryController, getCategoryIdControler, patchCategoryController, postCategoryController } from '../controllers/categoryController.js';
import { authorizeAdmin } from '../middleware/middleware.js';


const router = express.Router()

router.get("/",getCategoryController)
router.post("/",authorizeAdmin,postCategoryController)
router.get("/:id",getCategoryIdControler)
router.patch("/:id",authorizeAdmin,patchCategoryController)
router.delete("/:id",authorizeAdmin,deleteCategoryController)

export default router;