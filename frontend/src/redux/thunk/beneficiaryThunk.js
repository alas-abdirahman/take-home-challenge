import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// CREATE OR UPDATE USER IN CREATEASYNCTHUNK Fucntion
export const createBeneficiary = createAsyncThunk(
  "beneficiary/create-beneficiary",
  async ({ beneficiary, accessToken }, { rejectWithValue }) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: accessToken,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/create-beneficiary`, 
        beneficiary,
        {headers}
      );
      return res;
    } catch (error) {
      if (error.respose && error.respose.data.error) {
        return rejectWithValue(error.respose.data.error);
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBeneficiary = createAsyncThunk(
  "beneficiary/update-beneficiary",
  async ({ id, beneficiary, accessToken }, { rejectWithValue }) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: accessToken,
      };
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/update-beneficiary/${id}`,
          beneficiary,
        { headers }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// delete beneficiary
export const deleteBeneficiary = createAsyncThunk(
  "beneficiary/deleteBeneficiary",
  async ({ id, accessToken }, { rejectWithValue }) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: accessToken,
      };
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_API}/delete-beneficiary/${id}`,
        { headers }
      );
      return res;
    } catch (error) {
      if (error.respose && error.respose.data.error) {
        return rejectWithValue(error.respose.data.error);
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// delete many beneficiaries

export const deleteManyBeneficiaries = createAsyncThunk(
  "beneficiaries/delete-many-beneficiaries",
  async ({ ids, accessToken }, { rejectWithValue }) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: accessToken,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/delete-many-beneficiaries`,
        { ids },
        { headers }
      );
      return res;
    } catch (error) {
      if (error.respose && error.respose.data.error) {
        return rejectWithValue(error.respose.data.error);
      }
      return rejectWithValue(error.response.data);
    }
  }
);
