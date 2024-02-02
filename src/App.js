import React, { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Breadcrumb from "./components/breadcrumb/Breadcrumb";
import Loading from "./components/loading/Loading";
// import "antd/dist/antd.css";

const LazyJoinFirstPage = lazy(() => import("./pages/join/JoinFirstPage"));
const LazyJoinPage = lazy(() => import("./pages/join/JoinPage"));
const LazyJoinLastPage = lazy(() => import("./pages/join/JoinLastPage"));
const LazyLoginPage = lazy(() => import("./pages/login/LoginPage"));

const LazyMyPage = lazy(() => import("./pages/my/MyPage"));
const LazyMyReviewPage = lazy(() => import("./pages/my/MyReviewPage"));
const LazyMyInterestPage = lazy(() => import("./pages/my/MyInterestPage"));
const LazyMyInfoPage = lazy(() => import("./pages/my/MyInfoPage"));
const LazyMyWithDrawPage = lazy(() => import("./pages/my/MyWithDrawPage"));

const LazyMainPage = lazy(() => import("./pages/main/MainPage"));

const LazyMainMorePage = lazy(() => import("./pages/main/MainMorePage"));

const LazyPayPage = lazy(() => import("./pages/pay/PayPage"));

const LazyDetailsPage = lazy(() => import("./pages/details/DetailsPage"));
const LazyChatPage = lazy(() => import("./pages/chat/ChatPage"));

const LazyCustomerPage = lazy(() =>
  import("./pages/Customer/CustomerServicePage"),
);
const LazyErrorPage = lazy(() => import("./pages/ErrorPage"));

const LazyWrite = lazy(() => import("./pages/prod/Write"));
const LazyModify = lazy(() => import("./pages/prod/Modify"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <LazyMainPage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/main/more/:id"
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
          path="/my"
          element={
            <Suspense fallback={<Loading />}>
              <LazyMyPage />
            </Suspense>
          }
        >
          <Route
            path="interest"
            element={
              <Suspense fallback={<Loading />}>
                <LazyMyInterestPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="review"
            element={
              <Suspense fallback={<Loading />}>
                <LazyMyReviewPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="info"
            element={
              <Suspense fallback={<Loading />}>
                <LazyMyInfoPage />
              </Suspense>
            }
          >
            <Route
              path="withdraw"
              element={
                <Suspense fallback={<Loading />}>
                  <LazyMyWithDrawPage />
                </Suspense>
              }
            ></Route>
          </Route>
        </Route>
        <Route
          path="/pay/"
          element={
            <Suspense fallback={<Loading />}>
              <LazyPayPage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/write/"
          element={
            <Suspense fallback={<Loading />}>
              <LazyWrite />
            </Suspense>
          }
        ></Route>
        <Route
          path="/modify"
          element={
            <Suspense fallback={<Loading />}>
              <LazyModify />
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
        <Route
          path="/chat/"
          element={
            <Suspense fallback={<Loading />}>
              <LazyChatPage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/customer"
          element={
            <Suspense fallback={<Loading />}>
              <LazyCustomerPage />
            </Suspense>
          }
        ></Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <LazyErrorPage />
            </Suspense>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
