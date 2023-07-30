import { createAction, createSlice } from "@reduxjs/toolkit";
import favoriteService from "../services/favorite.service";

const initialState = {
  entities: [],
  isLoading: false,
  error: null
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    favoriteRequested: (state) => {
      state.isLoading = true;
    },
    favoriteReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    favoriteRequestFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    favoriteDeleteReceived: (state, action) => {
      state.entities = state.entities.filter(
        (game) => game._id !== action.payload
      );
    },
    favoriteCreateReceived: (state, action) => {
      state.entities.push(action.payload);
    }
  }
});

const { actions, reducer: favoriteReducer } = favoriteSlice;
const {
  favoriteRequested,
  favoriteReceived,
  favoriteRequestFailed,
  favoriteCreateReceived,
  favoriteDeleteReceived
} = actions;

const deleteFavoriteRequested = createAction(
  "favorite/deleteFavoriteRequested"
);

export const loadFavoriteList = (pageId) => async (dispatch) => {
  dispatch(favoriteRequested());
  try {
    const { content } = await favoriteService.getFavoriteGames(pageId);
    dispatch(favoriteReceived(content));
  } catch (error) {
    dispatch(favoriteRequestFailed(error.message));
  }
};

export const createFavorite = (payload) => async (dispatch) => {
  dispatch(favoriteRequested());
  try {
    const { content } = await favoriteService.create(payload);
    dispatch(favoriteCreateReceived(content));
  } catch (error) {
    dispatch(favoriteRequestFailed(error.message));
  }
};

export const deleteFavorite = (favoriteId) => async (dispatch) => {
  dispatch(deleteFavoriteRequested());
  try {
    const { content } = await favoriteService.deleteFavorite(favoriteId);
    if (!content) {
      dispatch(favoriteDeleteReceived(favoriteId));
    }
  } catch (error) {
    dispatch(favoriteRequestFailed(error.message));
  }
};

export const getFavoriteList = () => (state) => state.favorite.entities;
export const getFavoriteLength = () => (state) =>
  state.favorite.entities.length;
export const searchGameInFavorite = (gameId) => (state) => {
  return state.favorite.entities.find((game) => game.gameId === gameId);
};
export const getFavoriteCard = (gameId) => (state) => {
  return state.favorite
    ? state.favorite.entities.filter((game) => game.gameId !== gameId)
    : null;
};

export default favoriteReducer;
