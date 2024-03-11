import React, { useEffect, useState } from "react";
import {
  Demerit,
  Header,
  PageWrap,
  ProfileImg,
  Rating,
  UserName,
  Wrap,
  Title,
  PostWrap,
  PostImg,
  PostDesc,
  ProfileWrap,
  UserInfo,
  PostInfo,
  Post,
  UserInfoWrap,
  PostInfoWrap,
  PageContainer,
} from "../../styles/user/UserProfileStyle";
import Layout from "../../layouts/Layout";
import { SideBar } from "../../components/SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import MyMoreButton from "../../components/my/MyMoreButton";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getUserProfile, getProductList } from "../../api/user/userProfile_api";

const postData = [
  {
    id: 1,
    title: "갤럭시 워치 4 골프 에디션 4 - 44mm 블루투스 (블랙 에디션)",
    price: "260,000원",
    date: "대여 기간 : 2024-01-11 ~ 2024-01-31  (30일)",
    profileImage: "../images/kong.jpg",
    userName: "바보준서",
    postImage: "../images/user/watch.jpeg",
  },
  {
    id: 1,
    title: "갤럭시 워치 4 골프 에디션 4 - 44mm 블루투스 (블랙 에디션)",
    price: "260,000원",
    date: "대여 기간 : 2024-01-11 ~ 2024-01-31  (30일)",
    profileImage: "../images/kong.jpg",
    userName: "바보준서",
    postImage: "../images/user/watch.jpeg",
  },
  {
    id: 1,
    title: "갤럭시 워치 4 골프 에디션 4 - 44mm 블루투스 (블랙 에디션)",
    price: "260,000원",
    date: "대여 기간 : 2024-01-11 ~ 2024-01-31  (30일)",
    profileImage: "../images/kong.jpg",
    userName: "바보준서",
    postImage: "../images/user/watch.jpeg",
  },
  {
    id: 1,
    title: "갤럭시 워치 4 골프 에디션 4 - 44mm 블루투스 (블랙 에디션)",
    price: "260,000원",
    date: "대여 기간 : 2024-01-11 ~ 2024-01-31  (30일)",
    profileImage: "../images/kong.jpg",
    userName: "바보준서",
    postImage: "../images/user/watch.jpeg",
  },
  {
    id: 1,
    title: "갤럭시 워치 4 골프 에디션 4 - 44mm 블루투스 (블랙 에디션)",
    price: "260,000원",
    date: "대여 기간 : 2024-01-11 ~ 2024-01-31  (30일)",
    profileImage: "../images/kong.jpg",
    userName: "바보준서",
    postImage: "../images/user/watch.jpeg",
  },
  {
    id: 1,
    title: "갤럭시 워치 4 골프 에디션 4 - 44mm 블루투스 (블랙 에디션)",
    price: "260,000원",
    date: "대여 기간 : 2024-01-11 ~ 2024-01-31  (30일)",
    profileImage: "../images/kong.jpg",
    userName: "바보준서",
    postImage: "../images/user/watch.jpeg",
  },
  {
    id: 1,
    title: "갤럭시 워치 4 골프 에디션 4 - 44mm 블루투스 (블랙 에디션)",
    price: "260,000원",
    date: "대여 기간 : 2024-01-11 ~ 2024-01-31  (30일)",
    profileImage: "../images/kong.jpg",
    userName: "바보준서",
    postImage: "../images/user/watch.jpeg",
  },
  {
    id: 1,
    title: "갤럭시 워치 4 골프 에디션 4 - 44mm 블루투스 (블랙 에디션)",
    price: "260,000원",
    date: "대여 기간 : 2024-01-11 ~ 2024-01-31  (30일)",
    profileImage: "../images/kong.jpg",
    userName: "바보준서",
    postImage: "../images/user/watch.jpeg",
  },
  {
    id: 1,
    title: "갤럭시 워치 4 골프 에디션 4 - 44mm 블루투스 (블랙 에디션)",
    price: "260,000원",
    date: "대여 기간 : 2024-01-11 ~ 2024-01-31  (30일)",
    profileImage: "../images/kong.jpg",
    userName: "바보준서",
    postImage: "../images/user/watch.jpeg",
  },
];

const initUserData = {
  "y": 0,
  "x": 0,
  "addr": "string",
  "restAddr": "string",
  "nick": "프론트",
  "storedPic": "string",
  "phone": "string",
  "email": "string",
  "rating": 0,
  "auth": "string",
  "istatus": 0,
  "status": "string",
  "penalty": 0,
  "iauth": 0
}
const initListData = [
  {
    "iuser": 0,
    "nick": "",
    "userPic": "",
    "iauth": 0,
    "iproduct": 0,
    "title": "",
    "prodMainPic": "",
    "rentalPrice": 0,
    "rentalStartDate": "2024-02-26T12:03:44.734Z",
    "rentalEndDate": "2024-02-26T12:03:44.734Z",
    "addr": "",
    "restAddr": "",
    "view": 0,
    "istatus": 0,
    "prodLike": 0,
    "isLiked": 0,
    "categories": {
      "mainCategory": 1,
      "subCategory": 1
    },
    "hashTags": [
      ""
    ],
    "icategory": {
      "mainCategory": 1,
      "subCategory": 1
    }
  }
]

