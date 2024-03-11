import React, { useEffect, useState } from "react";
import { PageWrapper, ChatBox, ChatList } from "../../styles/chat/ChatStyles";
import ChatProfile from "../../components/chat/ChatProfile";

import Layout from "../../layouts/Layout";
import ChatBoxComponent from "../../components/chat/ChatBoxComponent";

const ChatPage = () => {
  // 챗팅 글자들의 목록
  const [chatTextArr, setChatTextArr] = useState([]);

  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileSelect = profile => {
    setSelectedProfile(profile);
  };

  useEffect(() => {
    console.log("채팅목록 자여왔ㅇ요.", chatTextArr);
  }, [chatTextArr]);
  return (
    <Layout>
      <PageWrapper>
        <ChatBox>
          <ChatList>
            채팅 목록 <img src="/images/chat/Vector.svg" alt="Vector" />
          </ChatList>
          <ChatProfile
            onProfileSelect={handleProfileSelect}
            setChatTextArr={setChatTextArr}
          />
        </ChatBox>
        <ChatBox>
          <ChatBoxComponent
            selectedProfile={selectedProfile}
            chatTextArr={chatTextArr}
          />
        </ChatBox>
      </PageWrapper>
    </Layout>
  );
};

export default ChatPage;
