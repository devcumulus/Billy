import styled from "@emotion/styled";
import { Common } from "../CommonStyles";

// Like styles
export const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 40px;
    height: 35px;
    margin-top: 54px;
    margin-right: 30px;
  }
`;

// Pay styles
export const Overlay = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 1);
`;

export const Box = styled.div`
  padding: 22px;
  width: 470px;
  height: 240px;
  display: flex;
  align-items: flex-start;

  border-bottom: 1px solid ${Common.color.primary};
  /* 모달이 상단에 위치하도록 수정 */
  position: fixed;
  top: 200px; /* 원하는 높이로 수정 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  background-color: #fff;
`;

export const SubBox = styled.div`
  padding: 20px;
  width: 470px;
  max-height: 380px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  position: fixed;
  top: 440px; /* 원하는 높이로 수정 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  background-color: #fff;
`;

export const Image = styled.img`
  width: 190px;
  height: 190px;
  margin-right: 25px;
  margin-bottom: 40px;
  border-radius: 10px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  width: 202px;
  height: 37px;
  color: #000;
  font-size: 15px;
  font-weight: 500;
`;

export const Duration = styled.div`
  width: 205px;
  height: 20px;
  color: #000;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 40px;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PriceLabel = styled.div`
  width: auto;
  height: 14px;

  color: #000;

  font-size: 13px;

  font-weight: 400;

  margin-bottom: 18px;
`;

export const PriceValue = styled(PriceLabel)`
  width: 65px;
  text-align: right;
`;

export const TotalPrice = styled.div`
  border-bottom: 1px solid ${Common.color.primary};
  margin-bottom: 15px;
`;

export const BtnCard = styled.div`
  width: 430px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 5px;

  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 16px;
  display: flex;

  text-align: center;
  cursor: pointer;

  color: ${props => (props.clicked ? "#fff" : "#000")};
  background-color: ${props => (props.clicked ? "#2c39b5" : "#f2f2ff")};

  &:hover {
    background: #2c39b5;
    color: #f2f2ff;
  }
`;
export const BtnPayList = styled(BtnCard)`
  width: 140px;
  height: 70px;
  flex-shrink: 0;
`;

export const BtnCancel = styled.div`
  width: 200px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #2c39b5;
  color: #2c39b5;
  margin-top: 45px;
  font-family: Inter;
  font-size: 16px;

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

export const BtnPay = styled(BtnCancel)`
  color: #2c39b5;

  margin-left: 20px;
`;

//ProFile styles
export const ProfileContainer = styled.div`
  width: 100%;
  height: 20px;
  display: flex;

  gap: 1rem;
`;

export const SellerProfileContainer = styled.div`
  width: 100%;
  height: 50px;
  position: absolute;
  margin-left: 500px;
  gap: 1rem;
`;

export const ProfileImg = styled.div`
  width: 70px;
  height: 70px;
  box-sizing: border-box;
  border-radius: 45px;
  overflow: hidden;
  font-size: 16px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const ProfileName = styled.div`
  width: 100px;
  height: 20px;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  margin-left: 12px;
`;

//Review styles

export const ReviewFormStyle = styled.div`
  width: 1260px;
  height: 380px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #2c39b5;
  padding-left: 20px;
  padding-top: 15px;
  font-size: 16px;
`;

export const ReviewProfile = styled.div`
  margin-top: 25px;

  width: 1220px;
  height: auto;
  flex-shrink: 0;
  position: relative; /* 상대 위치 설정 */
`;

export const ReviewProfileLine = styled.div`
  width: 100%;

  border-bottom: 1px solid #2c39b5;
  margin-top: 25px;
`;

export const CurrentDate = styled.div`
  width: 80px;
  height: 15px;
  color: #777;
  font-size: 13px;
  font-weight: 400;

  margin-left: auto;
`;

export const ReviewButton = styled.button`
  display: flex;
  width: 103px;
  height: 36px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: auto;
  margin-top: 25px;
  background-color: #fff;
  border-radius: 50px;
  border: 1px solid #2c39b5;
  cursor: pointer;
  &:hover {
    background: #2c39b5;
    color: #fff;
  }
`;

export const ReviewText = styled.div`
  width: 550px;
  height: auto;
  color: #777;
  font-size: 12px;
  font-weight: 400;
  margin-left: 92px;
  margin-top: 10px;
  white-space: pre-line;
`;
