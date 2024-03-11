import React, { useEffect, useState } from "react";
import {
  MyListBottom,
  MyListDiv,
  MyListMid,
  MyListMidEnd,
  MyListMidImg,
  MyListMidLast,
  MyListMidTxt,
  MyListTop,
  MyListTopButton,
  MyManagementBt,
  MyManagementBtHover,
  MyReservationBtDiv,
} from "../../../styles/my/MyList";
import MyMoreButton from "../MyMoreButton";
import {
  deletePay,
  getCode,
  getPaymentData,
  getReserve,
} from "../../../api/my/my_api";
import { ModalBackground } from "../../joinpopup/JoinPopUp";
import MyReservationModal from "./MyReservationModal";
import MyModal from "../interest/MyModal";
import MyCodeModal from "../interest/MyCodeModal";

const contentData = [
  {
    iproduct: 0,
    ipayment: 0,
    deposit: 0,
    totalPrice: 0,
    rentalEndDate: "2024-02-28",
    rentalStartDate: "2024-02-28",
    duration: 0,
    createdAt: "2024-02-28",
    status: "string",
    iuser: 0,
    nick: "string",
    userPic: "string",
    proStoredPic: "string",
  },
];

const MyReservationList = ({ activeBtn }) => {
  const [activeButton, setActiveButton] = useState(true);
  const [data, setData] = useState([]);
  const [viewMore, setViewMore] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeData, setCodeData] = useState(false);

  const handleButtonClick = buttonType => {
    setActiveButton(buttonType);
    setViewMore(1);
  };

  const handleLoadMore = async () => {
    try {
      let result;
      if (activeBtn === "예약 내역" && activeButton === true) {
        result = await getReserve(1, viewMore + 1);
      } else if (activeBtn === "예약 내역" && activeButton === false) {
        result = await getReserve(2, viewMore + 1);
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
          result = await getReserve(2, viewMore);
        }
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [activeButton, activeBtn]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onConfirm = async selectCode => {
    try {
      const result = await getCode(selectCode);
      setData(result);
    } catch (error) {
      console.error(error);
    }
    try {
      let result;
      if (activeBtn === "예약 내역" && activeButton === true) {
        result = await getReserve(1, viewMore);
      } else if (activeBtn === "예약 내역" && activeButton === false) {
        result = await getReserve(2, viewMore);
      }
      setData(result);
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };

  const formatNumberWithCommas = number => {
    return number.toLocaleString();
  };

  const handleDeleteReserve = async ipayment => {
    try {
      const DeleteReserve = await deletePay(ipayment);
      let updateReserve;
      if (activeBtn === "예약 내역" && activeButton === true) {
        updateReserve = await getReserve(1, viewMore);
      } else if (activeBtn === "예약 내역" && activeButton === false) {
        updateReserve = await getReserve(2, viewMore);
      }
      setData(updateReserve);
    } catch (error) {
      console.error("Error deletePay:", error);
    }
  };

  const handleDeleteClick = ipayment => {
    setDeleteModal(true);
    setItemToDelete(ipayment);
  };

  const handleCancel = () => {
    setDeleteModal(false);
  };

  const handleConfirm = async () => {
    if (itemToDelete) {
      await handleDeleteReserve(itemToDelete);
      setDeleteModal(false);
    }
  };

  const handleShowCode = async ipayment => {
    try {
      const paymentResult = await getPaymentData(ipayment);
      setCodeData(paymentResult);
      console.log(codeData);
    } catch (error) {
      console.error(error);
    }
    setShowCodeModal(true);
  };

  const handleCodeCancel = () => {
    setShowCodeModal(false);
  };

  const handleCodeConfirm = () => {
    setShowCodeModal(false);
  };

  return (
    <>
      {showModal && (
        <>
          <MyReservationModal closeModal={closeModal} onConfirm={onConfirm} />
          <ModalBackground></ModalBackground>
        </>
      )}
      {deleteModal && (
        <>
          <MyModal
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            txt={
              <>
                이 예약을 <br />
                취소하시겠습니까?
              </>
            }
          />
          <ModalBackground></ModalBackground>
        </>
      )}
      {showCodeModal && (
        <>
          <MyCodeModal
            txt={codeData.myPaymentCode}
            onCancel={handleCodeCancel}
            onConfirm={handleCodeConfirm}
          />
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
                  {item.status === "CANCELED" ? (
                    <>
                      {item.status === "CANCELED" && <MyListMidEnd />}
                      {item.status === "CANCELED" && <h2>예약 취소</h2>}
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
                          <p>{formatNumberWithCommas(item.totalPrice)} 원</p>
                        </div>
                        <div>
                          <span>
                            대여기간 : {item.rentalStartDate} ~{" "}
                            {item.rentalEndDate} ({item.duration}일)
                          </span>
                        </div>
                      </MyListMidTxt>
                    </>
                  ) : (
                    <a onClick={() => handleShowCode(item.ipayment)}>
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
                          <p>{formatNumberWithCommas(item.totalPrice)} 원</p>
                        </div>
                        <div>
                          <span>
                            대여기간 : {item.rentalStartDate} ~{" "}
                            {item.rentalEndDate} ({item.duration}일)
                          </span>
                        </div>
                      </MyListMidTxt>
                    </a>
                  )}
                  <MyListMidLast size={"1.4rem"}>
                    <p>{item.createdAt}</p>
                    {item.status === "CANCELED" ? (
                      <></>
                    ) : (
                      <>
                        <MyReservationBtDiv width={"15rem"}>
                          <MyManagementBt
                            onClick={() => handleDeleteClick(item.ipayment)}
                          >
                            취소
                          </MyManagementBt>
                          <MyManagementBtHover
                            width={"80px"}
                            onClick={openModal}
                          >
                            식별코드
                          </MyManagementBtHover>
                        </MyReservationBtDiv>
                      </>
                    )}
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
