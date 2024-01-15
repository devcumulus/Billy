import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/loading/Loading";
import Breadcrumb from "./components/breadcrumb/Breadcrumb";
import "antd/dist/antd.css";

const LazyJoinPage = lazy(() => import("./pages/join/JoinPage"));
const LazyLoginPage = lazy(() => import("./pages/login/LoginPage"));

const LazyMyPage = lazy(() => import("./pages/my/MyPage"));

const LazyAddEditPage = lazy(() => import("./pages/addedit/AddEditPage"));

const LazyMainPage = lazy(() => import("./pages/main/MainPage"));

const LazyPayPage = lazy(() => import("./pages/pay/PayPage"));

const LazyDetailsPage = lazy(() => import("./pages/details/DetailsPage"));

const App = () => {
  return (
    <BrowserRouter>
      <Breadcrumb />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="main"
            element={
              <Suspense fallback={<Loading />}>
                <LazyMainPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <LazyLoginPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="/join/"
            element={
              <Suspense fallback={<Loading />}>
                <LazyJoinPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="/my/"
            element={
              <Suspense fallback={<Loading />}>
                <LazyMyPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="/addedit/"
            element={
              <Suspense fallback={<Loading />}>
                <LazyAddEditPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="/pay/"
            element={
              <Suspense fallback={<Loading />}>
                <LazyPayPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="/details/"
            element={
              <Suspense fallback={<Loading />}>
                <LazyDetailsPage />
              </Suspense>
            }
          ></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default App;
