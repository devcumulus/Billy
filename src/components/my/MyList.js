import React, { useEffect, useState } from "react";
import {
  MyListBottom,
  MyListDiv,
  MyListMid,
  MyListMidEnd,
  MyListMidImg,
  MyListMidLast,
  MyListMidTxt,
  MyListProfileImg,
  MyListTop,
  MyListTopButton,
} from "../../styles/my/MyList";
import MyMoreButton from "./MyMoreButton";
import { getMyBuySell, getMyRental } from "../../api/my/my_api";

const MyList = ({ activeBtn }) => {
  const [activeButton, setActiveButton] = useState(true);
  const [data, setData] = useState([]);
  const [viewMore, setViewMore] = useState(3);

  const handleButtonClick = buttonType => {
    setActiveButton(buttonType);
  };

  const handleLoadMore = () => {
    setViewMore((prevViewMore) => prevViewMore + 3);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (activeBtn === "대여중" && activeButton === true) {
          result = await getMyRental(1, 1);
        } else if (activeBtn === "대여중" && activeButton === false) {
          result = await getMyRental(1, 2);
        } else if (activeBtn === "대여 완료" && activeButton === true) {
          result = await getMyBuySell(1,1);
        } else if (activeBtn === "대여 완료" && activeButton === false) {
          result = await getMyBuySell(2,1);
        }
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [activeButton, activeBtn]);

  return (
    <MyListDiv>
      <MyListTop>
        { activeBtn === "대여중" ? <h2>대여중</h2> : <h2>대여완료</h2>}
          <div>
            <MyListTopButton
            selected={activeButton}
              onClick={() => handleButtonClick(true)}
            >
              구매
            </MyListTopButton>
            <MyListTopButton
              selected={!activeButton}
              onClick={() => handleButtonClick(false)}
            >
              판매
            </MyListTopButton>
          </div> 
      </MyListTop>
      {data && data.slice(0, viewMore).map((item, index) => (
        <React.Fragment key={index}>
          { activeBtn === "대여중" ? (
          <MyListMid>
          <MyListMidImg>
            <img src={`/pic/${item.productStoredPic}`} alt={item.title} />
          </MyListMidImg>
          <MyListMidTxt>
            <div>
              <h2>{item.title}</h2>
            </div>
            <div>
              <p>{item.price} 원</p>
            </div>
            <div>
              <span>대여기간 : {item.rentalStartDate} ~ {item.rentalEndDate} ({item.rentalDuration}일)</span>
            </div>
          </MyListMidTxt>
          <MyListMidLast>
            <p>더보기</p>
          </MyListMidLast>
        </MyListMid>
         ) : (
          <MyListMid>
            <MyListMidEnd />
            <h2>반 납 완 료</h2>
            <MyListMidImg>
              <img src={`/pic/${item.prodMainPic}`} alt={item.ipayment} />
            </MyListMidImg>
            <MyListMidTxt>
              <div>
                <h2>{item.title}</h2>
              </div>
              <div>
                <p>{item.price} 원 </p>
              </div>
              <div>
              <span>대여기간 : {item.rentalStartDate} ~ {item.rentalEndDate} ({item.rentalDuration}일)</span>
              </div>
            </MyListMidTxt>
            <MyListMidLast location={"center"} size={"1.2rem"}>
              <p>거래자</p>
              <MyListProfileImg>
                <img src={`/pic/${item.userPic}`}/>
              </MyListProfileImg>
              <span>{item.nick}</span>
            </MyListMidLast>
            </MyListMid>
         )}
        </React.Fragment> 
      ))}
      <MyListBottom>
        <MyMoreButton handleLoadMore={handleLoadMore} />
      </MyListBottom>
    </MyListDiv>
  );
};

export default MyList;
