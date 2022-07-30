import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import listService from "../services/listService"

const initialState = {
    lists: [],
    list:{},
    error: false,
    success: false,
    loading: false,
    message: null,
}

//Insert a list
export const publishList = createAsyncThunk(
    "list/publish",
    async(list, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token

        const data = await listService.publishList(list, token)

        //Check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

//Get user lists
export const getUserLists = createAsyncThunk(
  "list/userlists",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await listService.getUserLists(id, token);

    return data;
  }
)

//Get list and products
export const getListProducts = createAsyncThunk(
  "list/listproducts",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await listService.getListProdutcs(id, token);

    return data;
  }
)

//Delete a list
export const deleteList = createAsyncThunk(
  "list/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await listService.deleteList(id, token);

    //Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
)

//Update a List
export const updateList = createAsyncThunk(
  "list/update",
  async (listData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await listService.updateList({title: listData.title}, listData.id, token);

    //Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishList.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(publishList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.list = action.payload;
        state.lists.unshift(state.list)
        state.message = "Lista cadastrada com sucesso!";
      })
      .addCase(publishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = {};
      })
      .addCase(getUserLists.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserLists.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.lists = action.payload;
      })
      .addCase(getListProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getListProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.list = action.payload;
      })
      .addCase(deleteList.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.lists = state.lists.filter((list) => {
          return list._id !== action.payload.id
        })
        state.message = "Lista excluida com sucesso!";
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = {};
      })
      .addCase(updateList.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.lists.map((list) => {
          if (list._id === action.payload.list._id) {
            return (list.title = action.payload.list.title)
          }
          return list
        })
        state.message = "Lista atualizada com sucesso!";
      })
      .addCase(updateList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = {};
      });
  }
})

export const { resetMessage } = listSlice.actions
export default listSlice.reducer

