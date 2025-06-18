import express from 'express'
import { protectedRoute } from '../middlewares/auth.middleware.js'
import { getAllStoresOfOwner,getStoreOfOwner ,addStore,deleteStore} from '../controllers/owner.controller.js'

const router = express.Router()



router.get("/:id/stores",protectedRoute,getAllStoresOfOwner)
router.get("/:id/stores/store",protectedRoute,getStoreOfOwner)
router.post("/:id/stores/newstore",protectedRoute,addStore)

// router.put("/:id/stores/store/rating/:storeName",protectedRoute,updateStoreRating)
router.delete("/:id/stores/store/:storeName/removeStore",protectedRoute,deleteStore)
// router.get("/:id",getStore)
export default router