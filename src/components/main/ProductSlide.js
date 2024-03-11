import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getProduct } from "../../api/main/main_api";
import {
  BtSlideNext,
  BtSlidePrev,
  SlideBtWrap,
} from "../../styles/main/SlideButton";
import { BtWrap } from "../../styles/main/mainStyle";
import MoreButton from "./MoreButton";
import Like from "../details/Like";
import JoinPopUp, { ModalBackground } from "../joinpopup/JoinPopUp";
import useCustomLogin from "../../hooks/useCustomLogin";

const ProductSlide = ({ btList, title, desc, id, data }) => {
  const navigate = useNavigate(`/details/`); // useNavigate 훅을 사용하여 navigate 함수 가져오기
  const [swiper, setSwiper] = useState();

  // 전달 받은 목록데이터
  const [productData, setProductData] = useState(data); // 상품 데이터 상태 추가
  // 활성화된 중분류 카테고리 버튼 번호 관리
  const [focus, setFocus] = useState(0);
  // Swiper
  console.log(id);
  // 중분류 메뉴 버튼 클릭시 처리
  const handleClickList = async (mainCategoryId, subCategoryId) => {
    try {
      const res = await getProduct(mainCategoryId, subCategoryId);
      setProductData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const { isLogin } = useCustomLogin();
  const [loginState, setLoginState] = useState(false);

  const handlePageChange = async _item => {
    if (isLogin) {
      const url = `/details?mc=${id}&sc=${focus + 1}&productId=${
        _item.iproduct
      }`;

      const serverData = {
        mainCategoryId: id,
        subCategoryId: focus + 1,
        iproduct: _item.iproduct,
      };
      navigate(url);
    } else {
      setLoginState(true);
      // navigate(`/login`);
    }
  };

  const closeModal = () => {
    setLoginState(false);
    navigate(`/login`);
  };

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(0, 0); // 슬라이더 초기화
    }
  }, [focus]);

  return (
    <div>
      {loginState && (
        <>
          <JoinPopUp txt="로그인 후 이용해주세요." onConfirm={closeModal} />
          <ModalBackground></ModalBackground>
        </>
      )}
      <div className="section-1">
        <div className="title">{title}</div>
        <div className="desc">{desc}</div>
        <BtWrap>
          {btList.map((item, index) => {
            return (
              <button
                key={`product-slide-bt-${id}-${index}`}
                className={focus === index ? "focus" : ""}
                onClick={() => {
                  setFocus(index);
                  handleClickList(id, item.id);
                }}
              >
                {item.title}
              </button>
            );
          })}
        </BtWrap>

        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          slidesPerGroup={4}
          navigation={{
            nextEl: `.slide-next-bt-${id}`,
            prevEl: `.slide-prev-bt-${id}`,
          }}
          onSwiper={setSwiper}
          onSlideChange={() => console.log("슬라이드 체인지")}
          className="mySwiper"
          modules={[Navigation]}
        >
          {productData &&
            productData.map((item, index) => {
              return (
                <SwiperSlide key={`productSlide-${id}-${index}`}>
                  <div onClick={() => handlePageChange(item)}>
                    {isLogin && (
                      <div className="like-wrap">
                        <Like
                          isLiked={item.isLiked !== 0 ? true : false}
                          productId={item.iproduct}
                        />
                      </div>
                    )}
                    <img src={`/pic/${item.prodMainPic}`} alt="" />
                    <div className="desc-wrap">
                      <span className="desc-title">{item.title}</span>
                      <hr />
                      <div className="desc-price">
                        {item.rentalPrice.toLocaleString()}
                      </div>
                      <div className="ad-view-wrap">
                        <div className="desc-ad">{item.addr}</div>
                        <div className="view">조회수{item.view}</div>
                      </div>
                      {item.hashTags.slice(0, 3).map((tagData, tagIndex) => (
                        <span key={tagIndex} className="hash-tag">{tagData.tag}</span>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <SlideBtWrap>
          <BtSlidePrev className={`slide-prev-bt-${id} c-slide-prev`}>
            <img src="../images/main/prev.svg" alt="prev" />
          </BtSlidePrev>
          <BtSlideNext className={`slide-next-bt-${id} c-slide-next`}>
            <img src="../images/main/next.svg" alt="next" />
          </BtSlideNext>
        </SlideBtWrap>

        <div>
          <MoreButton
            categoryId={id}
            subCategoryId={focus + 1}
            pageNum={1}
            title={btList[focus].title}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSlide;
