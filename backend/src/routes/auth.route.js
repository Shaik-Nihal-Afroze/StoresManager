import express from 'express'
import { logout, login, signup, checkAuth} from '../controllers/auth.controller.js'
import { protectedRoute } from '../middlewares/auth.middleware.js'
const router = express.Router()

router.post("/signUp",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/checkuser",protectedRoute,checkAuth)

export default router