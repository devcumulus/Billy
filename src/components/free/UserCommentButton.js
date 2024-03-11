// 담당자: 사공은진
import { CommentWriterBt } from "../../styles/free/FreeDetailsPageStyle";

// 로그인 유저 == 댓글 작성자
export const UserCommentButton = ({
  userId,
  currentUserId,
  onDelete,
  onModify,
}) => {
  const isCurrentUser = userId === currentUserId;

  return (
    <>
      {isCurrentUser && (
        <CommentWriterBt>
          <button
            onClick={onModify}
            style={{ background: "#fff", color: "#2c39b5" }}
          >
            수정
          </button>
          <button
            onClick={onDelete}
            style={{ background: "#2c39b5", color: "#fff" }}
          >
            삭제
          </button>
        </CommentWriterBt>
      )}
    </>
  );
};
