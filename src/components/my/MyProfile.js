import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Common } from "../../styles/CommonStyles";
import { getMyBuySell, getMyRental } from "../../api/my/my_api";

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
  width: 412px;
  height: 140px;
  align-items: center;
  border-right: 1px solid ${Common.color.p500};
  h1 {
    font-weight: 400;
    margin-left: 2rem;
  }
`;

const ProfileImg = styled.div`
  width: 7rem;
  height: 7rem;
  box-sizing: border-box;
  border-radius: 45px;
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
    padding: 0 10px;
    width: 170px;
    height: 80px;
    color: #777;
    text-align: center;
    border-right: 1px solid ${Common.color.p500};
    :first-of-type {
      margin-left: 4.3rem;
    }
    :last-of-type {
      border: 0;
    }
    p {
      width: 150px;
      font-size: 1.6rem;
      padding: 12px;
    }
    span {
      display: block;
      width: 150px;
      font-size: 1.8rem;
    }
  }
`;

const MyProfile = () => {
  const [result, setResult] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await getMyRental(1, 1);
        const buyData = await getMyBuySell(1, 1);
        const sellData = await getMyBuySell(2,1);
        const rentalData2 = await getMyRental(1, 2);
        setResult(result);
        setData([buyData.length, sellData.length, rentalData2.length]);
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
          <img src={`/pic/${result[0]?.userStoredPic}`} />
        </ProfileImg>
        <div>
          <h1>{result[0]?.targetNick}</h1>
        </div>
      </ProfileLeft>
      <ProfileRight>
        <div>
          <p>대여중 (구매)</p>
          <span>{data[0]}</span>
        </div>
        <div>
          <p>대여중 (판매)</p>
          <span>{data[1]}</span>
        </div>
        <div>
          <p>대여완료</p>
          <span>{data[2]}</span>
        </div>
      </ProfileRight>
    </ProfileDiv>
  );
};

export default MyProfile;
