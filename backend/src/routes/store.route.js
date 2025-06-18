import express from 'express'
import { protectedRoute } from '../middlewares/auth.middleware.js'
import { createStore,getAllStores,getStore } from '../controllers/store.controller.js'
const router = express.Router()


router.post("/create-store",protectedRoute,createStore)
router.get("/allstores",protectedRoute,getAllStores)
router.get("/:id",protectedRoute,getStore)
export default router