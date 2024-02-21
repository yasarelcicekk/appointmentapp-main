import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authActions";
import doctorReducer from "./doctorActions"
const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors:doctorReducer
  },
});

export default store