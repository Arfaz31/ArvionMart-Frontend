import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryName: "",
  id: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryName: (state, action) => {
      state.categoryName = action.payload.categoryName;
      state.id = action.payload.id;
    },
  },
});

export const { setCategoryName } = categorySlice.actions;
export default categorySlice.reducer;
