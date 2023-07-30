import { createSlice } from "@reduxjs/toolkit";
import paymentService from "../services/payments.service";

const initialState = {
  entities: [],
  isLoading: true,
  error: null
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    paymentRequested: (state) => {
      state.isLoading = true;
    },
    paymentReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    paymentRequestFailed: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    paymentCreated: (state, action) => {
      state.isLoading = false;
      state.entities.push(action.payload);
    }
  }
});

const { actions, reducer: paymentReducer } = paymentSlice;

const {
  paymentCreated,
  paymentReceived,
  paymentRequested,
  paymentRequestFailed
} = actions;

export const createPayment = (obj) => async (dispatch) => {
  dispatch(paymentRequested());
  try {
    const { content } = await paymentService.create(obj);
    dispatch(paymentCreated(content));
  } catch (error) {
    dispatch(paymentRequestFailed(error.message));
  }
};

export const loadListPayment = (userId) => async (dispatch) => {
  dispatch(paymentRequested());
  try {
    const { content } = await paymentService.getPayment(userId);
    dispatch(paymentReceived(content));
  } catch (error) {
    dispatch(paymentRequestFailed(error.message));
  }
};

export const loadAllPaymentList = () => async (dispatch) => {
  dispatch(paymentRequested());
  try {
    const { content } = await paymentService.getAllPayments();
    dispatch(paymentReceived(content));
  } catch (error) {
    dispatch(paymentRequestFailed(error.message));
  }
};

export const getListPayment = () => (state) => state.payment.entities;
export const getLengthPayment = () => (state) => state.payment.entities.length;
export const getLoadingStatusPayment = () => (state) => state.payment.isLoading;
export const getTotalPrice = () => (state) => state.payment.totalPrice;

export default paymentReducer;
