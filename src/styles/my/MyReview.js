// 담당자: 최배근
import styled from "@emotion/styled";
import { Common } from "../CommonStyles";

export const MyReviewDiv = styled.div`
  display: flex;
  gap: 2rem;
  position: relative;
  overflow: hidden;
  color: #000;
  padding: 1rem;
  border: 1px solid ${Common.color.primary};
  border-radius: 1rem;
  margin-top: 2.3rem;
  height: 12rem;
  width: 98rem;
`

export const MyReviewImg = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MyReviewTxt = styled.div`
  display: flex;
  flex-direction: column;
  width: 60rem;
  height: 10rem;
  div {
    height: 4rem;
  }
  h2 {
    height: 2.2rem;
    font-size: 1.7rem;
    font-weight: 400;
  }
  p {
    display: block;
    width: 60rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 1.4rem;
  }
  span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2; /* 표시할 줄 수 */
    width: 56rem;
    padding-top: 1rem;
    height: 5rem;
    line-height: 2rem;
    font-size: 1.4rem;
  }
`;

export const MyReviewTitle = styled.div`
    display: flex;
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 3;
    p {
        display: flex;
        align-items: center;
        padding: 0.8rem;
        font-size: 1.4rem;
        line-height: 1rem;
        background-color: transparent;
        border-radius: 3px;
        border: 1px solid ${Common.color.primary};
        :hover {
          background-color: ${Common.color.primary};
          color: #fff;
        }
    }
    button {
      cursor: pointer;
       display: flex;
        align-items: center;
        padding: 0.8rem;
        font-size: 1.4rem;
        line-height: 1rem;
        background-color: transparent;
        border-radius: 3px;
        border: 1px solid ${Common.color.primary};
        :hover {
          background-color: ${Common.color.primary};
          color: #fff;

        }
         img {
            padding-left: 0.5rem;
            object-fit: cover;
        }
    }
       
`

export const MyReviewPlus = styled.div`
    display: flex;
  align-items: end;
  justify-content: end;
  flex-direction: column;
  width: 11rem;
  height: 10rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  span {
    border-radius: 3px;
    padding: 6px;
    background-color: ${Common.color.primary};
    font-size: 1.2rem;
    color: #fff;
    cursor: pointer;
  }
`