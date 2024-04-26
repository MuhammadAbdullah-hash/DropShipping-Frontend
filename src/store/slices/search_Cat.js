const { createSlice } = require("@reduxjs/toolkit");

const searchCatSlice = createSlice({
  name: "searchCat",
  initialState: {
    search: "",
  },
  reducers: {
    setSearchCat(state, action) {
      state.search = action.payload;
    },
  },
});

export const { setSearchCat } = searchCatSlice.actions;
export default searchCatSlice.reducer;
