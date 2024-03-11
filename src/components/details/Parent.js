// 담당자: 박준서
import React, { useState } from "react";
import Modal from "react-modal";
import StarRating from "./StarRating";
import styled from "@emotion/styled";
import ReviewForm from "./ReviewForm"; // ReviewForm 컴포넌트를 import합니다.
import { postReview } from "../../api/details/details_api";

const CancelButton = styled.button`
  // 스타일 코드는 생략
`;

const SubmitButton = styled(CancelButton)``;

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ipayment, setIpayment] = useState(""); // ipayment 값을 상태로 관리합니다.

  const handleReviewSubmit = async (review, rating) => {
    try {
      if (!ipayment) {
        console.error("ipayment 값이 없습니다."); // ipayment 값이 없을 경우 에러 출력
        return;
      }
      await postReview(ipayment, review, rating);
      setIsModalOpen(false); // 모달을 닫습니다.
      // 성공적으로 리뷰를 제출한 후 추가적인 처리를 할 수 있습니다.
    } catch (error) {
      console.error("Error submitting review:", error);
      // 실패 시 처리
    }
  };

  return (
    <>
      {/* 이 곳에서 ReviewForm을 호출하고, ipayment 값을 전달합니다. */}
      <ReviewForm
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ipayment={ipayment}
        onSubmit={handleReviewSubmit} // 리뷰 제출 핸들러를 전달합니다.
      />
      <div>
        {/* ipayment 값을 설정할 수 있는 예시 입력 컴포넌트 */}
        <input
          type="text"
          value={ipayment}
          onChange={e => setIpayment(e.target.value)}
          placeholder="ipayment 값을 입력하세요"
        />
        {/* 리뷰 작성 모달을 열기 위한 버튼 */}
        <button onClick={() => setIsModalOpen(true)}>리뷰 작성</button>
      </div>
    </>
  );
};

export default ParentComponent; // ParentComponent를 내보냅니다.
