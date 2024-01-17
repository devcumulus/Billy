import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Breadcrumb from "./components/breadcrumb/Breadcrumb";
import Loading from "./components/loading/Loading";
// import "antd/dist/antd.css";

const LazyJoinFirstPage = lazy(() => import("./pages/join/JoinFirstPage"));
const LazyJoinPage = lazy(() => import("./pages/join/JoinPage"));
const LazyJoinLastPage = lazy(() => import("./pages/join/JoinLastPage"));
const LazyLoginPage = lazy(() => import("./pages/login/LoginPage"));

const LazyMyPage = lazy(() => import("./pages/my/MyPage"));

const LazyAddEditPage = lazy(() => import("./pages/addedit/AddEditPage"));

const LazyMainPage = lazy(() => import("./pages/main/MainPage"));

const LazyMainMorePage = lazy(() => import("./pages/main/MainMorePage"));

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
            path="main/more"
            element={
              <Suspense fallback={<Loading />}>
                <LazyMainMorePage />
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
            path="/join/1"
            element={
              <Suspense fallback={<Loading />}>
                <LazyJoinFirstPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="/join/2"
            element={
              <Suspense fallback={<Loading />}>
                <LazyJoinPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="/join/3"
            element={
              <Suspense fallback={<Loading />}>
                <LazyJoinLastPage />
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
