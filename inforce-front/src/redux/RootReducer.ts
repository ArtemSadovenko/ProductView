import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice" 

export const rootReducer = combineReducers({
    products: productSlice.reducer

  });

export type RootState = ReturnType<typeof rootReducer>; 
