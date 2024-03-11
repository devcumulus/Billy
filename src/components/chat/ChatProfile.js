import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  ProfileContainer,
  ProfileImg,
  ProfileName,
} from "../../styles/details/DetailsComponentStyles";

import {
  ProductContent,
  CurrentDate,
  ProductContentWrapper,
  ChatProfileBox,
} from "../../styles/chat/ChatStyles";

// ChatProfile 컴포넌트에서 API를 호출하기 위한 함수를 import
import { getChatList, getChat } from "../../api/chat/chat_api";

const ChatProfile = ({ onProfileSelect, setChatTextArr }) => {
  const [chatList, setChatList] = useState([]);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [enteredChatRoom, setEnteredChatRoom] = useState(null); // State to track entered chat room

  useEffect(() => {
    async function fetchChatList() {
      try {
        const page = 1;
        const response = await getChatList(page);
        setChatList(response.data);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    }

    fetchChatList();
  }, []);

  const handleProfileSelect = async profile => {
    console.log("======================== profile : ", profile);
    try {
      // Call the getChat function to enter the chat room
      const result = await getChat(profile.ichat, 1);
      console.log("========== 채팅룸 진입 결과 : ", result);
      if (result) {
        setChatTextArr(result);
        setSelectedProfile(profile);
        setEnteredChatRoom(profile.ichat); // Set the entered chat room
        onProfileSelect(profile); // Notify the parent component about the selected profile
      }
    } catch (error) {
      console.error("Error entering chat room:", error);
    }
  };

  return (
    <>
      {chatList.map(data => (
        <ChatProfileBox
          key={data.ichat}
          onClick={() => handleProfileSelect(data)}
          selected={selectedProfile && selectedProfile.id === data.id}
        >
          <ProfileContainer>
            <ProfileImg>
              <img src={`/pic/${data.otherPersonPic}`} alt="Profile Image" />
            </ProfileImg>
            <ProfileName>{data.otherPersonNm}</ProfileName>
          </ProfileContainer>
          <ProductContentWrapper>
            <ProductContent>{data.title}</ProductContent>
          </ProductContentWrapper>
        </ChatProfileBox>
      ))}
    </>
  );
};

ChatProfile.propTypes = {
  onProfileSelect: PropTypes.func.isRequired,
};

export default ChatProfile;
