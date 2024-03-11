// 담당자: 박준서
import React, { useState, useRef, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import {
  ProfileContainer,
  ProfileImg,
  ProfileName,
  ReviewFormStyle,
  ReviewProfile,
  CurrentDate,
  tntnReivew,
  ReviewText,
  BtnStyles,
  ReviewProfileLine,
  BtnReivew,
} from "../../styles/details/DetailsComponentStyles";

import StarRating from "./StarRating";

const Profile = ({ reviews }) => {
  const [showAllProfiles, setShowAllProfiles] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [profileReviews, setProfileReviews] = useState(reviews);
  const [containerHeight, setContainerHeight] = useState(400);

  const initialProfileCount = 2;
  const visibleProfiles = showAllProfiles
    ? profileReviews
    : profileReviews.slice(0, initialProfileCount);

  const handleShowMore = () => {
    setShowAllProfiles(true);
  };

  const handleCancel = () => {
    setShowAllProfiles(false);
  };

  const handleOpenModal = () => {
    setShowReviewModal(true);
  };

  const handleCloseModal = () => {
    setShowReviewModal(false);
  };

  const handleSubmitReview = data => {
    const newReviews = [...profileReviews, data];
    setProfileReviews(newReviews);
    setShowReviewModal(false);
  };

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight);
    }
  }, [visibleProfiles]);

  return (
    <ReviewFormStyle
      ref={containerRef}
      style={{
        height: containerHeight + "px",
        overflow: "hidden",
        padding: "20px",
        borderRadius: "10px",
        position: "relative", // ReviewFormStyle에 position 속성 추가
      }}
    >
      상품리뷰
      <ReviewForm
        isOpen={showReviewModal}
        onRequestClose={handleCloseModal}
        onSubmit={handleSubmitReview}
      />
      {/* <BtnReivew
        onClick={handleOpenModal}
        style={{ position: "absolute", right: "-40px", top: "30px" }} // 버튼을 오른쪽 상단에 배치
      >
        등록하기
      </BtnReivew> */}
      {visibleProfiles.map((review, index) => (
        <ReviewProfile key={index}>
          <ProfileContainer>
            <ProfileImg>
              <img src={`/pic/${review.userProfPic}`} alt="Profile Image" />
            </ProfileImg>
            <ProfileName>{review.nick}</ProfileName>
          </ProfileContainer>
          <StarRating
            totalStars={5}
            rating={review.rating}
            onRate={review.setRating}
            clickable={true}
          />
          <ReviewText>{review.contents}</ReviewText>
          <ReviewProfileLine />
        </ReviewProfile>
      ))}
      {/* 리뷰가 3개 이상일 때만 보이기 */}
      {profileReviews.length > initialProfileCount && !showAllProfiles && (
        <BtnStyles onClick={handleShowMore}>더 보기</BtnStyles>
      )}
      {showAllProfiles && (
        <BtnStyles onClick={handleCancel} style={{ marginTop: "15px" }}>
          취소
        </BtnStyles>
      )}
    </ReviewFormStyle>
  );
};

export default Profile;
