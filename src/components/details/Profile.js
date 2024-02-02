// Profile.js

import React, { useState } from "react";
import {
  ProfileContainer,
  ProfileImg,
  ProfileName,
  ReviewFormStyle,
  ReviewProfile,
  CurrentDate,
  ReviewButton,
  ReviewText,
  ReviewProfileLine,
} from "../../styles/details/DetailsComponentStyles";
import StarRating from "./StarRating";

const Profile = ({ reviews }) => {
  const [showAllProfiles, setShowAllProfiles] = useState(false);

  const initialProfileCount = 2;
  const visibleProfiles = showAllProfiles
    ? reviews
    : reviews.slice(0, initialProfileCount);

  const handleShowMore = () => {
    setShowAllProfiles(true);
  };

  const handleCancel = () => {
    setShowAllProfiles(false);
  };

  return (
    <ReviewFormStyle
      style={{ height: showAllProfiles ? "auto" : "420px", overflow: "hidden" }}
    >
      후기
      {visibleProfiles.map(review => (
        <ReviewProfile key={review.ireview}>
          <ProfileContainer>
            <ProfileImg>
              <img src={`/pic/${review.userProfPic}`} alt="Profile Image" />
            </ProfileImg>
            <ProfileName>{review.nick}</ProfileName>
          </ProfileContainer>
          {/* 별점 표시 - rating props 전달 */}
          <StarRating totalStars={5} rating={review.rating} />
          <ReviewText>{review.contents}</ReviewText>
          <ReviewProfileLine />
        </ReviewProfile>
      ))}
      {!showAllProfiles ? (
        <ReviewButton onClick={handleShowMore}>더 보기</ReviewButton>
      ) : (
        <ReviewButton onClick={handleCancel} style={{ marginBottom: "25px" }}>
          취소
        </ReviewButton>
      )}
    </ReviewFormStyle>
  );
};

export default Profile;
