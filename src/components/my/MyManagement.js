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
import MyMoreButton from "./MyMoreButton";
import { getProd } from "../../api/my/my_api";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../api/details/details_api";

const contentData = {
  "iuser": 0,
  "nick": "string",
  "userPic": "string",
  "iauth": 0,
  "iproduct": 0,
  "title": "string",
  "prodMainPic": "string",
  "rentalPrice": 0,
  "rentalStartDate": "2024-03-03T10:25:12.116Z",
  "rentalEndDate": "2024-03-03T10:25:12.116Z",
  "addr": "string",
  "restAddr": "string",
  "view": 0,
  "istatus": 0,
  "prodLike": 0,
  "isLiked": 0,
  "categories": {
    "mainCategory": 1,
    "subCategory": 1
  },
  "hashTags": [
    {
      "id": 0,
      "tag": "string"
    }
  ]
}

const MyManagement = ({ activeBtn }) => {
  const [activeButton, setActiveButton] = useState(true);
  const [data, setData] = useState([]);
  const [viewMore, setViewMore] = useState(1);

  const handleLoadMore = async () => {
    try {
      let result;
      if (activeBtn === "등록 상품 관리") {
        result = await getProd(viewMore);
      } 
      setData(prevData => [...prevData, ...result]);
      setViewMore(prevViewMore => prevViewMore + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (iproduct) => {
    const confirmDelete = window.confirm("삭제 하시겠습니까?");
    if (confirmDelete) {
      try {
        await deleteProduct(iproduct);
        console.log("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (activeBtn === "등록 상품 관리") {
          result = await getProd(viewMore);
        } 
        setData(Array.isArray(result) ? result : []);
        // setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [activeButton, activeBtn]);

  return (
    <MyListDiv>
      <MyListTop>
        {activeBtn === "등록 상품 관리" && <h2>등록 상품 관리</h2>}
      </MyListTop>
      {data &&
        data.map((item, index) => (
          <React.Fragment key={index}>
             {activeBtn === "등록 상품 관리" && (
              <MyListMid>
                  <Link to={`/details/${item.categories.mainCategory}/${item.categories.subCategory}/${item.iproduct}`}>
                    <MyListMidImg>
                      <img
                        src={`/pic/${item.prodMainPic}`}
                        alt={item.title}
                      />
                    </MyListMidImg>
                    <MyListMidTxt>
                      <div>
                        <h2>{item.title}</h2>
                      </div>
                      <div>
                        <p>{item.rentalPrice} 원</p>
                      </div>
                      <div>
                        <span>
                          대여기간 : {item.rentalStartDate} ~ {item.rentalEndDate}{" "}
                          ({item.rentalDuration}일)
                        </span>
                      </div>
                      <div>
                          {data && data.hashTags.map((item) => {
                            <span key={item.id}>{item.tag}</span>
                          })}
                      </div>
                    </MyListMidTxt>
                  </Link>
                  <MyListMidLast>
                    <p>{item.rentalStartDate}</p>
                    <MyReservationBtDiv>
                      <MyManagementBt>수정</MyManagementBt>
                      <MyManagementBtHover onClick={() => handleDeleteProduct(item.iproduct)}>삭제</MyManagementBtHover>
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
  );
};

export default MyManagement;
