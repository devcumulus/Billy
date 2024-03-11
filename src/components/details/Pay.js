// 담당자: 박준서
import React, { useState } from "react";
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
  BtnPayList,
  BtnPay,
  ModalContainer,
  Overlay,
} from "../../styles/details/DetailsComponentStyles";

const Pay = ({
  onClose,
  productData,
  paymentData,
  rentalStartDate,
  rentalEndDate,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [kakaoPayClicked, setKakaoPayClicked] = useState(false);
  const [cardClicked, setCardClicked] = useState(false);
  const [tossPayClicked, setTossPayClicked] = useState(false);
  const [paycoClicked, setPaycoClicked] = useState(false);
  const [bankTransferClicked, setBankTransferClicked] = useState(false);
  const [bankDepositClicked, setBankDepositClicked] = useState(false);
  const [phoneClicked, setPhoneClicked] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 결제 상태 추가
  const [paymentDetailId, setPaymentDetailId] = useState(null); // 결제 상세 ID 추가
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 결제 방법을 선택했을 때의 처리를 담당하는 함수입니다.
  const handlePaymentMethodClick = method => {
    setSelectedPaymentMethod(method);

    setIsModalOpen(true);
    // 선택된 결제 방법에 따라 해당 결제 방법을 강조하기 위해 각각의 결제 방법 상태를 업데이트합니다.
    setKakaoPayClicked(method === "kakaoPay");
    // setCardClicked(method === "credit-card");
    // setTossPayClicked(method === "tossPay");
    // setPaycoClicked(method === "payco");
    // setBankTransferClicked(method === "bankTransfer");
    // setBankDepositClicked(method === "bankDeposit");
    // setPhoneClicked(method === "phone");

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

      if (res.status === 200) {
        const { nextRequestUrl, id } = res.data;
        // 카카오페이 API에서 받은 URL로 이동합니다.
        window.location.href = nextRequestUrl; // 현재 창에서 이동
        setPaymentDetailId(id); // 결제 상세 ID를 저장합니다.
      } else {
        // 실패 시 오류 처리
        alert("카카오페이 결제 과정에서 오류가 발생했습니다.");
        console.error("카카오페이 결제 과정에서 오류가 발생했습니다.", res);
      }
    } catch (error) {
      // 실패 시 오류 처리
      alert("카카오페이 결제 과정에서 오류가 발생했습니다.");
      console.error("카카오페이 결제 과정에서 오류가 발생했습니다.", error);
    }
  };

  const handlePayment = async () => {
    try {
      if (!selectedPaymentMethod) {
        alert("결제 방법을 선택해주세요.");
        return;
      }

      // 기존 결제 방식을 선택했을 때의 처리
      if (selectedPaymentMethod !== "kakaoPay") {
        // 기존의 결제 프로세스를 진행합니다.
        const res = await postProduct({
          itemName: productData.title,
          pricePerDay: productData.rentalPrice,
          rentalStartDate,
          rentalEndDate,
          paymentMethod: selectedPaymentMethod,
        });

        if (res.status === 200) {
          alert("결제가 완료되었습니다.");
          onClose();
        } else {
          alert("결제 과정에서 오류가 발생했습니다.");
          console.error("결제 과정에서 오류가 발생했습니다.", res);
        }
      } else {
        // 카카오페이 결제인 경우
        if (!paymentDetailId) {
          alert("카카오페이 결제 준비가 완료되지 않았습니다.");
          return;
        }
        // 카카오페이 결제 준비가 완료된 경우에만 진행합니다.
        // 이후에는 pg_token을 백엔드로 전송하여 결제 완료를 처리합니다.
        // pg_token은 백엔드에서 카카오페이 API로 요청할 때 필요한 값입니다.

        // URL에서 pg_token 값을 추출합니다.
        const urlParams = new URLSearchParams(window.location.search);
        const pgToken = urlParams.get("pg_token");

        if (!pgToken) {
          alert("카카오페이 결제가 완료되지 않았습니다.");
          return;
        }

        // 우리 서버로 pg_token 값을 포함하여 리다이렉션합니다.
        const kakaoPayRes = await getKakaoPay(paymentDetailId, pgToken);
        if (kakaoPayRes.status === 200) {
          alert("카카오페이 결제가 완료되었습니다.");
          onClose();
        } else {
          alert("카카오페이 결제 과정에서 오류가 발생했습니다.");
          console.error(
            "카카오페이 결제 과정에서 오류가 발생했습니다.",
            kakaoPayRes,
          );
        }
      }
    } catch (error) {
      alert("결제 과정에서 오류가 발생했습니다.");
      console.error("결제 과정에서 오류가 발생했습니다.", error);
    }
  };
  return (
    <>
      <Overlay>
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
          {/* <BtnPayList
            clicked={cardClicked}
            onClick={() => handlePaymentMethodClick("credit-card")}
          >
            신용카드
          </BtnPayList>
          <BtnPayList
            clicked={tossPayClicked}
            onClick={() => handlePaymentMethodClick("tossPay")}
          >
            <img src="/images/details/toss-pay.svg" alt="토스페이" />
          </BtnPayList>
          <BtnPayList
            clicked={paycoClicked}
            onClick={() => handlePaymentMethodClick("payco")}
          >
            <img src="/images/details/payco.svg" alt="페이코" />
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
            clicked={phoneClicked}
            onClick={() => handlePaymentMethodClick("phone")}
          >
            휴대폰
          </BtnPayList> */}

          <BtnCancel onClick={onClose}>취소하기</BtnCancel>
          <BtnPay onClick={handlePayment}>결제하기</BtnPay>
        </SubBox>
      </Overlay>
    </>
  );
};

export default Pay;
