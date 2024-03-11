// 담당자: 박준서
import React, { useEffect, useState } from "react";
import { StyledButton } from "../../styles/details/DetailsComponentStyles";
import { getFav } from "../../api/details/details_api";

function Like({ isLiked, productId }) {
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const toggleLike = async e => {
    try {
      // 상태 업데이트를 이전 값에 의존하지 않도록 함수형 업데이트를 사용합니다.
      e.stopPropagation();
      setLiked(prevLiked => !prevLiked);

      // 찜 상태에 따라 API를 호출하여 찜 기능을 처리합니다.
      if (!liked) {
        await getFav(productId);
        // console.log("Added to favorites");
      } else {
        await getFav(productId);
        // console.log("Removed from favorites");
      }
    } catch (error) {
      // console.error("Error toggling like:", error);
    }
  };

  return (
    <StyledButton onClick={toggleLike}>
      {liked ? (
        <img src="/images/details/like_full.svg" alt="풀 하트" />
      ) : (
        <img src="/images/details/like.svg" alt="빈 하트" />
      )}
    </StyledButton>
  );
}

export default Like;
