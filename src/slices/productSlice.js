import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import productService from "../services/productService"

const initialState = {
    products:[],
    product:{},
    error: false,
    success: false,
    loading: false,
    message: null,
}

//Insert a product
export const publishProduct = createAsyncThunk(
    "product/publish",
    async(product, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token

        const data = await productService.publishProduct(product, token);

        //Check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

//Delete a product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productService.deleteProduct(id, token);

    //Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
)

//Update a product
export const updateProduct = createAsyncThunk(
  "product/update",
  async (productData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productService.updateProduct({
      qtd: productData.qtd,
      unity: productData.unity,
      description: productData.description,
      value: productData.value,
    }, productData.id, token);

    //Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
)

//Get products by list id
export const getProductByListId = createAsyncThunk(
  "products/listproduct",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productService.getProductByListId(id, token);

    return data;
  }
)

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    rstMessage: (state) => {
      state.message = null;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(publishProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.product = action.payload;
        state.products.products.unshift(state.product)
        state.message = "Produto cadastrado com sucesso!"
      })
      .addCase(publishProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.product = {};
      })
      .addCase(getProductByListId.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getProductByListId.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.products.products = state.products.products.filter((product) => {
          return product._id !== action.payload.id;
        });
        state.message = "Produto excluido com sucesso!";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.product = {};
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.products.products.map((product) => {
          if (product._id === action.payload.product._id) {
            return (
              (product.qtd = action.payload.product.qtd),
              (product.unity = action.payload.product.unity),
              (product.description = action.payload.product.description),
              (product.value = action.payload.product.value)
            );
          }
          return product;
        });
        state.message = "Produto atualizado com sucesso!";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.product = {};
      });
  }
})

export const { rstMessage } = productSlice.actions
export default productSlice.reducer

