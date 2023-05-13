import { createSlice, current } from "@reduxjs/toolkit";
import { LOCAL_DATA } from "../utils/constants";

const initialState = LOCAL_DATA


export const TransectionSlice = createSlice({
    name : 'transaction',
    initialState : initialState,
    reducers :{
        addTreanection:(state,action)=>{
            state.push(action.payload)
          // console.table(...state)
        },
        deleteTreanection:(state,action)=>{
            return state.filter(ele=>ele.id !== action.payload)
          
            
        },
        updateTransection:(state,action)=>{
            const { index, data } = action.payload
            state[index] = data
        }

    }


})

export const {addTreanection,deleteTreanection,updateTransection} = TransectionSlice.actions;
export default TransectionSlice.reducer;