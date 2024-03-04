import styled from "@emotion/styled";
import React, { useState } from "react";
import { IdBox, LoginBox } from "../../../styles/login/LoginPageStyle";
import { BtSection, CancelBt, SaveBt } from "../../../styles/join/JoinPageStyle";

const ReservationDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 500px !important;
  height: 400px;
  background: #fff;
  padding-top: 20px;
  border-radius: 20px;
`;

const MyReservationModal = ({ closeModal, onConfirm }) => {
  const [selectCode, setSelectCode] = useState("")

  return (
    <ReservationDiv>
      <LoginBox height={"350px"} mgbtm={"50px"}>
        <p>
          식별 코드를 입력해주세요.
        </p>
        <IdBox type="text" placeholder="식별코드" 
        value={selectCode}
        onChange={e => setSelectCode(e.target.value)}
        />
        <BtSection width={"380px"} mgtop={"50px"}>
          <CancelBt onClick={closeModal}>닫기</CancelBt>
          <SaveBt onClick={onConfirm(selectCode)}>확인</SaveBt>
        </BtSection>
      </LoginBox>
    </ReservationDiv>
  );
};

export default MyReservationModal;
