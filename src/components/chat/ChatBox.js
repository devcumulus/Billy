//담당장 : 박준서
import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
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
} from "../../styles/chat/ChatStyles";

const ChatBox = ({ selectedProfile }) => {
  const [inputMessage, setInputMessage] = useState(""); // State to store input message
  const [chatMessages, setChatMessages] = useState([]); // State to store chat messages
  const [stompClient, setStompClient] = useState(null); // State to store Stomp client

  useEffect(() => {
    // When component mounts, create Stomp client and connect to WebSocket
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws-endpoint",
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("Stomp 클라이언트와 웹소켓 연결이 열렸습니다.");
      // Subscribe to a topic to receive messages
      client.subscribe("/topic/greetings", message => {
        console.log("서버로부터 메시지를 받았습니다:", message.body);
        // Parse received message and add it to chatMessages state
        const newMessage = {
          text: JSON.parse(message.body).content,
          isSender: false,
        };
        setChatMessages(prevMessages => [...prevMessages, newMessage]);
      });
    };

    client.onStompError = frame => {
      console.error("Stomp 오류:", frame.headers["message"]);
    };

    // Activate the Stomp client
    client.activate();

    // Set Stomp client to state
    setStompClient(client);

    // When component unmounts, disconnect Stomp client
    return () => {
      if (client && client.connected) {
        client.deactivate();
      }
    };
  }, []);

  const handleInputChange = e => {
    setInputMessage(e.target.value); // Update input message state
  };

  const handleKeyPress = e => {
    if (
      e.key === "Enter" &&
      inputMessage.trim() !== "" &&
      stompClient &&
      stompClient.connected
    ) {
      // Send message when Enter key is pressed and input message is not empty
      const message = {
        content: inputMessage,
      };
      stompClient.publish({
        destination: "/app/send-message",
        body: JSON.stringify(message),
      });
      setInputMessage(""); // Clear input after sending message
    }
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
              <ProfileName>{selectedProfile.profileName}</ProfileName>
              <p>{selectedProfile.productContent}</p>
            </ProfileInfoContainer>

            <ChatText>
              {chatMessages.map((message, index) => (
                <ChatMessage key={index} isSender={message.isSender}>
                  {message.text}
                </ChatMessage>
              ))}
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

export default ChatBox;
