import React, { useState, useEffect } from "react";
import Layout from "../../layouts/Layout";
import MyMap from "../../components/details/MyMap";
import Profile from "../../components/details/Profile";
import { getProduct, deleteProduct } from "../../api/details/details_api";
import Calendar from "../../components/details/Calendar";
import Like from "../../components/details/Like";
import SellerProfile from "../../components/details/SellerProfile";
import { postChat } from "../../api/chat/chat_api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Pay from "../../components/details/Pay";
import ReportPost from "../../components/details/ReportPost";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ReportImage,
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
  ImageSlider,
  ImageContainer,
  PrevButton,
  NextButton,
  PrevImage,
  NextImage,
  Report,
} from "../../styles/details/DetailsPageStyles";
import { SideBar } from "../../components/SideBar";
import PayPage from "../pay/PayPage";

const UserDetails = ({
  userId,
  currentUserId,
  onDelete,
  onModify,
  iuser,
  iproduct,
}) => {
  const isCurrentUser = userId === currentUserId;

  return (
    <div style={{ position: "absolute", marginLeft: "550px", top: "20px" }}>
      {isCurrentUser && (
        <>
          <span
            onClick={onModify}
            style={{
              cursor: "pointer",
              fontSize: "15px",
              color: "#000",
            }}
            onMouseEnter={e => (e.target.style.color = "#2c39b5")}
            onMouseLeave={e => (e.target.style.color = "#000")}
          >
            수정 |
          </span>
          <span
            onClick={onDelete}
            style={{
              cursor: "pointer",
              fontSize: "15px",
              marginLeft: "5px",
            }}
            onMouseEnter={e => (e.target.style.color = "#CF1010")}
            onMouseLeave={e => (e.target.style.color = "#000")}
          >
            삭제
          </span>
        </>
      )}
    </div>
  );
};

const ProductSlider = ({ productData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    if (currentImageIndex === 0) {
      return;
    }
    setCurrentImageIndex(prevIndex => prevIndex - 1);
  };

  const handleNextImage = () => {
    if (currentImageIndex === productData.prodSubPics.length) {
      return;
    }
    setCurrentImageIndex(prevIndex => prevIndex + 1);
  };

  return (
    <ImageSlider>
      {/* 이전 버튼 */}
      {productData &&
        productData.prodSubPics &&
        productData.prodSubPics.length > 1 && (
          <PrevButton onClick={handlePrevImage}>
            <PrevImage src="/images/main/prev.svg" alt="prev" />
          </PrevButton>
        )}

      <ImageContainer>
        {/* 현재 이미지 */}
        {currentImageIndex === 0 ? (
          // 메인 이미지 표시
          <ProductImage
            src={`/pic/${productData.prodMainPic}`}
            alt="제품 이미지"
          />
        ) : (
          // 서브 이미지 표시
          <ProductImage
            src={`/pic/${
              productData.prodSubPics[currentImageIndex - 1].prodPics
            }`}
            alt="제품 이미지"
          />
        )}
      </ImageContainer>

      {/* 다음 버튼 */}
      {productData &&
        productData.prodSubPics &&
        productData.prodSubPics.length > 1 && (
          <NextButton onClick={handleNextImage}>
            <NextImage src="/images/main/next.svg" alt="next" />
          </NextButton>
        )}
    </ImageSlider>
  );
};

