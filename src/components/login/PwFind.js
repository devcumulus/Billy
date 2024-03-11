// 담당자: 사공은진
import styled from "@emotion/styled";
import React from "react";
import { IdBox, LoginBox, Logo } from "../../styles/login/LoginPageStyle";
import { BtSection, CancelBt, SaveBt } from "../../styles/join/JoinPageStyle";

const PwFindStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  width: 500px;
  height: 500px;
  background: #fff;
  padding-top: 20px;
`;

const PwFind = ({ closeModal, onConfirm }) => {
  return (
    <PwFindStyle>
      <Logo>로고</Logo>
      <LoginBox height={"380px"} mgbtm={"50px"}>
        <p>
          비밀번호를 잊으셨나요? <br />
          아이디와 휴대폰 번호를 입력해 주세요.
        </p>
        <IdBox type="text" placeholder="아이디" />
        <IdBox type="text" placeholder="휴대폰 번호" />
        <BtSection width={"380px"} mgtop={"50px"}>
          <CancelBt onClick={closeModal}>취소</CancelBt>
          <SaveBt onClick={onConfirm}>확인</SaveBt>
        </BtSection>
      </LoginBox>
    </PwFindStyle>
  );
};

export default PwFind;
