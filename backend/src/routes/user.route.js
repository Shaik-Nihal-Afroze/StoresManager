import { getAllUsers ,updateStoreRating} from "../controllers/user.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import express from 'express'

const router = express.Router()

router.get("/allusers",protectedRoute,getAllUsers)
 router.put("/:id/stores/store/:storeName/rating",protectedRoute,updateStoreRating)

export default router