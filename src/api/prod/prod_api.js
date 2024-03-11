import axios from "axios";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { jwtAxios } from "../../util/jwtUtil";
const path = `${SERVER_URL}/api/prod`;

export const failPostDatas = () => {
  const navigate = useNavigate();
  navigate("/");
};

// 상품 등록 api
export const postprod = async ({ product, successFn, failFn, errorFn }) => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.post(`${path}`, product, header);
    const resStatus = res.status.toString();
    if (resStatus.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("업로드 실패입니다.");
    }
  } catch (error) {
    errorFn(error.response?.status || 500);
  }
};

// 초기 데이터 가져오기
export const GetProd = async (mainicategory, subicategory, iproduct) => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.get(
      `${path}/${mainicategory}/${subicategory}/${iproduct}`,
      header,
    );
    // console.log(res.data);
    //derails_api 훔쳐보기
    // 엑시 오스 기본데이터 확인 했다 ....

    const resStatus = res.status.toString();
    if (resStatus.charAt(0) === "2") {
      // successFn(res.data);
      return res;
    } else {
      // failFn("업로드 실패입니다.");
    }
  } catch (error) {
    // errorFn(error.response?.status || 500);
  }
};

// 초기갑 모두 업데이트
export const putProd = async ({ product, successFn, failFn, errorFn }) => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.put(`${path}`, product, header);
    const resStatus = res.status.toString();
    if (resStatus.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("업로드 실패입니다.");
    }
  } catch (error) {
    errorFn(error.response?.status || 500);
  }
};

// get 기초 코드
const stay = {
  iuser: 1,
  nick: "현빈대마왕",
  userPic: "user/1/1c005a93-1284-455e-a25c-adfddb43c8cf.jpg",
  iauth: 1,
  iproduct: 316,
  title: "테스트",
  prodMainPic: "prod/main/316/60feacc2-6004-4d86-8302-04e5fdd2695d.jpg",
  price: 1000,
  rentalPrice: 100,
  deposit: 500,
  rentalStartDate: "2024-02-13",
  rentalEndDate: "2024-02-21",
  addr: "광주 서구 2순환로 2275",
  restAddr: "하하",
  prodLike: 0,
  istatus: 0,
  inventory: 3,
  isLiked: 0,
  view: 2,
  categories: {
    mainCategory: 1,
    subCategory: 1,
  },
  contents: "사용감 죽이네",
  prodSubPics: [
    {
      ipics: 215,
      prodPics: "prod/316/67bb5c5e-47c1-4765-adc6-5f09f19f4c64.jpg",
    },
  ],
  buyDate: "2024-02-11",
  x: 126.826514037352,
  y: 35.1594545934228,
  reviews: [],
};