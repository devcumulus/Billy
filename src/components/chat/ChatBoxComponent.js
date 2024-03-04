import React, { useState } from "react";
import {
  ChatBoxContainer,
  ChatBoxWrapper,
  ChatBoxContent,
  ChatInput,
  ProfileInfoContainer,
  NoChatSelectedMessage,
  ChatText,
  ProfileName,
  ChatMessage,
  ButtonContainer,
  ChatBtn,

  ChatMessageWrapper,

} from "../../styles/chat/ChatStyles";
import Modal from "./Modal"; // 모달 컴포넌트 불러오기

const ChatBoxComponent = ({ selectedProfile, messages }) => {
  const [inputMessage, setInputMessage] = useState(""); // State to store input message
  const [chatMessages, setChatMessages] = useState([]); // State to store chat messages
  const [modalOpen, setModalOpen] = useState(false);




  const handleInputChange = e => {
    setInputMessage(e.target.value); // Update input message state
  };
  const handleKeyPress = e => {
    if (e.key === "Enter" && inputMessage.trim() !== "") {
      // Send message when Enter key is pressed and input message is not empty
      const newMessage = {
        text: inputMessage,
        isSender: true,
      }; // New message object
      setChatMessages([...chatMessages, newMessage]); // Add new message to chatMessages
      setInputMessage(""); // Clear input after sending message
    }
  };

  const openModal = () => {

    setModalOpen(prevModalOpen => !prevModalOpen);

  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
  };

  return (
    <ChatBoxWrapper>
      {selectedProfile ? (
        <ChatBoxContainer>
          <ChatBoxContent>
            <img
              src={selectedProfile.profileImage}
              alt="Profile"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                marginBottom: "20px",
              }}
            />
            <ProfileInfoContainer>
              {/* 모달 버튼 */}
              <ChatBtn
                onClick={openModal}
                src="/images/chat/more.png"
                alt="more"
              />
              {/* 모달 */}

              <ProfileName>{selectedProfile.profileName}</ProfileName>

              <p>{selectedProfile.productContent}</p>
            </ProfileInfoContainer>

            <ChatText>
              {modalOpen && <Modal onClose={closeModal} />}

              <ChatBoxContent>
                {chatMessages.map((message, index) => (
                  <ChatMessageWrapper
                    key={index}
                    style={{
                      justifyContent: message.isSender
                        ? "flex-end"
                        : "flex-start",
                    }}
                  >
                    <ChatMessage
                      style={{
                        backgroundColor: message.isSender
                          ? "#a3d8f4"
                          : "#f1f0f0",
                        alignSelf: message.isSender ? "flex-end" : "flex-start",
                      }}
                    >
                      {message.text}
                    </ChatMessage>
                  </ChatMessageWrapper>
                ))}
              </ChatBoxContent>

            </ChatText>
          </ChatBoxContent>
          <ChatInput
            type="text"
            placeholder="메시지를 입력하세요"
            value={inputMessage} // Bind input value to state
            onChange={handleInputChange} // Handle input change
            onKeyPress={handleKeyPress} // Handle Enter key press
          />
        </ChatBoxContainer>
      ) : (
        <NoChatSelectedMessage>
          프로필을 선택하여 채팅을 시작하세요.
        </NoChatSelectedMessage>
      )}
    </ChatBoxWrapper>
  );
};
export default ChatBoxComponent;
