//담당장 : 박준서
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled"; // 이모션에서 styled를 불러옵니다.
import { Link } from "react-router-dom";
import { delChat } from "../../api/chat/chat_api";

const ModalContent = styled.div`
  background-color: #e5e5fe;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  position: relative; /* 부모 요소로부터 상대적으로 위치 설정 */
  height: 60px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: inherit;
  color: inherit;
  display: flex;
  align-items: center; /* 버튼 내의 요소를 세로 중앙에 정렬 */
  justify-content: center; /* 버튼 내의 요소를 가로 중앙에 정렬 */
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Modal({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
    if (typeof onClose === "function") {
      onClose(); // 모달 닫기 함수 호출
    }
  };

  const handleReportClick = () => {
    console.log("신고하기 클릭됨");
    handleCloseModal();
  };

  const handleDeleteChat = async ichat => {
    try {
      // ichat을 인수로 전달하여 채팅을 삭제합니다.
      const response = await delChat(ichat);
      console.log("Chat deleted successfully:", response);
      // 채팅을 삭제한 후 추가적인 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error("Failed to delete chat:", error);
      // 채팅 삭제 실패 시 추가적인 처리를 수행할 수 있습니다.
    }
  };
  return (
    <ModalContent>
      <ActionButtons>
        <Button as={Link} to={`/report`} onClick={handleReportClick}>
          신고하기
        </Button>
        <Button onClick={handleDeleteChat}>채팅방 나가기</Button>
      </ActionButtons>
    </ModalContent>
  );
}

export default Modal;
