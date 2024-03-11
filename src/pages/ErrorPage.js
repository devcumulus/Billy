// 담당자 : 최배근
import React from "react";
import Layout from "../layouts/Layout";
import styled from "@emotion/styled";
import Mytitle from "../components/my/Mytitle";
import { Link } from "react-router-dom";

const ErrorDiv = styled.div`
  width: 1260px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 2rem;
  div:nth-of-type(2) {
    width: 1260px;
    height: 460px;
    background: #f2f2ff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    gap: 7rem;
    h1 {
      display: block;
      width: 37rem;
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 3.2rem;
      word-break: break-all;
    }
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.4rem;
      color: #fff;
      width: 37rem;
      height: 5rem;
      background: #2c39b5;
      border-radius: 1rem;
    }
  }
`;

const ErrorPage = () => {
  return (
    <Layout>
      <ErrorDiv>
        <div>
          <Mytitle title={"404 ERROR"} />
        </div>
        <div>
          <h1>
            원하시는 결과를 찾을수 없습니다.
            <br />
            올바른 URL 을 입력하였는지 확인하세요.
            <br />
            자세한 내용은 사이트 관리자에게 문의 하시길 바랍니다.
          </h1>
          <Link to={"/"}>
            <p>메인으로 돌아가기</p>
          </Link>
        </div>
      </ErrorDiv>
    </Layout>
  );
};

export default ErrorPage;
