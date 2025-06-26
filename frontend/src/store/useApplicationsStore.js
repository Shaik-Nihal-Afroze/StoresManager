import { create } from "zustand";
import axios, { all } from "axios";
import { useAuthStore } from "./useAuthStore.js";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios.js";
// import { useAuthStore } from "./useAuthStore.js";

// import { updateStoreRating } from "../../../backend/src/controllers/user.controller.js";

export const useApplicationsStore = create((set,get)=>({

    allStores:[],
    // allUsers:[],
    ownerStores:[],
    fashion:[],
    // creatingStore:false,

    

    getStores : async() =>{
        try {
            const res = await axiosInstance.get("/stores/allstores")
            set({allStores:res.data})
        } catch (error) {
            console.log('Error fetching in getStores',error)
        }
    },
    getOwnerStores :async()=>{
        try {
            const {authUser} = useAuthStore.getState()
            const {_id} = authUser
            const allOwnerStores =get().allStores
            const fetchedownerStores = allOwnerStores.filter((eachStore)=>eachStore.owner === _id)
            set({ownerStores:fetchedownerStores})
            
        } catch (error) {
            console.log('Error fetching in getOwnerStores',error)
        }
    },
    createStore:async(data)=>{
        set({creatingStore:true})
        
        try {
            const res = await axiosInstance.post("/stores/create-store",data)
                toast.success("Store created successfully", {
                position:'bottom-center'
            });
            } catch (error) {
            console.log("Error fetching createStore in useApplicationsStore:", error);
            toast.error(error.response.data.message)
            } finally {
            set({ creatingStore: false });
            }
    },
    deleteStore:async(storeName)=>{
        try {
            // const {storeName} = req.body 
           await axiosInstance.delete("/admin/deleteStore",{data:{storeName}})
            await get().getStores()
            
            toast.success("Store deleted successfully")
        } catch (error) {
            console.log('Error in deleting store in useApplicationsStore:',error)
        }
    },
    
    // updateStoreRatings: async() =>{
    //     try {
    //         const res = await axiosInstance.get("/users/stores/store/:storeName/rating")
    //         set({allStores:res.data})
    //     } catch (error) {
    //         console.log('Error fetching in getStores',error)
    //     }
    // },
    
}))