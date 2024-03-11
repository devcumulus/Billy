// 담당자: 최배근
import React, { useEffect, useState } from "react";
import { MyListBottom, MyListDiv, MyListMid, MyListMidImg, MyListMidLast, MyListMidTxt, MyListTop, MyListTopButton } from "../../../styles/my/MyList";
import MyMoreButton from "../MyMoreButton";
import { getMyInterest } from "../../../api/my/my_api";
import { Link } from "react-router-dom";
import {getFav} from "../../../api/details/details_api"
import MyModal from "./MyModal";
import { ModalBackground } from "../../joinpopup/JoinPopUp";


const MyInterestList = ({activeBtn}) => {
  const [data, setData] = useState([]);
  const [viewMore, setViewMore] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMyInterest(viewMore);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [activeBtn]);

  const handleFavoriteClick = async (iproduct) => {
    try {
      const favResult = await getFav(iproduct);

      const updatedResult = await getMyInterest(1);
      setData(updatedResult);
      setViewMore(1);
    } catch (error) {
      console.error("Error favoriting:", error);
    }
  };

  const handleLoadMore = async () => {
    try {
      const result = await getMyInterest(viewMore + 1);
      setData(prevData => [...prevData, ...result]);
      setViewMore(prevViewMore => prevViewMore + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (item) => {
    setShowModal(true);
    setItemToDelete(item);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    if (itemToDelete) {
      await handleFavoriteClick(itemToDelete.iproduct);
      setShowModal(false);
    }
  };

  const formatNumberWithCommas = (number) => {
    return number.toLocaleString();
  };

  return (
    <MyListDiv>
      <MyListTop>
        <h2>관심 목록</h2>
        <div>
        </div>
      </MyListTop>
      {data && data.map((item, index) => (
        <React.Fragment key={index}>
            <MyListMid>
              <Link to={`/details?mc=${item.icategory.mainCategory}&sc=${item.icategory.subCategory}&productId=${item.iproduct}`}>
                <MyListMidImg>
                  <img src={`/pic/${item.pic}`}alt={item.title} />
                </MyListMidImg>
                <MyListMidTxt>
                  <div>
                    <h2>{item.title}</h2>
                  </div>
                  <div>
                    <p>{formatNumberWithCommas(item.rentalPrice)} 원</p>
                  </div>
                  <div>
                    <span>{item.contents}</span>
                  </div>
                </MyListMidTxt>
              </Link>
              <MyListMidLast>
                <button onClick={()=>handleDeleteClick(item)}>
                  <img src="/images/main/heart_hover.svg"/>
                </button>
              </MyListMidLast>
            </MyListMid>
        </React.Fragment> 
      ))}
      <MyListBottom>
        <MyMoreButton handleLoadMore={handleLoadMore}/>
      </MyListBottom>
      {showModal && (
        <>
        <MyModal onCancel={handleCancel} onConfirm={handleConfirm}  
        txt={
          <>
            관심목록에서 이 게시글을  <br />
            삭제하시겠습니까?
          </>
        }/>
        <ModalBackground></ModalBackground>
        </>
      )}
    </MyListDiv>
  );
};

export default MyInterestList;
