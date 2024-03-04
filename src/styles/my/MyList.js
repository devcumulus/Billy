import styled from "@emotion/styled";
import { Common } from "../CommonStyles";

export const MyListDiv = styled.div`
  background: ${Common.color.p500};
  border-radius: 1rem;
  padding: 2rem;
`;

export const MyListTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.5;
  }
  > div {
    display: flex;
    justify-content: center;
    gap: 5px;
  }
`;

export const MyListTopButton = styled.button`
  border-radius: 3px;
  border: 1px solid ${Common.color.primary};
  background: ${props =>
    props.selected ? Common.color.primary : Common.color.p500};
  color: ${props =>
    props.selected ? Common.color.p600 : Common.color.primary};
  width: 5rem;
  height: 2.5rem;
  text-align: center;
  cursor: pointer;
`;


export const MyListMid = styled.div`
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
  h2, a > h2 {
    position: absolute;
    top: 4rem;
    right: 40rem;
    font-size: 3rem;
    font-weight: 600;
    color: #fff;
  }
  a {
    display: flex;
    gap: 2rem;
    cursor: pointer;
  }
`;

export const MyListMidEnd = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 98rem;
  height: 12rem;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
`;

export const MyListMidImg = styled.div`
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

export const MyListMidTxt = styled.div`
  display: flex;
  flex-direction: column;
  width: 60rem;
  height: 10rem;
  gap: 1rem;
  h2 {
    height: ${props => (props.height ? props.height : "3.5rem")};;
    font-size: 1.4rem;
    font-weight: 400;
  }
  p {
    font-size: 2rem;
    font-weight: 400;
    height: 2.5rem;
  }
  span {
    display: block;
    width: 60rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 1.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  dt {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3; /* 표시할 줄 수 */
    width: 56rem;
    padding-top: 1rem;
    height: 7rem;
    line-height: 2rem;
    font-size: 1.4rem;
  }
`;

export const MyListMidLast = styled.div`
  display: flex;
  align-items: ${props => (props.location ? props.location : "end")};
  justify-content: space-between;
  flex-direction: ${props => (props.direction ? props.direction : "column")};
  width: 11rem;
  height: 10rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  div:nth-of-type(1) {
    display: flex;
    justify-content: end;
    width: 120px;
  }
  div:nth-of-type(2) {
    display: flex;
    justify-content: space-between;
    width: 11rem;
  }
  p {
    font-size: ${props => (props.size ? props.size : "1.4rem")};
  }
  button {
    z-index: 99;
    background: none;
    border: 0;
    cursor: pointer;
  }
  span {
    height: 2rem;
    line-height: 2rem;
    font-size: 1.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const MyReservationBtDiv = styled.div`
    display: flex ;
    justify-content: space-between !important;
    width: ${props => props.width ? props.width : "11rem"} !important; 
`

export const MyReviewDiv = styled.div`
    display: flex;
    margin-top: 10px;
    justify-content: end;
    width: 980px;
    button {
      cursor: pointer;
      width: 110px;
      height: 30px;
      border: 0;
      border-radius: 5px;
      background-color: #fcd508;
      color: #fff;
      z-index: 99;
    }
`

export const MyListProfileImg = styled.div`
  width: 6rem !important;
  height: 6rem !important;
  box-sizing: border-box;
  border-radius: 4.5rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MyListBottom = styled.div`
  margin-top: 2.3rem;
  display: flex;
  justify-content: center;
`;

export const MyStarDiv = styled.div`
  height: 2rem;
`;

export const MyProfileDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 6rem;
  height: 100%;
  gap: 2px;
  p {
    display: block;
    font-size: 1.4rem;
    margin: 0 auto;
    margin-bottom: 2px;
  }
  span {
    font-size: 1.2rem;
    margin: 0 auto;
  }
`;

export const MyManagementBt = styled.button`
  width: 50px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid ${Common.color.primary} !important;
  color: ${Common.color.primary};
`

export const MyManagementBtHover = styled(MyManagementBt)`
  background-color: ${Common.color.primary} !important;
  color: #fff;
  width: ${props => props.width ? props.width : "50px"};
`
export const CompManagementBt = styled.button`
  width: 110px;
  height: 30px;
  border-radius: 5px;
  background-color: #fcd508 !important;
  color: #fff;
`
export const CompManagementBtHover = styled(CompManagementBt)`
  background-color: transparent !important;
  color: #fcd508;
  border: 1px solid #fcd508 !important;
`