const DetailsPage = () => {
  const [productData, setProductData] = useState(null);
  const [rentalDays, setRentalDays] = useState(1);
  const [isReportClicked, setIsReportClicked] = useState(false);
  const [paymentData, setPaymentData] = useState({
    rentPrice: 0,
    rentalDays: 1,
    deposit: 0,
  });

  const [rentalStartDate, setRentalStartDate] = useState(null);
  const [rentalEndDate, setRentalEndDate] = useState(null);
  // const { mainCategory, subCategory, productId } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const mainCategory = parseInt(searchParams.get("mc"));
  const subCategory = parseInt(searchParams.get("sc"));
  const productId = parseInt(searchParams.get("productId"));
  const [createdChatRoom, setCreatedChatRoom] = useState(null);
  const iuser = useSelector(state => state.loginSlice.iuser);
  const navigate = useNavigate();

  const handleReportClick = () => {
    setIsReportClicked(true);
    // report/isure 경로로 이동
    navigate(`/report/${productData.iproduct}`, {
      state: { title: productData.title },
    });
  };

  const handleChatButtonClick = async () => {
    try {
      // 채팅방 생성 API 호출
      const { iuser, iproduct } = productData;
      const result = await postChat(iuser, iproduct);

      // API 호출이 성공하면 채팅 페이지로 이동
      if (result === 1) {
        // 생성된 채팅방 정보를 상태에 저장
        setCreatedChatRoom({ iuser, iproduct });
        navigate(`/chat/${iuser}/${iproduct}`);
      }
    } catch (error) {
      console.error("Failed to create chat room:", error);
      // 에러 처리
    }
  };

  const handleDeleteProduct = async () => {
    const confirmDelete = window.confirm("삭제 하시겠습니까?");
    if (confirmDelete) {
      try {
        await deleteProduct(productId);
        console.log("Product deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleModifyProduct = () => {
    navigate(
      `/modify?mc=${mainCategory}&sc=${subCategory}&productId=${productId}`,
    );
  };

  const handleProfile = iuser => {
    navigate(`profile/${iuser}/1`);
  };

  // const hashTags = productData.hashTags.map(tagData => tagData.tag).join(", ");

  const handleDateSelect = (startDate, endDate) => {
    setRentalStartDate(startDate);
    setRentalEndDate(endDate);
    const timeDiff = Math.abs(new Date(endDate) - new Date(startDate));
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
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
        const response = await getProduct(mainCategory, subCategory, productId);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [mainCategory, subCategory, productId]);

  if (!productData) {
    return <div></div>;
  }

  const handlePayPage = () => {
    // Check if all required data is available
    if (productData && paymentData && rentalStartDate && rentalEndDate) {
      navigate("/payment", {
        state: {
          productData,
          paymentData,
          rentalStartDate,
          rentalEndDate,
        },
      });
    } else {
      console.error("Some required data is missing.");
    }
  };

  return (
    <Layout>
      <SideBar />
      <PageWrapper>
        <SubContainer>
          <BoxImg>
            {productData && <ProductSlider productData={productData} />}
          </BoxImg>
          <Box>
            <Title>
              <ContentWrapper>
                {productData.title.length > 85
                  ? `${productData.title.slice(0, 85)}`
                  : productData.title}
              </ContentWrapper>
              <UserDetails
                productData={productData}
                userId={productData.iuser}
                currentUserId={iuser}
                onDelete={handleDeleteProduct}
                onModify={handleModifyProduct}
              />
              <SellerProfile
                sellerName={productData.nick}
                profileImage={`/pic/${productData.userPic}`}
                iuser={productData.iuser}
                onClick={handleProfile}
              />
            </Title>
            <PriceContainer>
              <Price>
                {productData && productData.rentalPrice
                  ? productData.rentalPrice.toLocaleString()
                  : null}{" "}
                원
              </Price>

              <RentalText>일일대여가</RentalText>
            </PriceContainer>
            <ViewCount>
              조회수
              {productData && productData.view
                ? productData.view.toLocaleString()
                : null}
              <Report onClick={handleReportClick}>
                <ReportImage
                  src="/images/details/report.png"
                  alt="신고이미지"
                />
                신고하기
              </Report>
            </ViewCount>

            <AddressContainer>
              <InfoContainer>
                <Address>
                  주소
                  <DetailedAddress>{productData.addr}</DetailedAddress>
                </Address>
                {/* <InfoLine>
                  <InfoText>제품구매일 </InfoText>
                  <PurchaseDateText>{productData.buyDate}</PurchaseDateText>
                </InfoLine> */}
                <div>
                  <DepositText> 해시태그</DepositText>
                  <DepositDetailText>
                    {productData && productData.hashTags
                      ? productData.hashTags
                          .map(tagData => tagData.tag)
                          .join(", ")
                      : ""}
                  </DepositDetailText>
                </div>
              </InfoContainer>
            </AddressContainer>
            <Container>
              <Like
                isLiked={productData.isLiked}
                productId={productData.iproduct}
              />
              <BtnChat onClick={handleChatButtonClick}>채팅하기</BtnChat>
              <BtnPay onClick={handlePayPage}>결제하기</BtnPay>
            </Container>
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
                  직거래(직접송금)을 유도하는 경우 사기일 가능성이 높으니 거래를
                  자제해 주시고
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
              <PayLabel>일일 대여가 </PayLabel>

              <PayValue>
                {productData && productData.rentalPrice
                  ? productData.rentalPrice.toLocaleString()
                  : null}{" "}
                원
              </PayValue>
            </PayRow>
            <PayRow>
              <PayLabel>렌탈일</PayLabel>
              <PayValue>{rentalDays} 일</PayValue>
            </PayRow>

            <TotalPrice />
            <PayRow>
              <PayLabel>총합계</PayLabel>
              <PayValue>
                {(productData.rentalPrice * rentalDays).toLocaleString()} 원
              </PayValue>
            </PayRow>
          </PayContainer>
        </MiniContainer>

        <MyMap x={productData.x} y={productData.y} />

        <Profile reviews={productData.reviews} starCount={productData.rating} />
        {/* <ReportPost></ReportPost> */}
      </PageWrapper>
    </Layout>
  );
};

export default DetailsPage;
