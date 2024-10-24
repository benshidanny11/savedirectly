import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  merchants: [],
  products: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMerchants: (state, action) => {
      state.merchants = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {setMerchants, setProducts} = globalSlice.actions;

export default globalSlice.reducer;
