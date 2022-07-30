import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService"

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user:null,
    error: false,
    success: false,
    loading: false,
}



//Register an user and sign in
export const register = createAsyncThunk(
    "auth/register",
    async(user, thunkAPI) => {
        const data = await authService.register(user)

        //Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }
        return data
    }
)

//Logout an user
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
  }
)

//Sign in an user 
export const login = createAsyncThunk(
    "auth/login",
    async(user, thunkAPI) => {
        const data = await authService.login(user)

        //Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }
        return data
    }
)

//Forgot in an user 
export const forgot = createAsyncThunk(
    "auth/forgot",
    async(user, thunkAPI) => {
        const data = await authService.forgot(user)

        //Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }
        return data
    }
)

//Reset Password
export const resetPassword = createAsyncThunk(
  "auth/reset",
  async (user, thunkAPI) => {
    
    const data = await authService.resetPassword(user);

    //Check for errors
    if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;
  }
);




export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset:(state) => {
            state.loading = false
            state.error = false
            state.success = false
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = false;
          })
          .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
          })
          .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
          })
          .addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = null;
          })
          .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = false;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
          })
          .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
          })
          .addCase(forgot.pending, (state) => {
            state.loading = true;
            state.error = false;
          })
          .addCase(forgot.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = null;
            state.message = "Verifique sua caixa de entrada";
          })
          .addCase(forgot.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
          })
          .addCase(resetPassword.pending, (state) => {
            state.loading = true;
            state.error = false;
          })
          .addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = null;
            state.message = "Senha resetada com sucesso!";
          })
          .addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
          })
    },

})

export const {reset} = authSlice.actions
export default authSlice.reducer


