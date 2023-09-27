import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import beneficiaryReducer from "./slices/beneficiarySlice";


const persistConfig = {
  keyPrefix: "redux-",
  key: "root",
  storage,

  whitelist: ["beneficiary"],
};

const rootReducer = combineReducers({
  // Add your reducers here
  beneficiary: beneficiaryReducer,
});

export { persistConfig, rootReducer };
