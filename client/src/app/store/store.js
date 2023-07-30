import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";
import sliderReducer from "./sliderSlice";
import categoriesReducer from "./categoriesSlice";
import featuresReducer from "./featuresSlice";
import specificationReducer from "./specificationSlice";
import sliderCardReducer from "./sliderCardSlice";
import basketReducer from "./basketSlice";
import usersReducer from "./usersSlice";
import favoriteReducer from "./favoriteSlice";
import paymentReducer from "./paymentSlice";
import commentsReducer from "./commentsSlice";

const rootReducer = combineReducers({
  games: gamesReducer,
  slider: sliderReducer,
  categories: categoriesReducer,
  features: featuresReducer,
  specifications: specificationReducer,
  sliderCard: sliderCardReducer,
  basket: basketReducer,
  users: usersReducer,
  favorite: favoriteReducer,
  payment: paymentReducer,
  comments: commentsReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
