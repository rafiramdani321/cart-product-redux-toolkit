import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

const user = JSON.parse(localStorage.getItem('user'))

export const login = createAsyncThunk('user/login', async (data, thunkAPI) => {
  try {
    const response = await axios.post('https://fakestoreapi.com/auth/login', data)

    const decode = jwtDecode(response.data.token)
    localStorage.setItem('user', JSON.stringify(decode))
    return response.data
  } catch (error) {
    const message = error.response.data
    return thunkAPI.rejectWithValue(message)
  }
})

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isErrors: false,
  message: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isErrors = false
      state.isSuccess = false
    },
    Logout: (state) => {
      localStorage.removeItem('user')
      localStorage.clear('user')
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isErrors = true
        state.message = action.payload
      })
  }
})

export const { reset, Logout } = authSlice.actions
export default authSlice.reducer