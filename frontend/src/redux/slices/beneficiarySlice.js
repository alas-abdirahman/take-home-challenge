import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  beneficiaries: {
    data: [],
    currentPage: 0,
    numberOfPages: 0,
  },
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "beneficiary",
  initialState,
  reducers: {
    getBeneficiarySuccess: (state, { payload }) => {
      state.beneficiaries = payload;
      state.loading = false;
    },
    startLoadingBeneficiary: (state) => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default slice.reducer;

export const getBeneficiaries = ({ accessToken, page }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken,
  };
  return async (dispatch) => {
    try {
      dispatch(slice.actions.startLoadingBeneficiary());
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/beneficiaries`,
        { headers }
      );
      dispatch(slice.actions.getBeneficiarySuccess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
};