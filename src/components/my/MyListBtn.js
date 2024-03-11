// 담당자: 최배근
import styled from "@emotion/styled";
import React from "react";
import { Common } from "../../styles/CommonStyles";

const MyListBtnDiv = styled.div`
  height: 42px;
  border-top: 1px solid ${Common.color.p500};
  border-bottom: 1px solid ${Common.color.p500};
  padding: 4px 10px 4px 0;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

const MyListButton = styled.button`
  border-radius: 5px;
  background: ${props => (props.active ? Common.color.primary : Common.color.p600)};
  color: ${props => (props.active ? Common.color.p600 : Common.color.p300)};
  width: ${props => (props.width ? props.width : "65px")};
  height: 32px;
  text-align: center;
  border: 0;
  cursor: pointer;
`;

const MyListBtn = ({ activeBtn, setActiveBtn, onButtonClick}) => {
  const handleButtonClick = subItem => {
    setActiveBtn(subItem);
    onButtonClick(subItem); 
  };

  return (
    <MyListBtnDiv>
      <MyListButton active={activeBtn === "대여중"} onClick={() => handleButtonClick("대여중")}>
        대여중
      </MyListButton>
      <MyListButton
        active={activeBtn === "대여 완료"}
        onClick={() => handleButtonClick("대여 완료")}
        width={"80px"}
      >
        대여 완료
      </MyListButton>
    </MyListBtnDiv>
  );
};

export default MyListBtn;
