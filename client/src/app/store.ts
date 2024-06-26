import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./appSlice";

export const store = configureStore({
    reducer: {
        app: appReducer
    },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;