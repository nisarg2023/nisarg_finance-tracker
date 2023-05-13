import { createSlice } from "@reduxjs/toolkit";
import { USERS_DATA } from "../utils/constants";

const initialState = USERS_DATA;

export const UserSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.push(action.payload)
        },
        
    }
})

export const {addUser} = UserSlice.actions;
export default UserSlice.reducer
