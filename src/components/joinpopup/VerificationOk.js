// 담당자: 최배근
import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  IdBox,
  LoginBox,
  Logo,
  LogoZone,
} from "../../styles/login/LoginPageStyle";
import {
  BtSection,
  CancelBt,
  SaveBt,
  VerifiBt,
} from "../../styles/join/JoinPageStyle";
import { verificationGet, verificationPost } from "../../api/join/join_api";

const VerificationStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  width: 500px;
  height: 560px;
  background: #fff;
  padding-top: 20px;
  border-radius: 10px;
`;

const VerificationOk = ({ closeModal, verifiData }) => {
  return (
    <VerificationStyle>
      <LogoZone>
        <Logo src="/images/logo.svg" style={{ marginBottom: "20px" }} />
      </LogoZone>
      <LoginBox height={"340px"} mgbtm={"50px"}>
        <p>본인인증을 완료하였습니다.</p>
        <IdBox
          type="text"
          placeholder="이름 예) 홍길동"
          value={verifiData.name}
        />
        <IdBox
          type="text"
          placeholder="휴대폰 번호 예) 01000000000"
          value={verifiData.phone}
        />
        <IdBox
          type="number"
          placeholder="생일 예) 20240301"
          value={verifiData.birthday}
        />

        <BtSection width={"380px"}>
          <VerifiBt onClick={closeModal}>본인 확인 완료</VerifiBt>
        </BtSection>
      </LoginBox>
    </VerificationStyle>
  );
};

export default VerificationOk;
