import React, { useEffect, useState } from "react";
import {
  MyListBottom,
  MyListDiv,
  MyListMid,
  MyListTop,
  MyListMidLast,
  MyManagementBt,
  MyManagementBtHover,
} from "../../../styles/my/MyList";
import MyMoreButton from "../MyMoreButton";
import { getMyReview, getProdReview } from "../../../api/my/my_api";
import { get } from "react-hook-form";
import { Link } from "react-router-dom";
import { MyReviewDiv, MyReviewImg, MyReviewTxt,MyReviewTitle, MyReviewPlus } from "../../../styles/my/MyReview";

const contentData = [
  {
    ireview: 1,
    contents: 
    `
    좋은 매물이었어요.
    친절하시고 제품도 곧바로 받았네요.
    운동할때 사용하니까 편하고 좋더라고요.
    직접 구매하고 싶어졌어요.
    좋은 매물이었어요.
    친절하시고 제품도 곧바로 받았네요.
    운동할때 사용하니까 편하고 좋더라고요.
    직접 구매하고 싶어졌어요.
    `,
    rating: 4,
    nick: "바보준서",
    prodPic:"/pic/user/1/7a4ae1ef-0df7-4f29-9e9e-57a8b1ff238b.jpg",
    loginedUserPic: "/pic/user/1/7a4ae1ef-0df7-4f29-9e9e-57a8b1ff238b.jpg",
    categories: {
      imainCategory: "1",
      isubCategory: "1",
    },
    iproduct: "309",
    title: "갤럭시 워치 4 골프 에디션 4 - 44mm 블루투스 (블랙 에디션)"
  },
  {
    ireview: 1,
    contents: 
    `
    좋은 매물이었어요.
    친절하시고 제품도 곧바로 받았네요.
    운동할때 사용하니까 편하고 좋더라고요.
    직접 구매하고 싶어졌어요.
    좋은 매물이었어요.
    친절하시고 제품도 곧바로 받았네요.
    운동할때 사용하니까 편하고 좋더라고요.
    직접 구매하고 싶어졌어요.
    `,
    rating: 4,
    nick: "바보준서",
    prodPic:"/pic/user/1/7a4ae1ef-0df7-4f29-9e9e-57a8b1ff238b.jpg",
    loginedUserPic: "/pic/user/1/7a4ae1ef-0df7-4f29-9e9e-57a8b1ff238b.jpg",
    categories: {
      imainCategory: "1",
      isubCategory: "1",
    },
    iproduct: "309",
    title: "갤럭시 워치 4 골프 에디션 4 - 44mm 블루투스 (블랙 에디션)"
  },
]

const contentData2 = [
  {
    ireview: 0,
    contents: `친절하시고 제품도 곧바로 받았네요.
    운동할때 사용하니까 편하고 좋더라고요.
    직접 구매하고 싶어졌어요.`,
    rating: 3,
    iuser: 0,
    nick: "바보준서",
    userProfPic: "/pic/user/1/7a4ae1ef-0df7-4f29-9e9e-57a8b1ff238b.jpg",
    imainCategory: 1,
    isubCategory: 1,
    iproduct: "309",
    title: "갤럭시 워치 4 골프 에디션 4 - 44mm 블루투스 (블랙 에디션)"
  }
]

const MyReviewList = ({ activeBtn }) => {
  const [data, setData] = useState([]);
  const [viewMore, setViewMore] = useState(1);

  const handleLoadMore = () => {
    setViewMore(prevViewMore => prevViewMore + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (activeBtn === "내 작성 후기") {
          result = setData(contentData);
        } else if (activeBtn === "내 상품 후기") {
          result = setData(contentData2);
        }

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [activeBtn]);

  return (
    <MyListDiv>
      <MyListTop>
        {activeBtn === "내 작성 후기" ? (
          <h2>내 작성 후기</h2>
        ) : (
          <h2>내 상품 후기</h2>
        )}
        <div></div>
      </MyListTop>
      {data &&
        data.slice(0, viewMore).map((item, index) => (
          <React.Fragment key={index}>
            {activeBtn === "내 작성 후기" ? (
                <MyReviewDiv>
                  <div>
                    <MyReviewImg>
                      <img src={item.loginedUserPic}/>
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
                    <Link to={`/details/${item.categories.imainCategory}/${item.categories.isubCategory}/${item.iproduct}`}>
                      <button>
                        {item.title}
                        <img src="/images/mytitle_button.svg" alt="상세 정보로 이동" />
                      </button>
                    </Link>
                  </MyReviewTitle>
                  <MyListMidLast direction={"row"}>
                    <MyManagementBt>수정</MyManagementBt>
                    <MyManagementBtHover>삭제</MyManagementBtHover>
                  </MyListMidLast>
                </MyReviewDiv>
            ) : (
              <MyReviewDiv>
                <div>
                    <MyReviewImg>
                      <img src={item.userProfPic}/>
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
                    <Link to={`/details/${item.imainCategory}/${item.isubCategory}/${item.iproduct}`}>
                      <button>
                        후기 더보기
                      </button>
                    </Link>
                  </MyReviewTitle>
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
