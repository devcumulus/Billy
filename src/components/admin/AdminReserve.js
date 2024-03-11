// 담당자: 최배근
import styled from '@emotion/styled';
import React from 'react';

const MyModalDiv = styled.div`
     position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;

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
        :nth-of-type(1) {
            position: absolute;
            top: 10px;
            right: 10px;
            img {
                width: 25px;
                height: 25px;
                cursor: pointer;
            }
        }
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

const AdminReserve = ({ txt,onCancel, onConfirm, onClose }) => {
  return (
    <MyModalDiv>
      <p>{txt}</p>
      <div>
        <img src="/images/admin/bt_close.svg" onClick={onClose}></img>
      </div>
      <div>
        <Cancel onClick={onCancel}>거절</Cancel>
        <Confirm onClick={onConfirm}>수락</Confirm>
      </div>
    </MyModalDiv>
  );
};

export default AdminReserve;