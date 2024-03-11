import { SERVER_URL } from "../config";
import { jwtAxios } from "../../util/jwtUtil";

const path = `${SERVER_URL}/api`;

export const getProducts = async (page, type, search, status, setTotalUserCount) => {
  try {
    let url = `${path}/admin/user?page=${page}&type=${type}`;

    // if (type) {
    //   url += `&type=${type}`;
    // }

    if (search) {
      url += `&search=${search}`;
    }

    if (status) {
      url += `&status=${status}`;
    }

    const res = await jwtAxios.get(url);
    setTotalUserCount(res.data.totalUserCount)
    return res.data?.users ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteUser = async (iuser, reason) => {
  try {
    const url = `${path}/admin/user/${iuser}?reason=${reason}`;
    const res = await jwtAxios.delete(url); // Changed method to DELETE
    return res.data?.user ?? null; // Assuming the response contains a single user object
  } catch (error) {
    console.log(error);
    return null;
  }
};
