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



export const getMyRental = async (page,role) => {
  try {
    const url = `${path}/prod?page=${page}&role=${role}`;
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

export const getMyBuySell = async (role,page) => {
  try {
    const url = `${path2}/pay?role=${role}&page=${page}`;
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

export const putProduct = async () => {
  try {
    const res = await axios.put(`${path}`);
    return res;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};

export const patchWithdraw = async (uid,upw,phone) => {
  try {
    const url = `${path2}/user?uid=${uid}&upw=${upw}&phone=${phone}`
    const res = await jwtAxios.patch(url);
    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};

export const deleteProduct = async () => {
  try {
    const res = await axios.delete(`${path}`);
    return res;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};
