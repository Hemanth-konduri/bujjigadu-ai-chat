import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggedIn:false,

    checkAuth: async ()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
            
        } catch (error) {
            console.log("Error in auth check: ", error);
            set({authUser: null});
            
        }finally{
            set({isCheckingAuth:false});
        }
    },

    signup: async (data)=>{
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser:res.data});
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error(error.response.data.error || "Something went wrong");
            
        }finally{
            set({isSigningUp:false})
        }
    },

    login: async (data)=>{
        set({isLoggedIn:true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser:res.data});
            toast.success("You Logged In successfully");
        } catch (error) {
            toast.error(error.response.data.error || "Something went wrong");
            
        }finally{
            set({isLoggedIn:false})
        }
    },

    logout: async ()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.error || "Something went wrong");
        }
    },

    updateProfile: async (data)=>{
        try {
            console.log('Updating profile with data:', data);
            const res = await axiosInstance.post("/auth/update-profile", data);
            console.log('Profile update response:', res.data);
            set({authUser:res.data});
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.log('Profile update error:', error);
            toast.error(error.response?.data?.error || "Something went wrong");
        }
    }
}));