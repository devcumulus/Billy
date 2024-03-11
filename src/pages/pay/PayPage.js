import React, { useEffect, useState } from "react";
import {
  postProduct,
  postKakaoReady,
  getKakaoPay,
} from "../../api/details/details_api"; // Import postKakaoReady API
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
  BtnPay,
  Overlay,
} from "../../styles/details/DetailsComponentStyles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../layouts/Layout";
import { SideBar } from "../../components/SideBar";
import Mytitle from "../../components/my/Mytitle";

const PayPage = () => {
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [kakaoPayClicked, setKakaoPayClicked] = useState(false);// 결제 상태 추가
  const [paymentDetailId, setPaymentDetailId] = useState(null);// 결제 상세 ID 추가
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const {
    productData,
    paymentData,
    rentalStartDate,
    rentalEndDate,
  } = location.state;

  const navigate = useNavigate();
  // 결제 방법을 선택했을 때의 처리를 담당하는 함수입니다.
  const handlePaymentMethodClick = method => {
    setSelectedPaymentMethod(method);

    setIsModalOpen(true);
    // 선택된 결제 방법에 따라 해당 결제 방법을 강조하기 위해 각각의 결제 방법 상태를 업데이트합니다.
    setKakaoPayClicked(method === "kakaoPay");
    // 카카오페이가 선택되면 바로 카카오페이 API를 호출하고, 받은 URL로 이동합니다.
    if (method === "kakaoPay") {
      handleKakaoPay();
    }
  };

  const handleKakaoPay = async () => {
    try {
      const res = await postKakaoReady(
        productData.title,
        productData.rentalPrice,
        rentalStartDate,
        rentalEndDate,
      );
      const { nextRequestUrl, id } = res;
      const kakaoURL = `${nextRequestUrl}`
      window.location.href = kakaoURL;
      setPaymentDetailId(id);
    } catch (error) {
      // 실패 시 오류 처리
      alert("카카오페이 결제 과정에서 오류가 발생했습니다.");
      console.error("카카오페이 결제 과정에서 오류가 발생했습니다.", error);
    }
  };

  const { orderId } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const pgToken = queryParams.get("pg_token");


  const handlePayment = async () => {
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <SideBar />
      <Overlay>
        <div>
          <Mytitle title={"결제 하기"}/>
        </div>
        <Box>
          <Image src={`/pic/${productData.prodMainPic}`} alt="제품 이미지" />
          <TextContainer>
            <Title>{productData.title}</Title>
            <Duration>
              대여기간 : {rentalStartDate} ~ {rentalEndDate}
            </Duration>

            <PriceRow>
              <PriceLabel>일일 대여료</PriceLabel>
              <PriceValue>
                {" "}
                {(
                  productData.rentalPrice &&
                  productData.rentalPrice * paymentData.rentalDays
                ).toLocaleString()}
                원
              </PriceValue>
            </PriceRow>

            <PriceRow>
              <PriceLabel>렌탈일</PriceLabel>
              <PriceValue> {paymentData.rentalDays}일</PriceValue>
            </PriceRow>

            <TotalPrice />

            <PriceRow>
              <PriceLabel>총합계</PriceLabel>
              <PriceValue>
                {" "}
                {(
                  productData.rentalPrice &&
                  productData.rentalPrice * paymentData.rentalDays
                ).toLocaleString()}{" "}
                원
              </PriceValue>
            </PriceRow>
          </TextContainer>
        </Box>

        <SubBox>
          <BtnCard
            clicked={kakaoPayClicked}
            onClick={() => handlePaymentMethodClick("kakaoPay")}
          >
            {" "}
            <img src="/images/details/kakaopay.svg" alt="카카오페이" />
          </BtnCard>
          <BtnCancel onClick={handleCancel}>취소하기</BtnCancel>
          <BtnPay onClick={handlePayment}>결제하기</BtnPay>
        </SubBox>
      </Overlay>
    </Layout>
  );
};

export default PayPage;
