import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//get user from localstorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null, //set user if there is one in the localstorage else set it to null
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Register user using the authService
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Login user using the authService
export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout function
export const logout = createAsyncThunk('auth/logout',  
async() => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //this reset the states
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
        //when register is pending
        state.isLoading = true
    })
    .addCase(register.fulfilled, (state, action) => {
        //when registration is fulfilled
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload 
    })
    .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError  = true
        state.message = action.payload
        state.user  = null
    })
    //login cases
    .addCase(login.pending, (state) => {
      //when login is pending
      state.isLoading = true
  })
  .addCase(login.fulfilled, (state, action) => {
      //when login is fulfilled
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload 
  })
  .addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.isError  = true
      state.message = action.payload
      state.user  = null
  })

    //logout
    .addCase(logout.fulfilled, (state) => {
      state.user = null
    })
  },
});

export const { reset } = authSlice.actions
export default authSlice.reducer
