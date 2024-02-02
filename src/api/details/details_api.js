import axios from "axios";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { jwtAxios } from "../../util/jwtUtil";
const path = `${SERVER_URL}/api/prod`;
const path2 = `${SERVER_URL}/api/user`;

const failPostDatas = () => {
  // const navigate = useNavigate();
  // navigate("/");
};

export const getProduct = async (icategory, iproduct) => {
  try {
    const url = `${path}/${icategory}/${iproduct}`;
    const res = await jwtAxios.get(url);

    return res;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};

export const getUserInfo = async userpk => {
  try {
    const url = `${path2}?=tar${userpk}`;
    const res = await jwtAxios.get(url);

    return res;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};

export const postProduct = async () => {
  try {
    const res = await axios.post(`${path}`);
    return res;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};

export const putProduct = async () => {
  try {
    const res = await axios.put(`${path}`);
    return res;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};

export const patchProduct = async () => {
  try {
    const res = await axios.patch(`${path}`);
    return res;
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
