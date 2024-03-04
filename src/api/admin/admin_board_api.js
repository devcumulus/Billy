import axios from "axios";
import { SERVER_URL } from "../config";
import { jwtAxios } from "../../util/jwtUtil";

const path = `${SERVER_URL}/api`;

// 상품 게시판 api
export const getAllProducts = async (
  page,
  successFn,
  errorFn,
  type,
  search,
  sort,
) => {
  try {
    // http://192.168.0.144:5226/api/admin/product
    //                  /admin/product?page=${page}&type=${type}////
    console.log(type, search, sort);
    let base_url = `${path}/admin/product?page=${page}`;
    if (type && search) base_url += `&type=${type}&search=${search}`;
    if (sort && sort !== 0) base_url += `&sort=${sort}`;

    const res = await jwtAxios.get(base_url);
    const status = res.status.toString();
    
    if (status.charAt(0) === "2") successFn(res.data);

    return res.data;
  } catch (error) {
    const res = error.response.data;
    errorFn(res);
  }
};

export const deleteProduct = async (iproduct, reason, errorFn) => {
  try {
    // http://192.168.0.144:5226/api/admin/product/102?reason=1
    const url = `${path}/admin/product/${iproduct}?reason=${reason}`;
    const res = await jwtAxios.delete(url);
    const status = res.status.toString();
    // if (status.charAt(0) === "2") {
    //   successFn(res.data.result === 1);
    // }
    return res.data;
  } catch (error) {
    const res = error.response.data;
    errorFn(res);
  }
};

// 자유 게시판 api
export const getFreeBoard = async (
    page,
    successFn,
    errorFn,
    type,
    search,
    sort,
  ) => {
    try {
      // http://192.168.0.144:5226/api/admin/product
      //                  /admin/product?page=${page}&type=${type}////
      console.log(type, search, sort);
      let base_url = `${path}/admin/board?page=${page}`;
      if (type && search) base_url += `&type=${type}&search=${search}`;
      if (sort && sort !== 0) base_url += `&sort=${sort}`;
  
      const res = await jwtAxios.get(base_url);
      const status = res.status.toString();
      
      if (status.charAt(0) === "2") successFn(res.data);
      return res.data;
    } catch (error) {
      const res = error.response.data;
      errorFn(res);
    }
  };

// export const getFreeBoard = async (page, successFn, errorFn) => {
//     try {
//       // http://192.168.0.144:5226/api/admin/product
//       //                  /admin/product?page=${page}&type=${type}////
//       const url = `${path}/admin/board?page=${page}`;
//       const res = await jwtAxios.get(url);
//       const status = res.status.toString();
//       if (status.charAt(0) === "2") {
//         successFn(res.data);
//       }
//       return res.data;
//     } catch (error) {
//       const res = error.response.data;
//       errorFn(res);
//     }
//   };



export const deleteFreeBoard = async (iboard, reason, errorFn) => {
  try {
    //                  /admin/board/41?reason=1
    const url = `${path}/admin/board/${iboard}?reason=${reason}`;
    const res = await jwtAxios.delete(url);
    const status = res.status.toString();
    // if (status.charAt(0) === "2") {
    //   successFn(res.data.result === 1);
    // }
    return res.data;
  } catch (error) {
    const res = error.response.data;
    errorFn(res);
  }
};

// 신고된 채팅 전체 내역
export const getChatHistory = async (page, successFn, errorFn) => {
  try {
    // http://192.168.0.144:5226/api/admin/product
    //                  /admin/product?page=${page}&type=${type}////
    const url = `${path}/admin/chat?page=${page}`;
    const res = await jwtAxios.get(url);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    }
    return res.data;
  } catch (error) {
    const res = error.response.data;
    errorFn(res);
  }
};
