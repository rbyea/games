import { createAction, createSlice } from "@reduxjs/toolkit";
import sliderServices from "../services/slider.service";
import { createSelector } from "reselect";

const initialState = {
  entities: null,
  error: null,
  isLoading: false
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    sliderRequested: (state) => {
      state.isLoading = true;
    },
    sliderReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    sliderError: (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
    },
    sliderCreate: (state, action) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    sliderUpdate: (state, action) => {
      state.entities[
        state.entities.findIndex((s) => s._id === action.payload._id)
      ] = action.payload;
      state.isLoading = false;
    },
    slideDeleteReceived: (state, action) => {
      state.entities = state.entities.filter(
        (slide) => slide._id !== action.payload
      );
    }
  }
});

const { actions, reducer: sliderReducer } = sliderSlice;
const {
  sliderRequested,
  sliderUpdate,
  sliderReceived,
  sliderError,
  slideDeleteReceived,
  sliderCreate
} = actions;

const deleteSlideRequested = createAction("slider/deleteSlideRequested");

export const loadSliderList = () => async (dispatch) => {
  dispatch(sliderRequested());
  try {
    const { content } = await sliderServices.get();
    dispatch(sliderReceived(content));
  } catch (error) {
    dispatch(sliderError(error.message));
  }
};

export const createSlide = (payload) => async (dispatch) => {
  dispatch(sliderRequested());
  try {
    const { content } = await sliderServices.create(payload);
    dispatch(sliderCreate(content));
  } catch (error) {
    dispatch(sliderError(error.message));
  }
};

export const updateSlide = (payload) => async (dispatch) => {
  dispatch(sliderRequested());
  try {
    const { content } = await sliderServices.update(payload);
    dispatch(sliderUpdate(content));
  } catch (error) {
    dispatch(sliderError(error.message));
  }
};

export const deleteSlide = (slideId) => async (dispatch) => {
  dispatch(deleteSlideRequested());
  try {
    const { content } = await sliderServices.delete(slideId);
    if (!content) {
      dispatch(slideDeleteReceived(slideId));
    }
  } catch (error) {
    dispatch(sliderError(error.message));
  }
};

const getSliderPictures = (state) => state.slider.entities;
const getGameIdSlider = (_, id) => id;

export const getSliderList = () => (state) => state.slider.entities;
export const getLoadingSliderStatus = () => (state) => state.slider.isLoading;

export const getSliderCard = createSelector(
  [getSliderPictures, getGameIdSlider],
  (slider, id) => {
    return slider ? slider.find((slide) => slide.gameId === id) : null;
  }
);

export const getSliderById = (gameId) => (state) => {
  return state.games
    ? state.slider.entities.find((game) => game._id === gameId)
    : null;
};

export default sliderReducer;
