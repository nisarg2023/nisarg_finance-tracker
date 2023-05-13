import { configureStore } from "@reduxjs/toolkit";
import TransectionsReducer from "./duck/TransectionsSlice";
import UsersReducer from "./duck/usersSlice";
import isUserLoginReducer from "./duck/IsUserLoginSlices";

export default configureStore({
    reducer:{
    Transections:TransectionsReducer,
    Users:UsersReducer,
    checkIsUserLogin: isUserLoginReducer
    }
});