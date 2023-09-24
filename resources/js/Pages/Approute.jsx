import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { BackdropLoader } from "./../components/Loader.jsx";
import MainLayout from "/resources/js/components/MainLayout.jsx";
import { useSelector } from "react-redux";
import { getAppRouteState } from "./approute/slice.js";

const RoleForm = lazy(() => import("./RoleForm.jsx"));
const Users = lazy(() => import("./Users.jsx"));

const Approute = () => {
  const appRoute = useSelector(getAppRouteState);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route
            index
            element={
              <Suspense fallback={<BackdropLoader />}>
                <RoleForm />
              </Suspense>
            }
          />
          <Route
            path="/users"
            element={
              <Suspense fallback={<BackdropLoader />}>
                <Users />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Approute;
