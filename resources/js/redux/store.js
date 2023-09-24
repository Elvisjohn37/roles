import { configureStore } from "@reduxjs/toolkit";
import appRouteReducer from "./../Pages/approute/slice";
import roleFormReducer from "./../Pages/roleform/slice";
import selectrolesReducer from "./../components/selectroles/slice";

let store = configureStore({
  reducer: {
    appRoute: appRouteReducer,
    roleForm: roleFormReducer,
    selectroles: selectrolesReducer,
  },
});

export default store;
