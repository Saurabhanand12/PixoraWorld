import { createSlice } from "@reduxjs/toolkit";

const authSlice =  createSlice({
    name:"auth",
    initialState:{
        user:null,
        suggesteduser:[],
        userProfile:null,
        selectedUser:null,
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.user = action.payload;
        },
        setSuggesteduser:(state,action)=>{
            state.suggesteduser= action.payload;
        },
        setUserProfile: (state,action)=>{
            state.userProfile = action.payload;
        },
        setSelectedUser:(state,action) =>{
            state.selectedUser = action.payload;
        }
    }
});

export const {setAuthUser,setSuggesteduser,setUserProfile,setSelectedUser} = authSlice.actions;
export default authSlice.reducer;