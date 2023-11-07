import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import warehouseReducer from './slice/warehouseSlice';
import filterReducer from './slice/filterSlice';


const rootReducer = combineReducers({

    warehouse: warehouseReducer,
    filter: filterReducer,
});

const store = configureStore( {
    reducer: rootReducer,
    //to remove serializable check error
    middleware: (getDefaultMiddleware) =>
getDefaultMiddleware({
serializableCheck: false,
}),
});

export default store;