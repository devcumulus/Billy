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
const LazyKaKaoPage = lazy(() => import("./pages/login/KakaoRedirectPage"));
const LazyJoinKakaoPage = lazy(() => import("./pages/join/JoinKakaoPage"));

const LazyMyPage = lazy(() => import("./pages/my/MyPage"));

const LazyReport = lazy(() => import("./pages/chat/Report"));
const LazyAdminPage = lazy(() => import("./pages/admin/AdminPage"));

const LazyMainPage = lazy(() => import("./pages/main/MainPage"));

const LazyProfilePage = lazy(() => import("./pages/profile/UserProfile"));

const LazyMainMorePage = lazy(() => import("./pages/main/MainMorePage"));
const LazyMainSearchPage = lazy(() =>
  import("./pages/main/MainMoreSearchPage"),
);

const LazyPayPage = lazy(() => import("./pages/pay/PayPage"));

const LazyDetailsPage = lazy(() => import("./pages/details/DetailsPage"));
const LazyChatPage = lazy(() => import("./pages/chat/ChatPage"));

const LazyFreePage = lazy(() => import("./pages/free/FreePage"));
const LazyFreeRegisterPage = lazy(() =>
  import("./pages/free/FreeRegisterPage"),
);
const LazyFreeModifyPage = lazy(() => import("./pages/free/FreeModifyPage"));
const LazyFreeDetailsPage = lazy(() => import("./pages/free/FreeDetailsPage"));

const LazyCustomerPage = lazy(() =>
  import("./pages/Customer/CustomerServicePage"),
);
const LazyErrorPage = lazy(() => import("./pages/ErrorPage"));
//등록
const LazyWrite = lazy(() => import("./pages/prod/Write"));
const LazyModify = lazy(() => import("./pages/prod/Modify"));
//기업등록
const LazyEnterprise = lazy(() => import("./pages/promootion/EnterpriseWrite"));
const LazyModifyu = lazy(() => import("./pages/prod/Modify"));

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
        {/* 수정페이지 추후삭제 */}
        <Route
          path="/Modify"
          element={
            <Suspense fallback={<Loading />}>
              <LazyModifyu />
            </Suspense>
          }
        ></Route>
        <Route
          // path="/more/:id/:subid/:page"
          path="/more"
          element={
            <Suspense fallback={<Loading />}>
              <LazyMainMorePage />
            </Suspense>
          }
        ></Route>

        <Route
          path="/search"
          element={
            <Suspense fallback={<Loading />}>
              <LazyMainSearchPage />
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
          path="/login/kakao"
          element={
            <Suspense fallback={<Loading />}>
              <LazyKaKaoPage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/join/kakao"
          element={
            <Suspense fallback={<Loading />}>
              <LazyJoinKakaoPage />
            </Suspense>
          }
        ></Route>

        <Route
          path="/join/step_1"
          element={
            <Suspense fallback={<Loading />}>
              <LazyJoinFirstPage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/join/step_2"
          element={
            <Suspense fallback={<Loading />}>
              <LazyJoinPage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/join/step_3"
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
        ></Route>

        <Route
          path="/admin"
          element={
            <Suspense fallback={<Loading />}>
              <LazyAdminPage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/payment"
          element={
            <Suspense fallback={<Loading />}>
              <LazyPayPage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/payment/success/:orderId"
          element={
            <Suspense fallback={<Loading />}>
              <LazyPayPage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/payment/cancel"
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
          path="/enterprise"
          element={
            <Suspense fallback={<Loading />}>
              <LazyEnterprise />
            </Suspense>
          }
        ></Route>
        <Route
          path="/details"
          element={
            <Suspense fallback={<Loading />}>
              <LazyDetailsPage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/profile/:iuser/:page"
          element={
            <Suspense fallback={<Loading />}>
              <LazyProfilePage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/chat/:iuser/:iproduct"
          element={
            <Suspense fallback={<Loading />}>
              <LazyChatPage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/report/:iproduct"
          element={
            <Suspense fallback={<Loading />}>
              <LazyReport />
            </Suspense>
          }
        ></Route>
        <Route
          path="/free"
          element={
            <Suspense fallback={<Loading />}>
              <LazyFreePage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/free/register"
          element={
            <Suspense fallback={<Loading />}>
              <LazyFreeRegisterPage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/free/modify"
          element={
            <Suspense fallback={<Loading />}>
              <LazyFreeModifyPage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/free/details"
          element={
            <Suspense fallback={<Loading />}>
              <LazyFreeDetailsPage />
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
