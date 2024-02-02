import React, { useState } from "react";

const Review = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  // 로그인 상태를 확인하는 로직은 여기에 추가할 수 있습니다.

  const handleReviewSubmit = () => {
    if (isLoggedIn) {
      // 후기를 제출하는 로직
    } else {
      // 로그인 페이지로 이동하거나 로그인을 유도하는 메시지를 표시할 수 있습니다.
    }
  };

  return (
    <div>
      <textarea placeholder="후기를 작성하세요"></textarea>
      <button onClick={handleReviewSubmit}>후기 작성</button>
    </div>
  );
};

export default Review;
