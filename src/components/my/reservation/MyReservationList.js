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
  MyManagementBt,
  MyManagementBtHover,
  MyReservationBtDiv,
} from "../../../styles/my/MyList";
import { Link } from "react-router-dom";
import MyMoreButton from "../MyMoreButton";
import { getCode, getMyRental, getReserve } from "../../../api/my/my_api";
import { ModalBackground } from "../../joinpopup/JoinPopUp";
import MyReservationModal from "./MyReservationModal";

const contentData = [
  {
    "iproduct": 0,
    "ipayment": 0,
    "deposit": 0,
    "totalPrice": 0,
    "rentalEndDate": "2024-02-28",
    "rentalStartDate": "2024-02-28",
    "duration": 0,
    "createdAt": "2024-02-28",
    "status": "string",
    "iuser": 0,
    "nick": "string",
    "userPic": "string",
    "proStoredPic": "string"
  }
]

const MyReservationList = ({ activeBtn }) => {
  const [activeButton, setActiveButton] = useState(true);
  const [data, setData] = useState([]);
  const [viewMore, setViewMore] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = buttonType => {
    setActiveButton(buttonType);
    setViewMore(1)
  };

  const handleLoadMore = async () => {
    try {
      let result;
        if (activeBtn === "예약 내역" && activeButton === true) {
          result = await getReserve(1, viewMore + 1);
        } else if (activeBtn === "예약 내역" && activeButton === false) {
          result = await getReserve(2, viewMore + 1)
        }
      setData(prevData => [...prevData, ...result]);
      setViewMore(prevViewMore => prevViewMore + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (activeBtn === "예약 내역" && activeButton === true) {
          result = await getReserve(1, viewMore);
        } else if (activeBtn === "예약 내역" && activeButton === false) {
          result = await getReserve(2, viewMore)
        }
        // setData(result);
        setData(contentData)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [activeButton, activeBtn]);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  };

  const onConfirm = async (selectCode) => {
    try {
      const result = await getCode(selectCode);
      setData(result);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    {showModal && (
      <>
      <MyReservationModal closeModal={closeModal} onConfirm={onConfirm}/>
      <ModalBackground></ModalBackground>
      </>
    )}
    <MyListDiv>
      <MyListTop>
        <h2>예약 내역</h2>
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
      {data &&
        data.map((item, index) => (
          <React.Fragment key={index}>
            {activeBtn === "예약 내역" && (
                <MyListMid>
                    <MyListMidImg>
                      <img
                        src={`/pic/${item.productStoredPic}`}
                        alt={item.title}
                      />
                    </MyListMidImg>
                    <MyListMidTxt>
                      <div>
                        <h2>{item.title}</h2>
                      </div>
                      <div>
                        <p>{item.price} 원</p>
                      </div>
                      <div>
                        <span>
                          대여기간 : {item.rentalStartDate} ~ {item.rentalEndDate}{" "}
                          ({item.rentalDuration}일)
                        </span>
                      </div>
                    </MyListMidTxt>
                  <MyListMidLast  size={"1.4rem"}>
                    <p>{item.rentalStartDate}</p>
                    <MyReservationBtDiv width={"15rem"}>
                        <MyManagementBt>취소</MyManagementBt>
                        <MyManagementBtHover width={"80px"} onClick={openModal}>식별코드</MyManagementBtHover>
                        
                    </MyReservationBtDiv>
                  </MyListMidLast>
                </MyListMid>
            )}
          </React.Fragment>
        ))}
      <MyListBottom>
        <MyMoreButton handleLoadMore={handleLoadMore} />
      </MyListBottom>
    </MyListDiv>
  </>
  );
};

export default MyReservationList;

