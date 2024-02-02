// DetailsPage.js

import React, { useState, useEffect } from "react";
import Layout from "../../layouts/Layout";
import MyMap from "../../components/details/MyMap";
import Profile from "../../components/details/Profile";
import { getProduct } from "../../api/details/details_api";
import Calendar from "../../components/details/Calendar";
import Like from "../../components/details/Like";
import SellerProfile from "../../components/details/SellerProfile";
import { Modal } from "antd"; // Ant Design 모달 컴포넌트 추가
import Pay from "../../components/details/Pay";
import {
  SubContainer,
  PageWrapper,
  BoxImg,
  ProductImage,
  Box,
  Title,
  Container,
  BtnChat,
  BtnPay,
  PriceContainer,
  Price,
  RentalText,
  ViewCount,
  AddressContainer,
  InfoContainer,
  Address,
  DetailedAddress,
  InfoLine,
  InfoText,
  PurchaseDateText,
  DepositText,
  DepositDetailText,
  MainContainer,
  ProductContent,
  ContentWrapper,
  MiniContainer,
  Caution,
  CautionContent,
  CautionText,
  HeaderText,
  CautionImage,
  BodyText,
  RedText,
  BlackText,
  Detail,
  PayRow,
  PayLabel,
  PayValue,
  TotalPrice,
  PayContainer,
} from "../../styles/details/DetailsPageStyles";

const DetailsPage = () => {
  const [showPayModal, setShowPayModal] = useState(false);
  const [productData, setProductData] = useState(null);
  const [detailContent, setDetailContent] = useState("");
  const [rentalDays, setRentalDays] = useState(0);
  const [paymentData, setPaymentData] = useState({
    rentPrice: 0,
    rentalDays: 0,
    deposit: 0,
  });

  const togglePayModal = () => {
    setShowPayModal(!showPayModal);
  };

  const handleDateSelect = (startDate, endDate) => {
    const timeDiff = Math.abs(endDate - startDate);
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    setRentalDays(days);

    const rentPrice = productData.rentalPrice || 0;
    const totalRentPrice = rentPrice * days;

    setPaymentData({
      ...paymentData,
      rentPrice: totalRentPrice,
      rentalDays: days,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const icategory = "1";
        const iproduct = "25";
        const response = await getProduct(icategory, iproduct);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <PageWrapper>
        <SubContainer>
          <BoxImg>
            <ProductImage
              src={`/pic/${productData.prodMainPic}`}
              alt="제품 이미지"
            />
          </BoxImg>
          <Box>
            <Title>
              <ContentWrapper>{productData.title}</ContentWrapper>
              <SellerProfile
                sellerName={productData.nick}
                profileImage={`/pic/${productData.userPic}`}
                iuser={productData.iuser}
                iauth={productData.iauth}
              />
            </Title>

            <PriceContainer>
              <Price>{productData.price.toLocaleString()} 원</Price>
              <RentalText>{productData.rentalDuration}</RentalText>
            </PriceContainer>
            <ViewCount>조회수 {productData.view.toLocaleString()}</ViewCount>
            <AddressContainer>
              <InfoContainer>
                <Address>
                  주소
                  <DetailedAddress>{productData.addr}</DetailedAddress>
                </Address>
                <InfoLine>
                  <InfoText>제품구매일 </InfoText>
                  <PurchaseDateText>{productData.buyDate}</PurchaseDateText>
                </InfoLine>
                <div>
                  <DepositText>보증금</DepositText>
                  <DepositDetailText>
                    {productData.deposit.toLocaleString()} 원
                  </DepositDetailText>
                </div>
              </InfoContainer>
            </AddressContainer>
            <Container>
              <Like />
              <BtnChat>채팅하기</BtnChat>
              <BtnPay onClick={togglePayModal}>결제하기</BtnPay>
            </Container>
            {showPayModal && (
              <Box visible={showPayModal} onCancel={togglePayModal}>
                <Pay
                  productData={productData}
                  paymentData={paymentData}
                  onClose={togglePayModal}
                />
              </Box>
            )}
          </Box>
        </SubContainer>
        <MainContainer>
          <ProductContent>상품내용</ProductContent>
        </MainContainer>
        <MiniContainer>
          <Caution>
            <CautionContent>
              <CautionText>
                <HeaderText>
                  <CautionImage
                    src="/images/details/caution.svg"
                    alt="경고창 이미지"
                  />
                  거래 전 주의사항 안내
                </HeaderText>
                <BodyText>
                  판매자가 별도의 메신저로 결제링크를 보내거나
                  직거래(직접송금)을
                  <br />
                  유도하는 경우 사기일 가능성이 높으니 거래를 자제해 주시고
                </BodyText>
                <BodyText>
                  <RedText>고객센터</RedText>
                  <BlackText>에 문의하시길 바랍니다.</BlackText>
                </BodyText>
              </CautionText>
            </CautionContent>
          </Caution>
          <Detail>{productData.contents}</Detail>
          <PayContainer>
            <Calendar onDateSelect={handleDateSelect} />
            <PayRow>
              <PayLabel>
                {productData.rentalPrice.toLocaleString()} 원 x{" "}
                {paymentData.rentalDays}일
              </PayLabel>
              <PayValue>
                {(
                  productData.rentalPrice * paymentData.rentalDays
                ).toLocaleString()}{" "}
                원
              </PayValue>
            </PayRow>
            <PayRow>
              <PayLabel>보증금</PayLabel>
              <PayValue>{productData.deposit.toLocaleString()} 원</PayValue>
            </PayRow>
            <TotalPrice />
            <PayRow>
              <PayLabel>총 합계</PayLabel>
              <PayValue>
                {(
                  productData.rentalPrice * paymentData.rentalDays +
                  productData.deposit
                ).toLocaleString()}{" "}
                원
              </PayValue>
            </PayRow>
          </PayContainer>
        </MiniContainer>

        {productData.x && productData.y && (
          <MyMap x={productData.x} y={productData.y} />
        )}

        <Profile reviews={productData.reviews} starCount={productData.rating} />
      </PageWrapper>
    </Layout>
  );
};

export default DetailsPage;
