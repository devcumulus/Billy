import axios from "axios";
import { SERVER_URL } from "../config";
import { jwtAxios } from "../../util/jwtUtil";

const path = `${SERVER_URL}/api`;

//채팅방 목록
export const getChatList = async page => {
  try {
    const url = `${path}/chat?page=${page}`;
    const res = await jwtAxios.get(url);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//채팅방 생성
export const postChat = async (iuser, iproduct) => {
  try {
    const url = `${path}/chat/room/${iuser}?iproduct=${iproduct}`;
    const result = await jwtAxios.post(url);

    if (result.status === 200) {
      return 1;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to post chat");
  }
};

//채팅방 입장
export const getChat = async (ichat, page) => {
  try {
    const url = `${path}/chat/room/${ichat}?page=${page}`;
    const result = await jwtAxios.get(url);

    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to post chat");
  }
};

//채팅방 나가기 (삭제)
export const delChat = async ichat => {
  try {
    const url = `${path}/chat/${ichat}`;
    const result = await jwtAxios.delete(url);

    if (result.status === 200) {
      return 1;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to post chat");
  }
};

// export const getUserInfo = async userId => {
//   try {
//     const url = `${path}/user?id=${userId}`;
//     const res = await jwtAxios.get(url);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to get user info");
//   }
// };
