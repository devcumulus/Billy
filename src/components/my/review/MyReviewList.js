// 담당자: 최배근
import React, { useEffect, useState } from "react";
import {
  MyListBottom,
  MyListDiv,
  MyListTop,
  MyListMidLast,
  MyManagementBt,
  MyManagementBtHover,
} from "../../../styles/my/MyList";
import MyMoreButton from "../MyMoreButton";
import { deleteMyReview, getMyReview } from "../../../api/my/my_api";
import { MyReviewDiv, MyReviewImg, MyReviewTxt,MyReviewTitle } from "../../../styles/my/MyReview";
import { Link } from "react-router-dom";
import ReviewFormModify from "../../details/ReviewFormModify";
import MyModal from "../interest/MyModal";
import { ModalBackground } from "../../joinpopup/JoinPopUp";

const MyReviewList = ({ activeBtn }) => {
  const [data, setData] = useState([]);
  const [viewMore, setViewMore] = useState(1);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewFormData, setReviewFormData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  const handleLoadMore = async () => {
    try {
      let result;
      if (activeBtn === "내 작성 후기") {
        result = await getMyReview(viewMore + 1);
      } 
      setData(prevData => [...prevData, ...result]);
      setViewMore(prevViewMore => prevViewMore + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReviewClick = async (ireview) => {
    try {
      await deleteMyReview(ireview);
        const updatedResult = await getMyReview(1);
        setData(updatedResult);
    } catch (error) {
      console.error("Error deleteBoard:", error);
    }
  };

  const handleDeleteReview = (ireview) => {
    setShowModal(true);
    setItemToDelete(ireview);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    if (itemToDelete) {
      await handleDeleteReviewClick(itemToDelete);
      setShowModal(false);
    }
  };

  const openReviewForm = (ireview) => {
    const selectedItem = data.find(item => item.ireview === ireview);
    setSelectedPaymentId(ireview);
    setIsReviewFormOpen(true);
    setReviewFormData({
      contents: selectedItem.contents,
      ireview,
      rating: selectedItem.rating,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (activeBtn === "내 작성 후기") {
          result = await getMyReview(viewMore);
        } 
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [activeBtn]);
  console.log(data);

  return (
    <MyListDiv>
      {showModal && (
        <>
        <MyModal onCancel={handleCancel} onConfirm={handleConfirm}  
        txt={
          <>
            후기을  <br />
            삭제하시겠습니까?
          </>
        }/>
        <ModalBackground></ModalBackground>
        </>
      )}
      {isReviewFormOpen && (
        <ReviewFormModify
          isOpen={isReviewFormOpen}
          onRequestClose={() => setIsReviewFormOpen(false)}
          ipayment={selectedPaymentId}
          contents={reviewFormData.contents}
          ireview={reviewFormData.ireview}
          rating={reviewFormData.rating}
          setData={setData}
        />
      )}
      <MyListTop>
        {activeBtn === "내 작성 후기" && (
          <h2>내 작성 후기</h2>
        )}
        <div></div>
      </MyListTop>
      {data &&
        data.map((item, index) => (
          <React.Fragment key={index}>
            {activeBtn === "내 작성 후기" && (
                <MyReviewDiv>
                  <div>
                    <MyReviewImg>
                      <img src={`/pic/${item.loginedUserPic}`}/>
                    </MyReviewImg>
                  </div>
                  <div>
                    <MyReviewTxt>
                        <h2>{item.nick}</h2>
                        <p>별점: {item.rating}점</p>
                        <span>{item.contents}</span>
                    </MyReviewTxt>
                  </div>
                  <MyReviewTitle>
                        <Link to={`../details?mc=${item.mainCategory}&sc=${item.subCategory}&productId=${item.iproduct}`}>
                          <div>
                            <p>{item.title}
                            </p>
                          </div>
                        </Link>
                  </MyReviewTitle>
                  <MyListMidLast direction={"row"}>
                    <MyManagementBt onClick={() => openReviewForm(item.ireview)}>수정</MyManagementBt>
                    <MyManagementBtHover onClick={() => handleDeleteReview(item.ireview)}>삭제</MyManagementBtHover>
                  </MyListMidLast>
                </MyReviewDiv>
            )}
          </React.Fragment>
        ))}
      <MyListBottom>
        <MyMoreButton
          handleLoadMore={handleLoadMore}
          display={"flex"}
          marginleft={"0px"}
        />
      </MyListBottom>
    </MyListDiv>
  );
};

export default MyReviewList;
