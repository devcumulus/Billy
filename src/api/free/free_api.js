import axios from "axios";
import { SERVER_URL } from "../config";
import { jwtAxios } from "../../util/jwtUtil";

// FreePage 전체 게시글 호출
export const getFreeList = async ({
  page,
  search,
  type,
  sort,
  setFreeList,
  setFreeLength,
}) => {
  try {
    let url = `${SERVER_URL}/api/board?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }
    if (type) {
      url += `&type=${type}`;
    }
    if (sort) {
      url += `&sort=${sort}`;
    }

    const res = await jwtAxios.get(url);
    setFreeList([...res.data.boardList]);
    setFreeLength(res.data.totalBoardCount);
  } catch (error) {
    console.log(error);
  }
};

// 게시글 DetailsPage
export const getFreeData = async iboard => {
  try {
    const url = `${SERVER_URL}/api/board/${iboard}`;

    const res = await axios.get(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// 좋아요
export const getLike = async iboard => {
  try {
    const url = `${SERVER_URL}/api/board/like/${iboard}`;

    const res = await jwtAxios.get(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// 게시글 등록
export const postFreeData = async ({ obj }) => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };

    const url = `${SERVER_URL}/api/board`;
    const res = await jwtAxios.post(url, obj, header);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// 게시글 수정
export const putFreeData = async ({ obj }) => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };

    const url = `${SERVER_URL}/api/board`;
    const res = await jwtAxios.put(url, obj, header);
    return res;
  } catch (error) {
    console.log(error);
  }
};


// 게시글 삭제
export const deleteFreeData = async iboard => {
  try {
    const url = `${SERVER_URL}/api/board/${iboard}`;

    const res = await jwtAxios.delete(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};
