import express from 'express'
import { protectedRoute } from '../middlewares/auth.middleware.js'
import { getAllUsers,deleteUser,getAllStores,addStore,deleteStore} from '../controllers/admin.controller.js'

const router = express.Router()
router.get("/users",protectedRoute,getAllUsers)
router.delete("/deleteUser",protectedRoute,deleteUser)
router.get("/stores",protectedRoute,getAllStores)
router.post("/addStore",protectedRoute,addStore)
router.delete("/deleteStore",protectedRoute,deleteStore)


export default router