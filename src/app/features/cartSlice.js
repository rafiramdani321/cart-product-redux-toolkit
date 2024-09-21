import { createSlice } from "@reduxjs/toolkit";

const carts = JSON.parse(localStorage.getItem('carts'))

const initialState = {
  cart: carts ? carts : [],
  isLoading: false,
  isError: false,
  isSucces: false
}

const cartsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setAddCart: (state, action) => {
      const item = state.cart.find(item => item.idProduct === action.payload.idProduct)
      if (item) {
        item.qty++
      } else {
        state.cart = [...state.cart, action.payload]
      }
    },
    removeCart: (state, action) => {
      const item = state.cart.find(item => item.idProduct === action)
    }
  },
})

export const { setAddCart } = cartsSlice.actions
export default cartsSlice.reducer