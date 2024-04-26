const { createSlice } = require("@reduxjs/toolkit");

const selectedCatSlice = createSlice({
  name: "selectedCat",
  initialState: {
    selectCat: "",
  },
  reducers: {
    setSelectCat(state, action) {
      state.selectCat = action.payload;
    },
  },
});

export const { setSelectCat } = selectedCatSlice.actions;
export default selectedCatSlice.reducer;
