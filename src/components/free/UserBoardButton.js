// 담당자: 사공은진
import { BoardWriterBt } from "../../styles/free/FreeDetailsPageStyle";

// 로그인 유저 == 게시글 작성자
export const UserBoardButton = ({
  userId,
  currentUserId,
  onDelete,
  onModify,
}) => {
  const isCurrentUser = userId === currentUserId;

  return (
    <>
      {isCurrentUser && (
        <BoardWriterBt>
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
        </BoardWriterBt>
      )}
    </>
  );
};
