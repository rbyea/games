import { createAction, createSlice } from "@reduxjs/toolkit";
import commentsService from "../services/comments.service";

const initialState = {
  entities: [],
  isLoading: false,
  error: null
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    commentsDeleteReceived: (state, action) => {
      state.entities = state.entities.filter(
        (game) => game._id !== action.payload
      );
    },
    commentsCreateReceived: (state, action) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    }
  }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentsCreateReceived,
  commentsDeleteReceived
} = actions;

const deleteCommentRequested = createAction("comments/deleteCommentRequested");

export const loadCommentsList = (pageId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentsService.getCommentsGames(pageId);
    console.log(pageId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const createComments = (payload) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentsService.create(payload);
    dispatch(commentsCreateReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  dispatch(deleteCommentRequested());
  try {
    const { content } = await commentsService.deleteComment(commentId);
    if (!content) {
      dispatch(commentsDeleteReceived(commentId));
    }
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const getCommentsList = () => (state) => state.comments.entities;
export const getLoadingStatusComments = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
