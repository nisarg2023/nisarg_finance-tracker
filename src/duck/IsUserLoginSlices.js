import { createSlice } from "@reduxjs/toolkit";
const initialState = {value:false}

export const IsUserLoginSlices = createSlice({
    name: "IsUserLogin",
    initialState,
    reducers:{
        setUserIsLogin:(state,action)=>{
            console.log(action.payload)
            state.value = action.payload
        }
    }
}) 

export const {setUserIsLogin}= IsUserLoginSlices.actions;
export default IsUserLoginSlices.reducer