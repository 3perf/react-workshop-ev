import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: combineReducers({
    users: userReducer,
  }),
  preloadedState: {
    users: [
      {
        id: 1,
        name: "Alexa",
        lastActiveDate: "2021-09-05",
      },
      {
        id: 2,
        name: "Jake",
        lastActiveDate: "2021-09-04",
      },
      {
        id: 3,
        name: "Josh",
        lastActiveDate: "2021-09-01",
      },
      {
        id: 4,
        name: "Kate",
        lastActiveDate: "2020-04-04",
      },
      {
        id: 5,
        name: "Jake",
        lastActiveDate: "2020-04-04",
      },
    ],
  },
});

export default store;
