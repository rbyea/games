import { createSlice } from "@reduxjs/toolkit";
import gameService from "../services/games.service";
import { createSelector } from "reselect";

const initialState = {
  entities: null,
  isLoading: true,
  error: null
};

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    gamesRequested: (state) => {
      state.isLoading = true;
    },
    gamesFailed: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    gamesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    gameUpdateReceived: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
      state.isLoading = false;
    },
    gameCreated: (state, action) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    gameRemove: (state, action) => {
      state.entities = state.entities.filter(
        (game) => game._id !== action.payload
      );
      state.isLoading = false;
    }
  }
});

const { actions, reducer: gamesReducer } = gameSlice;

const {
  gamesRequested,
  gameUpdateReceived,
  gamesFailed,
  gamesReceived,
  gameCreated,
  gameRemove
} = actions;

export const loadListGames = () => async (dispatch) => {
  dispatch(gamesRequested());
  try {
    const { content } = await gameService.get();
    dispatch(gamesReceived(content));
  } catch (error) {
    dispatch(gamesFailed(error.message));
  }
};

export const loadCategories = (payload) => async (dispatch) => {
  try {
    const { content } = await gameService.getCategories(payload);
    dispatch(gamesReceived(content));
  } catch (error) {
    dispatch(gamesFailed(error.message));
  }
};

export const createGame = (payload) => async (dispatch) => {
  dispatch(gamesRequested());
  try {
    console.log("slice", payload);
    const { content } = await gameService.create(payload);
    dispatch(gameCreated(content));
  } catch (error) {
    dispatch(gamesFailed(error.message));
  }
};

export const updateGame = (payload) => async (dispatch) => {
  dispatch(gamesRequested());
  try {
    const { content } = await gameService.updateGame(payload);
    dispatch(gameUpdateReceived(content));
  } catch (error) {
    dispatch(gamesFailed(error.message));
  }
};

export const deleteGame = (gameId) => async (dispatch) => {
  dispatch(gamesRequested());
  console.log(gameId);
  try {
    const { content } = await gameService.deleteGame(gameId);
    if (!content) {
      console.log("gameId", gameId);
      dispatch(gameRemove(gameId));
    }
  } catch (error) {
    dispatch(gamesFailed(error.message));
  }
};

const getGames = (state) => state.games.entities;
const getGameId = (_, id) => id;

export const getListGames = () => (state) => state.games.entities;
export const getListGamesLength = () => (state) => state.games.entities.length;
export const getLoadingStatusGames = () => (state) => state.games.isLoading;
export const getTopSalesGames = createSelector([getGames], (games) => {
  return games ? games.filter((game) => game.topSales).slice(0, 4) : [];
});

export const getReceiptsGames = createSelector([getGames], (games) => {
  const currentTimestamp = Date.now();
  return games ? games.filter((game) => game.receipts > currentTimestamp) : [];
});

export const getGamePage = createSelector(
  [getGames, getGameId],
  (games, id) => {
    return games ? games.find((game) => game._id === id) : null;
  }
);
export const getGameById = (gameId) => (state) => {
  return state.games
    ? state.games.entities.find((game) => game._id === gameId)
    : null;
};

export default gamesReducer;
