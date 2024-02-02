import styled from "@emotion/styled";
import { Common } from "../CommonStyles";
export const PageWrapper = styled.div`
  max-width: 1260px;
  margin: 0 auto;
`;

export const MainContainer = styled.div`
  gap: 60px;
  margin-top: 65px;

  display: flex;
  font-size: 16px;
`;

export const SubContainer = styled(MainContainer)`
  display: flex;
`;

export const ProductContent = styled.div`
  margin-left: 10px;
  margin-right: 620px;
`;

export const MiniContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const Box = styled.div`
  height: 550px;
  border-bottom: 1px solid #2c39b5;
`;

export const BoxImg = styled.div`
  height: 550px;
  flex: 0 0 560px;
`;

export const Title = styled.div`
  width: 360px;
  height: 77px;
  display: flex;
  color: #4b4b4b;

  font-size: 25px;

  font-weight: 400;

  margin-bottom: 15.32px;
`;
export const ContentWrapper = styled.div`
  display: flex;
`;

export const Price = styled.div`
  width: auto;
  max-width: 450px;
  height: 57.5px;
  flex-shrink: 0;
  color: #4b4b4b;
  font-family: Inter;
  font-size: 35px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-bottom: 40px;
`;

export const ViewCount = styled.div`
  margin-top: 28px;
  flex-shrink: 0;
  color: #4b4b4b;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 40px;
`;

export const Address = styled.div`
  width: 230px;
  height: 80px;
  flex-shrink: 0;
  color: #777;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-right: 1px solid #e4e7ff;
`;
export const PriceContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #2c39b5;
  padding-bottom: 50px;
`;
export const RentalText = styled.span`
  font-size: 18px;
  color: #6b6b6b;
  margin-left: 40px;
  margin-top: 20px;
`;
export const InfoContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  margin-bottom: 53px;
`;
export const InfoLine = styled.div`
  border-right: 1px solid #e4e7ff;
`;

export const InfoText = styled.span`
  height: 80px;
  flex-shrink: 0;
  color: #777;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const DepositText = styled(InfoText)`
  color: #fa5050;
  padding-left: 20px;
`;

export const DetailedAddress = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 28px;
`;

export const AddressContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #2c39b5;
`;

export const PurchaseDateText = styled.div`
  margin-top: 28px;
  margin-right: 20px;
  color: #2d2d2d;
  font-family: Inter;
  color: #000;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const DepositDetailText = styled.div`
  margin-left: 20px;
  margin-top: 28px;
  color: #2d2d2d;
  font-family: Inter;
  font-size: 18px;

  color: #000;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const BtnChat = styled.div`
  width: 200px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #2c39b5;
  color: #2c39b5;
  margin-top: 54px;
  margin-left: 45px;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  &:hover {
    background: #2c39b5;
    color: #fff;
  }
`;

// export const PayModal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   z-index: 9999;
//   background-color: white;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
// `;

// export const ModalBackdrop = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 9998;
// `;

export const BtnPay = styled(BtnChat)`
  color: #2c39b5;
`;

export const Container = styled.div`
  display: flex;
`;

export const Caution = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 710px;
  height: 112px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #f2f2ff;
  white-space: pre-wrap;
  padding: 10px;
  margin-right: 30px;
`;

export const Detail = styled.div`
  position: absolute;
  margin-top: 130px;
  margin-left: 10px;
  width: 730px;
  white-space: pre-wrap;
  flex-shrink: 0;
  color: #4b4b4b;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const CautionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CautionText = styled.div`
  margin-left: 10px;
  justify-content: center;
`;

export const CautionImage = styled.img`
  margin-right: 10px;

  margin-bottom: 5px;
`;
export const CautionsImage = styled.img`
  margin-left: 50px;
  right: auto;
`;

export const HeaderText = styled.p`
  text-align: center;
  color: #363636;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
`;

export const BodyText = styled.p`
  margin-top: 10px;
  color: #777;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
`;

export const RedText = styled.span`
  margin-left: 40px;
  color: #ff2f2f;
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
`;

export const BlackText = styled.span`
  color: #000;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const WishlistImage = styled.img`
  width: 50px;
  margin-top: 54px;
  margin-right: 110px;
`;

export const PayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 520px;
  height: 300px;
  flex-shrink: 0;
  padding-left: 20px;
  padding-right: 13px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 25px;

  border-radius: 20px;
  background: #fff;

  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);
`;

export const PayRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

export const PayLabel = styled.span`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 15px;
`;

export const PayValue = styled.span`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 25px;
`;

export const TotalPrice = styled.div`
  border-bottom: 1px solid ${Common.color.primary};
`;
