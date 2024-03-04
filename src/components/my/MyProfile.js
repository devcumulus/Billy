import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Common } from "../../styles/CommonStyles";
import { getMyRental, getMyReview, getMyUser, getProd } from "../../api/my/my_api";
import { useSelector } from "react-redux";

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  height: 180px;
  border: 1px solid ${Common.color.p400};
  padding: 2rem;
  border-radius: 5px;
`;

const ProfileLeft = styled.div`
  display: flex;
  width: 520px;
  height: 140px;
  align-items: center;
  border-right: 1px solid ${Common.color.p500};
  div:nth-of-type(2) {
    margin-left: 2rem;
      h1 {
      font-weight: 400;
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.6rem;
    }
  }
`;

const ProfileImg = styled.div`
  width: 13rem;
  height: 13rem;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileRight = styled.div`
  display: flex;
  div {
    width: 120px;
    height: 80px;
    color: #777;
    text-align: center;
    border-right: 1px solid ${Common.color.p500};
    :last-of-type {
      width: 100px;
      border: 0;
    }
    p {
      width: 120px;
      font-size: 1.6rem;
      padding: 10px;
    }
    span {
      display: block;
      width: 120px;
      font-size: 1.8rem;
    }
  }
`;

const MyProfile = () => {
  const [result, setResult] = useState([]);
  const [data, setData] = useState([]);

  const iuser = useSelector((state) => state.loginSlice.iuser);


  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await getMyUser(iuser);
        const buyData = await getMyRental(1,1,1);
        const sellData = await getMyRental(1,-1,1);
        const reviewData = await getMyReview(1);
        const prodData = await getProd(1);
        setResult(result);
        setData([buyData.length, sellData.length, reviewData.length, prodData.length]);
      } catch (error) {
        console.error("Error fetching rental data:", error);
        // 에러 처리 로직 추가
      }
    };

    fetchData();
  }, []);

  return (
    <ProfileDiv>
      <ProfileLeft>
        <ProfileImg>
          <img src={`/pic/${result.storedPic}`} alt="회원정보 보기"/>
        </ProfileImg>
        <div>
          <h1>{result.nick}</h1>
          <p>통합별점: {result.rating} / 벌점: {result.penalty}</p> 
          <p>주소: {result.addr} {result.restAddr}</p>
          <p>전화번호: {result.phone}</p>
          <p>이메일: {result.email}</p>
        </div>
      </ProfileLeft>
      <ProfileRight>
        <div>
          <p>대여중</p>
          <span>{data[0]}</span>
        </div>
        <div>
          <p>대여 완료</p>
          <span>{data[1]}</span>
        </div>
        <div>
          <p>작성 후기</p>
          <span>{data[2]}</span>
        </div>
        <div>
          <p>등록 상품</p>
          <span>{data[3]}</span>
        </div>
      </ProfileRight>
    </ProfileDiv>
  );
};

export default MyProfile;
