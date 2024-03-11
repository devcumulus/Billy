// 담당자: 최배근
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
  span {
    font-size: 1.6rem;
  }
`;
const ReviewBox = styled.input`
  width: ${props => props.width ? props.width : "390px"};
  height: ${props => props.height ? props.height : "40px"};
  border-radius: 10px;
  border: 1px solid #2c39b5;
  padding-left: 20px;

  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 10px;
`

const MyReviewModal = (closeModal, ireviewPk,onConfirm, contents,rating) => {
  const [contentsData, setContentsData] = useState("")
  const [ratingData, setRatingData] = useState("")

  return (
    <ReservationDiv>
      <LoginBox height={"350px"} mgbtm={"50px"}>
        <p>
          리뷰 수정
        </p>
        <ReviewBox type="text" placeholder="" 
        value={contents}
        onChange={e => setContentsData(e.target.value)}
        />
        <span>별점 : </span>
        <ReviewBox width={"250px"} type="text" placeholder="" 
        value={rating}
        onChange={e => setRatingData(e.target.value)}
        /><span> 점</span>
        <BtSection width={"380px"} mgtop={"50px"}>
          <CancelBt onClick={closeModal}>닫기</CancelBt>
          <SaveBt onClick={()=> onConfirm(ireviewPk,contentsData,ratingData)}>확인</SaveBt>
        </BtSection>
      </LoginBox>
    </ReservationDiv>
  );
};

export default MyReviewModal;
