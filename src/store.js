import { configureStore } from "@reduxjs/toolkit";
import unitReducer from "./reducers/unitReducer";

const store = configureStore({
  reducer: {
    units: unitReducer,
  }
})

export default store