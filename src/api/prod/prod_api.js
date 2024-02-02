import axios from "axios";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { jwtAxios } from "../../util/jwtUtil";
const path = `${SERVER_URL}/api/prod`;

export const failPostDatas = () => {
  const navigate = useNavigate();
  navigate("/");
};

// 로그인

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
    errorFn(error);
  }
};

export const putProd = async () => {
  try {
    const res = await jwtAxios.put(`${path}`);
    return res;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};
