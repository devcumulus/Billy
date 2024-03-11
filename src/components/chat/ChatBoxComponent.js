//담당장 : 박준서
import React, { useState, useEffect, useRef } from "react";
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
  ChatMessageWrapper,
  ChatBtn,
} from "../../styles/chat/ChatStyles";
import Modal from "./Modal";
import { postChat } from "../../api/chat/chat_api";
import { getCookie } from "../../util/cookieUtil";
import { Client } from "@stomp/stompjs";
import useCustomLogin from "../../hooks/useCustomLogin";

const ChatBoxComponent = ({ selectedProfile, chatTextArr }) => {
  const { loginState } = useCustomLogin();
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const chatContainerRef = useRef(null);
  const memberInfo = getCookie("member");
  const authToken = memberInfo ? memberInfo.accessToken : "your_default_token";

  const connectToChat = async () => {
    try {
      const stomp = new Client({
        brokerURL: "ws://192.168.0.144:5226/ws",
        connectHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
        debug: str => {
          console.log(str);
        },
        reconnectDelay: 20000,
        heartbeatIncoming: 40000,
        heartbeatOutgoing: 40000,
      });

      stomp.onStompError = () => {
        console.log("연결실패");
      };

      stomp.onConnect = () => {
        const subscriptionDestination = loginState.iuser
          ? `/exchange/chat.exchange/room.${selectedProfile.otherPersonIuser}`
          : `/exchange/chat.exchange/room.${selectedProfile.ichat}`;

        console.log("==== subscriptionDestination : ", subscriptionDestination);

        stomp.subscribe(subscriptionDestination, frame => {
          try {
            const parsedMessage = JSON.parse(frame.body);
            console.log(parsedMessage);
            setChatMessages(prevMessages => [...prevMessages, parsedMessage]);
            scrollToBottom();
          } catch (error) {
            console.error("오류가 발생했습니다:", error);
          }
        });
      };

      stomp.activate();
      setStompClient(stomp);
    } catch (error) {
      console.error("WebSocket 연결 중 오류가 발생했습니다:", error);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      chatContainerRef.current.offsetHeight;
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    connectToChat();
    scrollToBottom();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [selectedProfile]);

  const sendMessage = async () => {
    if (stompClient && stompClient.connected && selectedProfile) {
      const destination = `/pub/chat.send.${selectedProfile.ichat}`;

      const sendMSG = {
        senderIuser: loginState.iuser,
        receiveIuser: selectedProfile.otherPersonIuser,
        message: inputMessage,
      };

      console.log("리액트에서 보낸 데이터 형식 ", sendMSG);

      stompClient.publish({
        destination,
        body: JSON.stringify(sendMSG),
      });
    }

    setInputMessage("");
  };

  const handleInputChange = e => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = async e => {
    if (e.key === "Enter" && inputMessage.trim() !== "") {
      const newMessage = {
        text: inputMessage,
        isSender: true,
      };

      try {
        await sendMessage();
        console.log("채팅 메시지 전송 성공");
      } catch (error) {
        console.error("채팅 메시지 전송 실패:", error);
      }

      setChatMessages(prevMessages => [...prevMessages, newMessage]);
      setInputMessage("");
      scrollToBottom();
    }
  };

  const toggleModal = () => {
    setModalOpen(prevModalOpen => !prevModalOpen);
  };

  return (
    <ChatBoxWrapper>
      {selectedProfile ? (
        <ChatBoxContainer>
          <ChatBoxContent>
            <img
              src={`/pic/${selectedProfile.otherPersonPic}`}
              alt="Profile"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                marginBottom: "20px",
              }}
            />
            <ProfileInfoContainer>
              <ChatBtn
                onClick={toggleModal}
                src="/images/chat/more.png"
                alt="more"
              />
              <ProfileName>{selectedProfile.otherPersonNm}</ProfileName>
              <p>{selectedProfile.title}</p>
            </ProfileInfoContainer>
            <ChatText ref={chatContainerRef}>
              {modalOpen && <Modal onClose={toggleModal} />}
              <ChatBoxContent>
                {chatTextArr.map((item, index) => (
                  <ChatMessageWrapper
                    key={index}
                    style={
                      item.isender == selectedProfile.otherPersonIuser
                        ? { textAlign: "start" }
                        : { textAlign: "end" }
                    }
                  >
                    <ChatMessage
                      style={
                        item.isender == selectedProfile.otherPersonIuser
                          ? { background: "#e6e6fa" }
                          : { background: "#fafad2" }
                      }
                    >
                      {item.msg}
                    </ChatMessage>
                  </ChatMessageWrapper>
                ))}

                {chatMessages.map((message, index) => (
                  <ChatMessageWrapper
                    key={index}
                    style={
                      message.isSender === selectedProfile.otherPersonIuser
                        ? { textAlign: "start" } // 오른쪽 정렬
                        : { textAlign: "end" } // 왼쪽 정렬
                    }
                  >
                    <ChatMessage
                      style={
                        message.isSender === selectedProfile.otherPersonIuser
                          ? { background: "#e6e6fa", alignSelf: "flex-end" } // 오른쪽 정렬
                          : { background: "#fafad2", alignSelf: "flex-start" } // 왼쪽 정렬
                      }
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
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
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
