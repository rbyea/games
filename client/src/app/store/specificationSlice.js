import { createSlice } from "@reduxjs/toolkit";
import specificationsServices from "../services/specifications.service";
import { createSelector } from "reselect";

const initialState = {
  entities: [],
  isLoading: true,
  error: null
};

const specificationSlice = createSlice({
  name: "specification",
  initialState,
  reducers: {
    specificationRequested: (state) => {
      state.isLoading = true;
    },
    specificationFailed: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    specificationReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: specificationReducer } = specificationSlice;
const { specificationRequested, specificationFailed, specificationReceived } =
  actions;

export const loadListSpecifications = () => async (dispatch) => {
  dispatch(specificationRequested);

  try {
    const { content } = await specificationsServices.get();
    dispatch(specificationReceived(content));
  } catch (error) {
    dispatch(specificationFailed(error.message));
  }
};

const getSpecificationGame = (state) => state.specifications.entities;
const getSpecificationIdGame = (_, id) => id;

export const getSpecificationItem = createSelector(
  [getSpecificationGame, getSpecificationIdGame],
  (specifications, id) => {
    return specifications
      ? specifications.find((spec) => spec.gameId === id)
      : null;
  }
);

export const getSpecificationId = (gameId) => (state) => {
  return state.specifications
    ? state.specifications.entities.find((spec) => spec.gameId === gameId)
    : null;
};

export default specificationReducer;
