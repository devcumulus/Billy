import { jwtAxios } from "../../util/jwtUtil";
import { SERVER_URL } from "../config";

// 신고내역 list 조회
export const getDispute = async (
  page,
  div,
  search,
  category,
  state,
  setReportList,
  setReportLength,
) => {
  try {
    let url = `${SERVER_URL}/api/admin/dispute?page=${page}&div=${div}`;
    if (search) {
      url += `&search=${search}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    if (state!==null) {
      url += `&status=${state}`;
    }

    const res = await jwtAxios.get(url);
    setReportList([...res.data.disputes]);
    setReportLength(res.data.totalDisputeCount)
  } catch (error) {
    console.log(error);
  }
};

// 신고 수락 or 반려
export const postDispute = async (idispute, type) => {
  try {
    const url = `${SERVER_URL}/api/admin/dispute/${idispute}?type=${type}`;

    const res = await jwtAxios.post(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};
