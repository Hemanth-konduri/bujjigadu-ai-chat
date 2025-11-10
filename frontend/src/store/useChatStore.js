import { LucideClockAlert } from "lucide-react";
import toast from "react-hot-toast";
import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set,get)=>({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) !== "false",
    toggleSound: ()=>{
        const newSoundState = !get().isSoundEnabled;
        localStorage.setItem("isSoundEnabled", newSoundState.toString());
        set({isSoundEnabled: newSoundState});
    },

    setActiveTab: (tab)=>{
        set({activeTab: tab});
    },

    setSelectedUser: (selectedUser)=>{
        set({selectedUser});
    },

    getAllContacts: async()=>{
        set({isUserLoading:true});
        try {
            const res = await axiosInstance.get("/message/contacts");
            console.log('All contacts response:', res.data);
            set({allContacts: res.data});

        } catch (error) {
            console.log('Error fetching contacts:', error);
            console.log('Error response:', error.response?.data);
            toast.error(error.response?.data?.error || "Something went wrong while fetching contacts");
            
        }finally{
            set({isUserLoading:false});
        }
    },

    getMyChatPartners: async()=>{
        set({isUserLoading:true});
        try {
            const res = await axiosInstance.get("/message/chats");
            console.log('Chat partners response:', res.data);
            set({chats: res.data});

        } catch (error) {
            console.log('Error fetching chat partners:', error);
            console.log('Error response:', error.response?.data);
            toast.error(error.response?.data?.error || "Something went wrong while fetching chat partners");

        }finally{
            set({isUserLoading:false});
        }
    },

    getMessagesByUserId: async(userId)=>{
        set({isMessagesLoading:true});
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            console.log('Messages response:', res.data);
            set({messages: res.data});

        } catch (error) {
            console.log('Error fetching messages:', error);
            console.log('Error response:', error.response?.data);
            toast.error(error.response?.data?.error || "Something went wrong while fetching messages");

        }finally{
            set({isMessagesLoading:false});
        }
    },

   


}))