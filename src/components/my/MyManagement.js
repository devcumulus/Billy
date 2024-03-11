// 담당자: 최배근
import React, { useEffect, useState } from "react";
import {
  MyListBottom,
  MyListDiv,
  MyListMid,
  MyListMidImg,
  MyListMidLast,
  MyListMidTxt,
  MyListTop,
  MyManagementBt,
  MyManagementBtHover,
  MyReservationBtDiv,
} from "../../styles/my/MyList";
import { getProd } from "../../api/my/my_api";
import { deleteProduct } from "../../api/details/details_api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyModal from "./interest/MyModal";
import { ModalBackground } from "../joinpopup/JoinPopUp";

const MyManagement = ({ activeBtn }) => {
  const [data, setData] = useState([]);
  // const [viewMore, setViewMore] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  const iuser = useSelector((state) => state.loginSlice.iuser);

  const handleDeleteProductClick = async (iproduct) => {
    try {
      const favResult = await deleteProduct(iproduct);
      const updatedResult = await getProd(iuser);
      setData(updatedResult.vo);

    } catch (error) {
      console.error("Error deleteBoard:", error);
    }
  };

  const handleDeleteProduct = (iproduct) => {
    setShowModal(true);
    setItemToDelete(iproduct);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    if (itemToDelete) {
      await handleDeleteProductClick(itemToDelete);
      setShowModal(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (activeBtn === "등록 상품 관리") {
          result = await getProd(iuser);
        } 
        setData(result.vo);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [activeBtn]);

  // const handleLoadMore = async () => {
  //   try {
  //     let result;
  //     if (activeBtn === "등록 상품 관리") {
  //       result = await getProd(iuser,viewMore + 1);
  //     } 
  //     setData(prevData => [...prevData, ...result.vo]);
  //     setViewMore(prevViewMore => prevViewMore + 1);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const formatNumberWithCommas = (number) => {
    return number.toLocaleString();
  };

  return (
    <MyListDiv>
       {showModal && (
        <>
        <MyModal onCancel={handleCancel} onConfirm={handleConfirm}  
        txt={
          <>
            이 게시글을  <br />
            삭제하시겠습니까?
          </>
        }/>
        <ModalBackground></ModalBackground>
        </>
      )}
      <MyListTop>
        {activeBtn === "등록 상품 관리" && <h2>등록 상품 관리</h2>}
      </MyListTop>
      {data &&
        data.map((item, index) => (
          <React.Fragment key={index}>
             {activeBtn === "등록 상품 관리" && (
              <MyListMid>
                  <Link to={`../details?mc=${item.mainCategory}&sc=${item.subCategory}&productId=${item.iproduct}`}>
                    <MyListMidImg>
                      <img
                        src={`/pic/${item.storedPic}`}
                        alt={item.title}
                      />
                    </MyListMidImg>
                    <MyListMidTxt>
                      <div>
                        <h2>{item.tilte}</h2>
                      </div>
                      <div>
                        <p>{formatNumberWithCommas(item.price)} 원</p>
                      </div>
                      <div>
                        <span>
                          {item.contents}
                        </span>
                      </div>
                    </MyListMidTxt>
                  </Link>
                  <MyListMidLast>
                    <p>{item.updatedAt}</p>
                    <MyReservationBtDiv>
                      <Link to={`../modify?mc=${item.mainCategory}&sc=${item.subCategory}&productId=${item.iproduct}`}>
                        <MyManagementBt>수정</MyManagementBt>
                      </Link>
                      <MyManagementBtHover onClick={() => handleDeleteProduct(item.iproduct)}>삭제</MyManagementBtHover>
                    </MyReservationBtDiv>
                  </MyListMidLast>
                </MyListMid>
             )}
          </React.Fragment>
        ))}
      <MyListBottom>
        {/* <MyMoreButton handleLoadMore={handleLoadMore} /> */}
      </MyListBottom>
    </MyListDiv>
  );
};

export default MyManagement;
