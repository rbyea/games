import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/categories.service";
import { createSelector } from "reselect";

const initialState = {
  entities: null,
  error: null,
  isLoading: true
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesRequested: (state) => {
      state.isLoading = true;
    },
    categoriesFailed: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    categoriesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: categoriesReducer } = categorySlice;

const { categoriesRequested, categoriesFailed, categoriesReceived } = actions;

export const loadListCategories = () => async (dispatch, useState) => {
  dispatch(categoriesRequested);

  try {
    const { content } = await categoryService.get();
    dispatch(categoriesReceived(content));
  } catch (error) {
    dispatch(categoriesFailed(error.message));
  }
};

const selectCategoriesEntities = (state) => state.categories.entities;

export const loadSliderCategory = createSelector(
  selectCategoriesEntities,
  (_, payload) => payload,
  (categories, payload) => {
    const arrayCategories = [];

    if (categories && typeof categories[Symbol.iterator] === "function") {
      for (const categorySlider of payload) {
        for (const category of categories) {
          if (categorySlider === category._id) {
            arrayCategories.push(category);
            break;
          }
        }
      }
    }

    return arrayCategories;
  }
);

export const getListCategories = () => (state) => state.categories.entities;
export const getLoadingStatusCategories = () => (state) =>
  state.categories.isLoading;

export default categoriesReducer;
