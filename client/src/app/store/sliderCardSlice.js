import { createSlice } from "@reduxjs/toolkit";
import sliderCardServices from "../services/sliderCard.service";
import { createSelector } from "reselect";

const initialState = {
  entities: null,
  error: null,
  isLoading: true
};

const sliderCardSlice = createSlice({
  name: "sliderCard",
  initialState,
  reducers: {
    sliderCardRequested: (state) => {
      state.isLoading = true;
    },
    sliderCardReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    sliderCardError: (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
    }
  }
});

const { actions, reducer: sliderCardReducer } = sliderCardSlice;
const { sliderCardRequested, sliderCardReceived, sliderCardError } = actions;

export const loadSliderCardList = () => async (dispatch) => {
  dispatch(sliderCardRequested());
  try {
    const { content } = await sliderCardServices.get();
    dispatch(sliderCardReceived(content));
  } catch (error) {
    dispatch(sliderCardError(error.message));
  }
};

const getSliderCardPictures = (state) => state.sliderCard.entities;
const getGameIdSliderCard = (_, id) => id;

export const getSliderCardList = () => (state) => state.sliderCard.entities;
export const getLoadingSliderCardStatus = () => (state) =>
  state.sliderCard.isLoading;

export const getSliderGame = createSelector(
  [getSliderCardPictures, getGameIdSliderCard],
  (sliderCard, id) => {
    return sliderCard ? sliderCard.find((slide) => slide.gameId === id) : null;
  }
);

export const getSliderId = (gameId) => (state) => {
  return state.sliderCard
    ? state.sliderCard.entities.find((slide) => slide.gameId === gameId)
    : null;
};

export default sliderCardReducer;
