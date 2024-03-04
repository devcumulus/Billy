import axios from "axios";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { jwtAxios } from "../../util/jwtUtil";
const path = `${SERVER_URL}/api`;

const failPostDatas = () => {
  const navigate = useNavigate();
  navigate("/");
};

export const getProductFirst = async () => {
  try {
    const url = `${path}/prod/main`;
    const res = await jwtAxios.get(url);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};
export const getProduct = async (mainCategoryId, subCategoryId) => {
  try {
    const url = `${path}/prod/main`;
    const res = await jwtAxios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};

// 2차 기존 코드
// export const getProductFirst = async () => {
//   try {
//     const url = `${path}/prod/main?mc=1&mc=2&mc=3&mc=4&mc=5&sc=1&sc=1&sc=1&sc=1&sc=1`;
//     const res = await axios.get(url);
//     console.log(res);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     failPostDatas("/");
//   }
// };
// export const getProduct = async (mainCategoryId, subCategoryId) => {
//   try {
//     const url = `${path}/prod/main?mc=${mainCategoryId}&sc=${subCategoryId}`;
//     const res = await axios.get(url);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     failPostDatas("/");
//   }
// };



// 상품 상세 정보 출력
export const getProductDetail = async serverData => {
  try {
    const url = `${path}/prod/${serverData.mainCategoryId}/${serverData.subCategoryId}/{iproduct}?iproduct=${serverData.iproduct}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};

export const getMoreProduct = async (categoryId, subCategoryId, pageNum) => {
  try {
    const url = `${path}/prod/${categoryId}/${subCategoryId}?page=${pageNum}`;
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};
