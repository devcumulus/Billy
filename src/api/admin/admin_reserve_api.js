// 담당자: 최배근
import { jwtAxios } from "../../util/jwtUtil";
import { SERVER_URL } from "../config";

export const getAdminReserve = async (
    page,
    state,
    setReserveList,
    setReserveLength,
  ) => {
    try {
      let url = `${SERVER_URL}/api/admin/refund?page=${page}`
      if (state!==null) {
        url += `&status=${state}`;
      }
      const res = await jwtAxios.get(url);
      setReserveList([...res.data.refunds]);
      setReserveLength(res.data.totalRefundCount)
    } catch (error) {
        console.log(error);
    }
}

export const deleteIrefund = async (irefund,div) => {
    try {
        const url = `${SERVER_URL}/api/admin/refund/${irefund}?div=${div}`
        const res = await jwtAxios.delete(url);
        return res.data;
      } catch (error) {
          console.log(error);
      }
}