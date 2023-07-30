import { createSlice } from "@reduxjs/toolkit";
import featuresService from "../services/features.service";
import { createSelector } from "reselect";

const initialState = {
  entities: [],
  isLoading: true,
  error: null
};

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    featuresRequested: (state) => {
      state.isLoading = true;
    },
    featuresFailed: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    featuresReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: featuresReducer } = featuresSlice;
const { featuresReceived, featuresFailed, featuresRequested } = actions;

export const loadFeaturesList = () => async (dispatch) => {
  dispatch(featuresRequested);
  try {
    const { content } = await featuresService.get();
    dispatch(featuresReceived(content));
  } catch (error) {
    dispatch(featuresFailed(error.message));
  }
};

export const getListFeatures = () => (state) => state.features.entities;

const selectFeaturesEntities = (state) => state.features.entities;

export const loadFeaturesCardPage = createSelector(
  selectFeaturesEntities,
  (_, payload) => payload,
  (features, payload) => {
    const arrayFeatures = [];

    if (features && typeof features[Symbol.iterator] === "function") {
      for (const featuresItem of payload) {
        for (const categoryList of features) {
          if (featuresItem === categoryList._id) {
            arrayFeatures.push(categoryList);
            break;
          }
        }
      }
    }

    return arrayFeatures;
  }
);

export default featuresReducer;
