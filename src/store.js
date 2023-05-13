import { configureStore } from "@reduxjs/toolkit";
import TransectionsReducer from "./duck/TransectionsSlice";

export default configureStore({
    reducer:{
    Transections:TransectionsReducer
    }
});