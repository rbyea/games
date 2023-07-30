import { createSlice } from "@reduxjs/toolkit";
import { discountFunc } from "../utils/discountFunc";
import basketService from "../services/basket.service";
import { createSelector } from "reselect";

const initialState = {
  entities: JSON.parse(localStorage.getItem("basketGames")) || [],
  totalPrice: JSON.parse(localStorage.getItem("basketTotalPrice")) || 0,
  isLoading: true,
  error: null
};

const calculateDiscountedPrice = (price, discount) => {
  if (discount > 0) {
    return price - discountFunc(price, discount);
  } else {
    return price;
  }
};

const calculateTotalPrice = (entities) => {
  return entities.reduce((sum, obj) => {
    const price =
      obj.discount > 0
        ? obj.price - discountFunc(obj.price, obj.discount)
        : obj.price;
    return price * obj.count + sum;
  }, 0);
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    basketRequested: (state) => {
      state.isLoading = true;
    },
    basketReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.totalPrice = state.entities.reduce((sum, obj) => {
        const priceWithDiscount = calculateDiscountedPrice(
          obj.price,
          obj.discount
        );
        return priceWithDiscount * obj.count + sum;
      }, 0);
    },
    basketRequestFailed: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    setAddGame: (state, action) => {
      const countItems = state.entities.find(
        (obj) => obj.gameId === action.payload.gameId
      );

      if (!countItems) {
        state.entities.push({
          ...action.payload
        });
      }

      state.totalPrice = calculateTotalPrice(state.entities);
      state.isLoading = false;
    },
    increment: (state, action) => {
      const game = state.entities.find(
        (obj) => obj.gameId === action.payload.gameId
      );

      if (game) {
        game.count++;
        updateMongoBasket(game);
        state.totalPrice = calculateTotalPrice(state.entities);
      }
      state.isLoading = false;
    },
    decrement: (state, action) => {
      const game = state.entities.find(
        (obj) => obj.gameId === action.payload.gameId
      );
      if (game && game.count > 0) {
        game.count--;
        updateMongoBasket(game);
        state.totalPrice = calculateTotalPrice(state.entities);
      }
      state.isLoading = false;
    },
    remove: (state, action) => {
      state.entities = state.entities.filter(
        (game) => game._id !== action.payload._id
      );
      state.totalPrice = state.entities.reduce((sum, obj) => {
        const discountGame = obj.price - discountFunc(obj.price, obj.discount);
        return discountGame * obj.count + sum;
      }, 0);
      state.isLoading = false;
    },
    clear: (state) => {
      state.entities = [];
      state.totalPrice = 0;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: basketReducer } = basketSlice;

const {
  setAddGame,
  increment,
  decrement,
  remove,
  clear,
  basketReceived,
  basketRequested,
  basketRequestFailed
} = actions;

const updateMongoBasket = async (game) => {
  const gameObj = JSON.parse(JSON.stringify(game));
  try {
    await basketService.updateBasket(gameObj);
  } catch (error) {
    console.log("Ошибка при обновлении корзины в MongoDb:", error);
  }
};

export const loadListBasket = (userId) => async (dispatch) => {
  dispatch(basketRequested());
  try {
    const { content } = await basketService.getBasketGames(userId);
    dispatch(basketReceived(content));
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const addGameInBasket = (obj) => async (dispatch) => {
  dispatch(basketRequested());
  try {
    const { content } = await basketService.create(obj);
    dispatch(setAddGame(content));
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const incrementGame = (game) => async (dispatch) => {
  dispatch(increment(game));
};

export const decrementGame = (game) => async (dispatch) => {
  dispatch(decrement(game));
};

export const removeGame = (game) => async (dispatch) => {
  try {
    const { content } = await basketService.removeGame(game);
    if (!content) {
      dispatch(remove(game));
    }
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const removeAllGame = (userId) => async (dispatch) => {
  try {
    const { content } = await basketService.removeAllGame(userId);
    console.log(userId);
    if (!content) {
      dispatch(clear());
    }
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const basketClear = (userId) => async (dispatch) => {
  try {
    const { content } = await basketService.removeGame(userId);
    if (!content) {
      dispatch(clear());
    }
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const getListBasket = createSelector(
  (state) => state.basket.entities,
  (entities) => entities
);
export const getLengthBasket = () => (state) => state.basket.entities.length;
export const searchGameInBasket = (id) => (state) => {
  return state.basket.entities.find((game) => game.gameId === id);
};
export const getLoadingStatusBasket = () => (state) => state.basket.isLoading;
export const getTotalPrice = () => (state) => state.basket.totalPrice;

const selectBasket = (state) => state.basket;
export const getGamesId = createSelector(selectBasket, (basket) => {
  if (basket) {
    return basket.entities.map((game) => game.gameId);
  }
  return null;
});

export default basketReducer;
