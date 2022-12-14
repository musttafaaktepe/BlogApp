import { configureStore } from "@reduxjs/toolkit";
import loginInfoSlice from "../features/loginInfoSlice";
import registerSlice from "../features/registerSlice";
import postsSlice from "../features/postSlice";

const store = configureStore({
  reducer: {
    loginInfos:loginInfoSlice,
    registerInfos:registerSlice,
    postsSlice:postsSlice
  },
});


export default store
