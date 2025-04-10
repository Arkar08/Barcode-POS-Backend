import express from 'express'
import { loginController, logoutController, signupController } from '../controllers/authController.js';


const router = express.Router()

router.post('/signup',signupController)
router.post('/logout',logoutController)
router.post("/login",loginController)

export default router;