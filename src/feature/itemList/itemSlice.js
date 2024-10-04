import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemList: [],
  clickedItemList: [],
};

export const itemSlice = createSlice({
  name: 'itemList',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.itemList.push(action.payload);
    },
    removeItem: (state, action) => {
      state.itemList = state.itemList.filter(
        (item) => item.id !== action.payload
      );
    },
    addClickedItem: (state, action) => {
      state.clickedItemList.push(action.payload);
    },
  },
});

export const { addItem, removeItem, addClickedItem } = itemSlice.actions;
export default itemSlice.reducer;
