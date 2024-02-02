import React, { useState } from "react";

import {
  Box,
  Image,
  TextContainer,
  Title,
  Duration,
  PriceRow,
  PriceLabel,
  PriceValue,
  TotalPrice,
  SubBox,
  BtnCancel,
  BtnCard,
  BtnPayList,
  BtnPay,
  ModalContainer,
  Overlay,
} from "../../styles/details/DetailsComponentStyles";

const Pay = ({ onClose }) => {
  const [cardClicked, setCardClicked] = useState(false);
  const [naverPayClicked, setNaverPayClicked] = useState(false);
  const [tossPayClicked, setTossPayClicked] = useState(false);
  const [paycoClicked, setPaycoClicked] = useState(false);
  const [bankTransferClicked, setBankTransferClicked] = useState(false);
  const [PhoneClicked, setPhoneClicked] = useState(false);
  const [bankDepositClicked, setBankDepositClicked] = useState(false);

  const handlePaymentMethodClick = method => {
    setCardClicked(method === "card");
    setNaverPayClicked(method === "naverPay");
    setTossPayClicked(method === "tossPay");
    setPaycoClicked(method === "payco");
    setBankTransferClicked(method === "bankTransfer");
    setBankDepositClicked(method === "bankDeposit");
    setPhoneClicked(method === "phone");
  };

  const [paymentData, setPaymentData] = useState({
    productImage: "/images/kong.jpg",
    productName: "애플워치 스페이스 닉네임",
    rentalPeriod: 30,
    price: 7000,
    deposit: 50000,
  });

  return (
    <>
      <Overlay>
        {/* <ModalContainer> */}
        <Box>
          <Image src={paymentData.productImage} alt="제품 이미지" />
          <TextContainer>
            <Title>{paymentData.productName}</Title>
            <Duration>대여기간 : {paymentData.rentalPeriod}일</Duration>

            <PriceRow>
              <PriceLabel>
                {paymentData.price} x {paymentData.rentalPeriod}일
              </PriceLabel>
              <PriceValue>
                {paymentData.price * paymentData.rentalPeriod} 원
              </PriceValue>
            </PriceRow>

            <PriceRow>
              <PriceLabel> 보증금 </PriceLabel>
              <PriceValue>{paymentData.deposit} 원</PriceValue>
            </PriceRow>
            <TotalPrice />

            <PriceRow>
              <PriceLabel> 총 합계 </PriceLabel>
              <PriceValue>
                {paymentData.price * paymentData.rentalPeriod +
                  paymentData.deposit}{" "}
                원
              </PriceValue>
            </PriceRow>
          </TextContainer>
        </Box>
        <SubBox>
          <BtnCard
            clicked={cardClicked}
            onClick={() => handlePaymentMethodClick("card")}
          >
            신용·체크카드
          </BtnCard>
          <BtnPayList
            clicked={naverPayClicked}
            onClick={() => handlePaymentMethodClick("naverPay")}
          >
            <img src="images/details/naverpay.svg" alt="네이버페이" />
          </BtnPayList>
          <BtnPayList
            clicked={tossPayClicked}
            onClick={() => handlePaymentMethodClick("tossPay")}
          >
            <img src="images/details/toss-pay.svg" alt="토스페이" />
          </BtnPayList>
          <BtnPayList
            clicked={paycoClicked}
            onClick={() => handlePaymentMethodClick("payco")}
          >
            <img src="images/details/payco.svg" alt="페이코" />
          </BtnPayList>
          <BtnPayList
            clicked={bankTransferClicked}
            onClick={() => handlePaymentMethodClick("bankTransfer")}
          >
            계좌이체
          </BtnPayList>
          <BtnPayList
            clicked={bankDepositClicked}
            onClick={() => handlePaymentMethodClick("bankDeposit")}
          >
            무통장입금
          </BtnPayList>
          <BtnPayList
            clicked={PhoneClicked}
            onClick={() => handlePaymentMethodClick("phone")}
          >
            휴대폰
          </BtnPayList>

          <BtnCancel onClick={onClose}>취소하기</BtnCancel>
          <BtnPay>결제하기</BtnPay>
        </SubBox>
      </Overlay>
    </>
  );
};

export default Pay;
