import express from 'express'
import {deleteUserController, getIdUserController, getUserController, patchUserController, postUserController} from '../controllers/userController.js'

const router = express.Router()

router.get('/', getUserController)
router.post("/",postUserController)
router.get("/:id",getIdUserController)
router.patch("/:id",patchUserController)
router.delete("/:id",deleteUserController)

export default router;