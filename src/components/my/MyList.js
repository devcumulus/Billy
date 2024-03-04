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
  MyReviewDiv,
} from "../../styles/my/MyList";
import ReviewForm from "../details/ReviewForm";
import MyMoreButton from "./MyMoreButton";
import { getMyRental, getPaymentData } from "../../api/my/my_api";
import { ModalBackground } from "../joinpopup/JoinPopUp";
import MyPayment from "./MyPayment";

const MyList = ({ activeBtn }) => {
  const [activeButton, setActiveButton] = useState(true);
  const [data, setData] = useState([]);
  const [viewMore, setViewMore] = useState(1);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const handleButtonClick = buttonType => {
    setActiveButton(buttonType);
    setViewMore(1);
  };

  const handleLoadMore = async () => {
    try {
      let result;
      if (activeBtn === "대여중" && activeButton === true) {
        result = await getMyRental(1, 1, viewMore + 1);
      } else if (activeBtn === "대여중" && activeButton === false) {
        result = await getMyRental(2, 1, viewMore + 1);
      } else if (activeBtn === "대여 완료" && activeButton === true) {
        result = await getMyRental(1, -1, viewMore + 1);
        result = result.filter(item => item.status === "EXPIRED");
      } else if (activeBtn === "대여 완료" && activeButton === false) {
        result = await getMyRental(2, -1, viewMore + 1);
        result = result.filter(item => item.status === "EXPIRED");
      }
      setData(prevData => [...prevData, ...result]);
      setViewMore(prevViewMore => prevViewMore + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const openReviewForm = paymentId => {
    setSelectedPaymentId(paymentId);
    setIsReviewFormOpen(true);
  };

  const openModal = async (item) => {
    try {
      const paymentResult = await getPaymentData(item);
      setPaymentData(paymentResult);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (activeBtn === "대여중" && activeButton === true) {
          result = await getMyRental(1, 1, viewMore);
        } else if (activeBtn === "대여중" && activeButton === false) {
          result = await getMyRental(2, 1, viewMore);
        } else if (activeBtn === "대여 완료" && activeButton === true) {
          result = await getMyRental(1, -1, viewMore);
          result = result.filter(item => item.status === "EXPIRED");
        } else if (activeBtn === "대여 완료" && activeButton === false) {
          result = await getMyRental(2, -1, viewMore);
          result = result.filter(item => item.status === "EXPIRED");
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
      {showModal && (
        <>
        <MyPayment data={paymentData} onConfirm={handleConfirm}/>
        <ModalBackground></ModalBackground>
        </>
      )}
      <MyListTop>
        {activeBtn === "대여중" ? <h2>대여중</h2> : <h2>대여완료</h2>}
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
            {activeBtn === "대여중" ? (
                <MyListMid>
                  <a onClick={() => openModal(item.ipayment)}>
                    <MyListMidImg>
                      <img
                        src={`/pic/${item.proStoredPic}`}
                        alt={item.title}
                      />
                    </MyListMidImg>
                    <MyListMidTxt>
                      <div>
                        <h2>{item.title}</h2>
                      </div>
                      <div>
                        <p>{item.totalPrice} 원</p>
                      </div>
                      <div>
                        <span>
                          대여기간 : {item.rentalStartDate} ~ {item.rentalEndDate}{" "}
                          ({item.rentalDuration}일)
                        </span>
                      </div>
                    </MyListMidTxt>
                  </a>
                  <MyListMidLast location={"center"} size={"1.2rem"}>
                    <p>거래자</p>
                    <MyListProfileImg>
                      <img src={`/pic/${item.userPic}`} />
                    </MyListProfileImg>
                    <span>{item.nick}</span>
                  </MyListMidLast>
                </MyListMid>
            ) : (
              <>
                <MyListMid>
                  <a onClick={() => openModal(item.ipayment)}> 
                    <MyListMidEnd />
                    {activeButton === true ? <h2>반 납 완 료</h2> : <h2>대 여 완 료</h2>}
                    <MyListMidImg>
                      <img
                        src={`/pic/${item.proStoredPic}`}
                        alt={item.ipayment}
                      />
                    </MyListMidImg>
                    <MyListMidTxt>
                      <div>
                        <h2>{item.title}</h2>
                      </div>
                      <div>
                        <p>{item.totalPrice} 원 </p>
                      </div>
                      <div>
                        <span>
                          대여기간 : {item.rentalStartDate} ~ {item.rentalEndDate}{" "}
                          ({item.rentalDuration}일)
                        </span>
                      </div>
                    </MyListMidTxt>
                  </a>
                  <MyListMidLast location={"center"} size={"1.2rem"}>
                    <p>거래자</p>
                    <MyListProfileImg>
                      <img src={`/pic/${item.userPic}`} />
                    </MyListProfileImg>
                    <span>{item.nick}</span>
                  </MyListMidLast> 
                </MyListMid>
                <MyReviewDiv>
                  {activeButton === true && (
                    <button onClick={() => openReviewForm(item.ipayment)}>
                    <p>리뷰 등록</p>
                    </button>
                  )}
                  {activeButton === false && (
                    //  <Link to={`/details/${item.categories.mainCategory}/${item.categories.subCategory}/${item.iproduct}`}>
                        <button>
                          <p>리뷰 보기</p>
                        </button>
                    // </Link>
                  )}
                </MyReviewDiv>
              </>
            )}
          </React.Fragment>
        ))}
      <MyListBottom>
        <MyMoreButton handleLoadMore={handleLoadMore} />
      </MyListBottom>
      {isReviewFormOpen && (
        <ReviewForm
          isOpen={isReviewFormOpen}
          onRequestClose={() => setIsReviewFormOpen(false)}
          ipayment={selectedPaymentId}
        />
      )}
    </MyListDiv>
  );
};

export default MyList;
