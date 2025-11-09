import {create} from "zustand";

export const useAuthStore = create((set) => ({

    authUser: {name: "Hemanth",_id: 123, age:20},
    
    isLoggedIn:false,
    login:()=>{
        console.log("We just logged in.");
        set({isLoggedIn:true});
    }
    // user: null,
    // setUser: (user) => set({user}),
    // clearUser: () => set({user: null}),
    // isAuthenticated: () => !!useAuthStore.getState().user,
}));