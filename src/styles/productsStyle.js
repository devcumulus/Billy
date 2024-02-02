import styled from "@emotion/styled";
import { Common } from "./CommonStyles";

export const AllWidth = styled.div`
  width: 1260px;
  margin: 0 auto;
`;

export const PriceDiv = styled.div`
  justify-content: space-between;
  width: 86rem;
  input {
    width: 20rem !important;
    margin-right: 8px;
  }
  span {
    margin-left: 5px;
    font-size: 1.8rem;
  }
  p {
    display: block;
    padding-top: 5px;
    width: 20rem;
    text-align: center;
    font-size: 1.4rem;
  }
  .controlBt {
    display: flex;

    button {
      display: flex;
    }
  }
  .upBt {
    width: 36px;
    height: 20px;
    border-radius: 3px 3px 0px 0px;
    border: 1px solid #2c39b5;
    color: #4e4949;
    background: #fff;
    font-size: medium;
    text-align: center;
  }
  .downBt {
    width: 36px;
    height: 20px;
    border-radius: 0px 0px 3px 3px;
    border: 1px solid #2c39b5;
    color: #4e4949;
    background: #fff;
    font-size: medium;
    text-align: center;
  }
`;

export const ListDiv = styled.div`
  display: flex;
  margin-top: 6rem;

  :nth-of-type(1) {
    margin-top: 0;
  }
  label {
    display: flex;
    width: 12rem;
    p {
      font-size: 1.6rem;
      :nth-of-type(2) {
        color: #ff0303;
      }
    }
    span {
      margin-left: 5px;
      font-size: 1.6rem;
    }
  }
  > div {
    display: flex;

    flex-direction: ${props => (props.direction ? props.direction : "none")};
    gap: 1rem;

    input {
      width: 86rem;
      padding-left: 15px;
      height: 4rem;
      border-radius: 5px;
      border: 1px solid ${Common.color.primary};
      color: #000;
      font-size: 1.6rem;
    }
    input.showSpinner {
      width: 20rem;
    }
  }
  textarea {
    width: 86rem;
    resize: none;
    height: 28rem;
    border-radius: 5px;
    border: 1px solid ${Common.color.primary};
    padding: 15px;
    color: #000;
    font-size: 1.6rem;
  }
  h2 {
    font-size: 1.6rem;
    font-weight: 400;
    text-align: end;
  }
`;

export const BtWrap = styled.div`
  display: flex;
  padding-top: 10px;
  width: 250px;
  height: 230px;
  cursor: pointer;
  color: ${Common.color.primary};
  font-size: 16px;
  font-weight: 400;
  border-radius: 5px;
  border: 1px solid ${Common.color.primary};
`;
// 주 카테고리
export const BtnColor = styled.button`
  width: 24.5rem;
  border: 0;
  background: ${props => (props.clickbtn ? Common.color.p500 : "0")};
  height: 3.6rem;
  color: ${props =>
    props.clickbtn ? Common.color.primary : Common.color.p300};
`;
// 서브카테고리
export const BtnColorSub = styled.button`
  width: 24.5rem;
  border: 0;
  background: ${props => (props.clickbtn ? Common.color.p500 : "0")};
  height: 3.6rem;
  color: ${props =>
    props.clickbtn ? Common.color.primary : Common.color.p300};
`;

export const ProductImgBt = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  img {
    width: 18rem;
    height: 18rem;
    border: 1px solid ${Common.color.primary};
    border-radius: 5px;
    object-fit: cover;
  }
`;
export const ProductImgMap = styled.div`
  display: flex;
  flex-wrap: wrap !important;
  width: 500px;
  margin-left: 20px;
  img {
    width: 9rem;
    height: 9rem;
    border: 1px solid ${Common.color.primary};
    border-radius: 5px;
    object-fit: cover;
  }
`;
