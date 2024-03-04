import axios from "axios";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { jwtAxios } from "../../util/jwtUtil";
const path = `${SERVER_URL}/api/mypage`;
const path2 = `${SERVER_URL}/api`

const failPostDatas = () => {
  const navigate = useNavigate();
  navigate("/");
};



export const getMyRental = async (role,status,page) => {
  try {
    const url = `${path}/prod?role=${role}&status=${status}&page=${page}`;
    const res = await jwtAxios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};

export const getMyInterest = async (page) => {
  try {
    const url = `${path}/fav?page=${page}`;
    const res = await jwtAxios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};

export const getMyReview = async (page) => {
  try {
    const url = `${path}/review?page=${page}`;
    const res = await jwtAxios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
}

export const getProdReview = async () => {
  try {
    const url = `${path}/prod/review`;
    const res = await jwtAxios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
}

export const getMyBoard = async () => {
  try {
    const url = `${path}/board?`;
    const res = await jwtAxios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
}

export const getMyDispute = async (page) => {
  try {
    const url = `${path}/dispute?page=${page}`;
    const res = await jwtAxios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
}

export const getMyUser = async (iuser) => {
  try {
    const url = `${path2}/user?tar=${iuser}`;
    const res = await jwtAxios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
}

export const putMyInfo = async ({product}) => {
  try {
    const header = {headers: {"Content-Type": "multipart/form-data"}};
    const url = `${path2}/user`
    const res = await jwtAxios.put(url, product, header);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const patchWithdraw = async (data) => {
  try {
    const url = `${path2}/user`
    const res = await jwtAxios.patch(url,data);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};

export const patchDispute = async (idispute) => {
  try {
    const url = `${path}/dispute?idispute=${idispute}`
    const res = await jwtAxios.patch(url)
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/")
  }
}
 
export const getReserve = async (role,page) => {
  try {
    const url = `${path}/reserve?role=${role}&page=${page}`
    const res = await jwtAxios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/")
  }
}

export const getProd = async (page) => {
  try {
    const url = `${path}/prod2?page=${page}`
    const res = await jwtAxios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/")
  }
}

export const deleteMyBoard = async (iboard) => {
  try {
    const url = `${path2}/board/${iboard}`
    const res = await jwtAxios.delete(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
}

export const getCode = async (code) => {
  try {
    const url = `${path2}/pay/code?code=${code}`
    const res = await jwtAxios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/")
  }
}

export const getPaymentData = async (ipayment) => {
  try {
    const url = `${path2}/pay/${ipayment}`
    const res = await jwtAxios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/")
  }
}