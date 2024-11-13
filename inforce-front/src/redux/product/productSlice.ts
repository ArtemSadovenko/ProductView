import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "./types";
import { CommentType } from "../comment/types";

const initState: ProductType[] = [
  {
    id: -1,
    imageUrl: "",
    name: "",
    count: -1,
    size: { width: 0, height: 0 },
    weight: "",
    comments: [],
  },
];


const productSlice = createSlice({
  name: "product",
  initialState: initState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      
      state.push(...action.payload)

    },
    setSelectedProduct: (state, action: PayloadAction<ProductType>) => {
      const productId = action.payload.id;
      const existingProduct = state.find((product) => product.id === productId);
      if (existingProduct) {

        Object.assign(existingProduct, action.payload);
      }
    },
    addProduct: (state, action: PayloadAction<ProductType>) => {
      state.push(action.payload); 
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      return state.filter((product) => product.id !== action.payload);
    },
    updateProduct: (state, action: PayloadAction<ProductType>) => {
      const productId = action.payload.id;
      const index = state.findIndex((product) => product.id === productId);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  addProduct,
  removeProduct,
  updateProduct,
} = productSlice.actions;

export default productSlice;