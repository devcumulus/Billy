// 담당자: 최배근
import styled from '@emotion/styled';
import React from 'react';

const MyModalDiv = styled.div`
     position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100000;
    width: 300px;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    border-radius: 10px;
    border: 1px solid #2c39b5;
    background: #fff;
    p {
      color: #000;
      text-align: center;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    div {
        display: flex;
        gap: 20px;
    }
`
export const Confirm = styled.button`
    width: 80px;
    height: 40px;
    border-radius: 5px;
    border: none;
    background: #2c39b5;
    cursor: pointer;
    color: #fff;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
export const Cancel = styled(Confirm)`
    background-color: #fff;
    color: #2c39b5;
    border: 2px solid #2c39b5;
`

const MyCodeModal = ({ txt,onCancel, onConfirm }) => {
  return (
    <MyModalDiv>
      <p>내 식별코드: {txt}</p>
      <div>
        <Cancel onClick={onCancel}>닫기</Cancel>
        <Confirm onClick={onConfirm}>확인</Confirm>
      </div>
    </MyModalDiv>
  );
};

export default MyCodeModal;