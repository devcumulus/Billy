import { jwtAxios } from "../../util/jwtUtil";
import { SERVER_URL } from "../config";

// 댓글 등록
export const postComment = async (iboard, comment) => {
  try {
    const url = `${SERVER_URL}/api/board/comment`;

    const res = await jwtAxios.post(url, { iboard, comment });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// 댓글 수정
export const patchComment = async (iboardComment,comment) => {
  try {
    const url = `${SERVER_URL}/api/board/comment`;

    const res = await jwtAxios.post(url, { iboardComment, comment });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// 댓글 삭제
export const deleteComment = async iboardComment => {
  try {
    const url = `${SERVER_URL}/api/board/comment/${iboardComment}`;

    const res = await jwtAxios.post(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};
