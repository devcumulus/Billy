import styled from '@emotion/styled';
import React from 'react';
import { Common } from '../../styles/CommonStyles';

const MyModalDiv = styled.div`
     position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    gap: 10px;
    width: 820px;
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #2c39b5;
    background: #fff;
    >div:nth-of-type(1) {
        display: flex;
        gap: 2rem;
        position: relative;
        overflow: hidden;
        color: #000;
        padding: 2rem;
        border: 1px solid ${Common.color.primary};
        border-radius: 1rem;
        height: 19rem;
        width: 78rem;
    }
    >div:nth-of-type(2) {
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
export const MyPaymentImg = styled.div`
  width: 15rem;
  height: 15rem;
  border-radius: 1rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MyPaymentTxt = styled.div`
    display: flex;
    flex-direction: column;
    width: 60rem;
    height: 15rem;
    gap: 5.5px;
    h2 {
        font-size: 16px;
        font-weight: 500;
        line-height: 18px;
        margin-bottom: 10px;
    }
    span {
        font-size: 14px;
        font-weight: 500;
        line-height: 16px;
    }
    p {
        font-size: 14px;
        font-weight: 500;
        line-height: 16px;
    }
`
export const MyPaymentLast = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-top: ${props => props.ptop ? props.ptop : `4px`};
    padding-bottom: 4px;
    border-bottom: ${props => props.bbottom ? props.bbottom : `1px solid #2c39b5`};
`

const MyPayment = ({data,onConfirm}) => {
  return (
    <MyModalDiv>
      <div>
        <MyPaymentImg>
            <img
                src={`/pic/${data.prodMainPic}`}
                alt={data.title}
            />
        </MyPaymentImg>
        <MyPaymentTxt>
            <div>
                <h2>{data.title}</h2>
            </div>
            <div>
                <span>
                    대여기간 : {data.rentalStartDate} ~ {data.rentalEndDate}
                </span>
            </div>
            <div>
                <p>결제수단: {data.method}</p>
            </div>
            <div>
                <p>내 식별코드: {data.myPaymentCode} / 거래자 식별코드: {data.code}</p>
            </div>
            <MyPaymentLast>
                <span>보증금</span>
                <span>{data.deposit} 원</span>
            </MyPaymentLast>
            <MyPaymentLast bbottom={"none"} ptop={"0px"}>
                <span>총 합계</span>
                <span>{data.totalPrice} 원</span>
            </MyPaymentLast>
        </MyPaymentTxt>   
      </div>
      <div>
        <Confirm onClick={onConfirm}>확인</Confirm>
      </div>
    </MyModalDiv>
  );
};

export default MyPayment;