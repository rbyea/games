import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: [],
  isLoading: true,
  error: null
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    aboutRequested: (state) => {
      state.isLoading = true;
    },
    aboutFailed: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    aboutReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    }
  }
});


const { actions, reducer: aboutReducer } = aboutSlice;

const { aboutRequested, aboutFailed, aboutReceived } = actions;

export default aboutReducer;
