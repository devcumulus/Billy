// 담당자: 박준서
import React, { useState } from "react";
import Modal from "react-modal";
import StarRating from "./StarRating";
import styled from "@emotion/styled";
import { postReview } from "../../api/details/details_api";

const CancelButton = styled.button`
  width: 200px;
  height: 46px;
  border-radius: 10px;
  border: 1px solid #2c39b5;
  color: #2c39b5;
  margin-top: 20px;
  background-color: #fff;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #2c39b5;
    color: #fff;
  }
`;

const SubmitButton = styled(CancelButton)``;
Modal.setAppElement("#root");

const ReviewForm = ({ isOpen, onRequestClose, ipayment }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRate = async () => {
    if (rating === 0 || review.trim() === "") {
      // 별점과 리뷰가 입력되지 않은 경우, 리뷰 전송을 방지
      return;
    }
    try {
      const userInputData = {
        ipayment,
        contents: review,
        rating,
      };
      await postReview(userInputData); // API 호출
      // 제출 후 입력란 초기화
      setRating(0);
      setReview("");
      // 모달 닫기 요청
      onRequestClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      // 실패 시 처리
    }
  };

  const handleClose = () => {
    // 모달 닫기 요청
    onRequestClose();
    // 입력 초기화
    setRating(0);
    setReview("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ipayment={ipayment}
      contentLabel="Review Form"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 1000, // 배경 어둡게 만들기
        },
        content: {
          width: "65%", // 모달 창 너비를 조정합니다.
          maxWidth: "480px", // 최대 너비를 설정합니다.
          margin: "auto", // 중앙 정렬을 합니다.
          maxHeight: "40%", // 모달 창의 최대 높이를 설정합니다.

          overflowY: "auto", // 내용이 모달 창을 벗어날 경우 스크롤을 추가합니다.
          top: "10%", // 모달이 상단에서 10% 위치에 나타나도록 설정
          backgroundColor: "white", // 모달 내용의 배경을 흰색으로 설정합니다.
          border: "none", // 테두리를 없앱니다.
          borderRadius: "10px", // 테두리를 둥글게 만듭니다.
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 그림자 추가
          position: "fixed",
        },
      }}
    >
      <h2>상품리뷰 작성</h2>
      <form
        onSubmit={e => {
          e.preventDefault(); // 기본 폼 제출 방지
          handleRate();
        }}
      >
        <div
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            marginLeft: "-90px",
          }}
        >
          <StarRating
            totalStars={5}
            rating={rating}
            onRate={setRating}
            isReviewing
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            value={review}
            onChange={event => setReview(event.target.value)}
            placeholder="리뷰를 작성하세요"
            rows={5}
            cols={50}
            style={{
              width: "100%", // Set width to 100%
              maxWidth: "450px", // Set maximum width
              minHeight: "150px",
              maxHeight: "250px",
              overflowY: "auto", // Add overflowY property
              backgroundColor: "#f5f5f5",
              textAlign: "left",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <CancelButton type="button" onClick={handleClose}>
            취소
          </CancelButton>
          <SubmitButton type="submit">완료</SubmitButton>
        </div>
      </form>
    </Modal>
  );
};

export default ReviewForm;
