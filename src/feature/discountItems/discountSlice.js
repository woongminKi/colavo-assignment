import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  discountItems: [],
  clickedDiscountList: [],
  appliedDiscountItems: [],
};

export const discountItemSlice = createSlice({
  name: 'discountItem',
  initialState,
  reducers: {
    addDiscountItem: (state, action) => {
      state.discountItems.push(action.payload);
    },
    removeDiscountItem: (state, action) => {
      state.discountItems = state.discountItems.filter(
        (item) => item.id !== action.payload
      );
    },
    addClickedDiscountItem: (state, action) => {
      state.clickedDiscountList = [action.payload];
    },
    appliedDiscountItem: (state, action) => {
      state.appliedDiscountItems = state.appliedDiscountItems.push(
        action.payload
      );
    },
  },
});

export const {
  addDiscountItem,
  removeDiscountItem,
  addClickedDiscountItem,
  appliedDiscountItem,
} = discountItemSlice.actions;
export default discountItemSlice.reducer;
