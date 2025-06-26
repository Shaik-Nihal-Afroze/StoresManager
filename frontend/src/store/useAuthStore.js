import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";


import { toast } from "react-toastify";


export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  allUsers: [],
  
  

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully", {
        position:'bottom-center'
      });
    } catch (error) {
      console.log("Error fetching sigup controller:", error);
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully", {
        position:'bottom-center'
      });

    } catch (error) {
      console.log("Error fetching login controller:", error);
      toast.error(error.response.data.message)
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully",{
        position:'bottom-center'
      });
    } catch (error) {
      console.log("Error fetching logout controller:", error);
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkuser");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  
  getAllUsers: async () => {
    try {
      const res = await axiosInstance.get("/users/allusers");
      set({ allUsers: res.data });
    } catch (error) {
      console.log("Error fetching getAllusers controller:", error);
    }
  },
// need to correctly enter the id in deleteUser
  deleteUser :async(userEmail)=>{
    try {
      await axiosInstance.delete("/admin/deleteUser",{data:{userEmail}})
      const updatedUsers = get().allUsers.filter(user=>user.email!==userEmail)
      set({allUsers:updatedUsers})
      // await get().getAllUsers()
      toast.success("User deleted successfully")
    } catch (error) {
      console.log('Error in deleting store in useApplicationsStore:',error)
    }
  }
  
}));