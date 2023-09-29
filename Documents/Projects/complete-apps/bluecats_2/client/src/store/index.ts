import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { articleSlice } from "./slices/article";
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    [articleSlice.name]: articleSlice.reducer,
  },
  devTools: true,
});

const makeStore = () => store;
  
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);