const UserProfile = () => {
  const navigate = useNavigate();
  const moveToDetail = (mainCategory, subCategory, iproduct) => {
    navigate(`/details?mc=${mainCategory}&sc=${subCategory}&productId=${iproduct}`)
  }

  // 프로필 데이터
  const [userData, setUserData] = useState(initUserData);
  // console.log("userData", userData);

  // 제품 리스트 데이터
  const [userListData, setUserListData] = useState(initListData);
  // console.log("userListData", userListData);
  

  // details 페이지로 이동
  const { isLogin } = useCustomLogin();

  // const handlePageChangeDetails = async item => {
  //   console.log(item)
  //   if (isLogin) {
  //     // const serverData = {
  //     //   mainCategoryId: item.categories.mainCategory,
  //     //   subCategoryId: item.categories.subCategory,
  //     //   iproduct: item.iproduct,
  //     // };
  //     const url = `/details?mc=${item.categories.mainCategory}&sc=${item.categories.subCategory}&productId=${item.iproduct}`;
  //     // console.log(serverData);
  //     // const res = getProductDetail(serverData);
  //     navigate(url);
  //     // console.log(res);
  //   } else {
  //     setLoginState(true);
  //   }
  // };

  const handlePageChangeDetails = async (item) => {
    if (isLogin) {
      const url = `/details/${item.iproduct}`; // 상대방의 제품 아이디를 파라미터로 전달
      navigate(url);
    } else {
      setLoginState(true);
    }
  };

  // more 버튼 클릭시 게시물 5개씩 더보기
  const [viewMore, setViewMore] = useState(4);
  const handleLoadMore = () => {
    setViewMore(prevViewMore => prevViewMore + 5);
  };

  const { loginState } = useCustomLogin();
  const location = useLocation();
  const iuser = location.pathname.split("/")[2];

  // const iuser = loginState.iuser;
  console.log("iuser", iuser);

  const [page, setPage] = useState(1);
  


  useEffect(() => {
    getUserProfile(iuser, successGetFn, errorFn);
    getProductList(iuser, page, successFn, errorFn);
  }, [iuser, page]);


  const successFn = res => {
    console.log("성공했을때", res);
    setUserListData(res);
    console.log(res)
  };

  const successGetFn = res => {
    console.log("성공했을때", res);
    setUserData(res);
    console.log(res)
  };
  const errorFn = res => {
    console.log("실패", res);
    // alert(`${res.message} \n 에러코드(${res.errorCode})`);
  };

  // 벌점 숫자별 색상
  const getPenaltyColor = (penalty) => {
    const absPenalty = Math.abs(penalty); // penalty의 절대값을 구합니다.
  
    if (absPenalty >= 0 && absPenalty <= 20) {
      return "green"; // 초록색
    } else if (absPenalty >= 21 && absPenalty <= 30) {
      return "orange"; // 주황색
    } else if (absPenalty >= 31 && absPenalty <= 50) {
      return "red"; // 빨간색
    } else {
      return "black"; // 범위를 벗어난 값일 경우 검정색 반환
    }
  }
  


  return (
    <Layout>
      <SideBar />
      <PageContainer>
        <PageWrap>
          <Wrap>
            <Header>
              <div>프로필</div>
              <hr />
            </Header>
            {/* 유저 프로필 정보 */}
            <UserInfoWrap>
              <UserInfo>
                <div className="profile-wrap">
                  <ProfileImg>
                    <img src={`/pic/${userData.storedPic}`} />
                  </ProfileImg>
                  <UserName>{userData.nick}</UserName>
                </div>
                <hr />
                <div className="rating-wrap">
                  <Rating>
                    <div>통합 별점</div>
                    <div className="rating-score">
                      <span
                        style={{
                          color: "#2C39B5",
                          fontWeight: "500",
                        }}
                        >
                        {userData.rating}
                      </span>
                      <span>/ 5.0</span>
                    </div>
                  </Rating>
                  <hr />
                  <Demerit>
                    <div>벌점</div>
                    <div className="demerit-score">
                      <span
                        style={{
                          color: getPenaltyColor(userData.penalty),
                          fontWeight: "500",
                          fontSize: "25px",
                        }}
                      >
                        <span>{userData.penalty}</span>
                      </span>
                      <span>점</span>
                    </div>
                  </Demerit>
                </div>
              </UserInfo>
            </UserInfoWrap>
            {/* 제품리스트 */}
            <PostInfoWrap>
              <PostInfo>
                <Title>
                  <div>작성 게시물</div>
                  <div>{userListData.length}개</div>
                </Title>
                <PostWrap
                  className="item-wrap"
                >

                  {userListData.slice(0, viewMore).map((item, index) => (
                    <Post key={index} onClick={() => moveToDetail(item.icategory.mainCategory,item.icategory.subCategory,item.iproduct)}>

                      <div>
                        <PostImg>
                          <img src={`/pic/${item.prodMainPic}`} alt="Post Image" />
                        </PostImg>
                        <PostDesc>
                          <div className="post-info-title">{item.title}</div>
                          <div className="post-info-price">{item.rentalPrice.toLocaleString()}</div>
                          <div className="post-info-date">{new Date(item.rentalStartDate).toLocaleString()}</div>
                        </PostDesc>
                      </div>
                      <ProfileWrap>
                        <div>

                          <img src={`/pic/${item.userPic}`} alt="Profile Image" />

                        </div>
                        <div className="user-name">{item.nick}</div>
                      </ProfileWrap>
                    </Post>
                  ))}
                </PostWrap>
                <MyMoreButton handleLoadMore={handleLoadMore} />
              </PostInfo>
            </PostInfoWrap>
          </Wrap>
        </PageWrap>
      </PageContainer>
    </Layout>
  );
};

export default UserProfile;
