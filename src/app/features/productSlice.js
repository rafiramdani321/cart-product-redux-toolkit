import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products?limit=8')
  return response.data
})

export const getProductById = createAsyncThunk('products/getProductById', async () => {
  const response = await axios.get(`https://fakestoreapi.com/products/3`)
  return response.data
})

const productEntity = createEntityAdapter({
  selectId: (product) => product.id
})

const productSlice = createSlice({
  name: 'products',
  initialState: productEntity.getInitialState({
    isLoading: false,
    isSuccess: false,
    isError: false
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        productEntity.setAll(state, action.payload)
      })

      .addCase(getProductById.fulfilled, (state, action) => {
        productEntity.setAll(state, action.payload)
      })
  }
})


export const productSelector = productEntity.getSelectors(state => state.product)
export default productSlice.reducer