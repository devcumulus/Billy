// 담당자: 사공은진
import React, { useEffect, useState } from "react";
import { getLike } from "../../api/free/free_api";

function FreeBoardLike({ isLiked, iboard }) {
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
        await getLike(iboard);
        // console.log("Added to favorites");
      } else {
        await getLike(iboard);
        // console.log("Removed from favorites");
      }
    } catch (error) {
      // console.error("Error toggling like:", error);
    }
  };

  return (
    <div onClick={toggleLike}>
      {liked ? (
        <img src="/images/details/like_full.svg" alt="풀 하트" />
      ) : (
        <img src="/images/details/like.svg" alt="빈 하트" />
      )}
    </div>
  );
}

export default FreeBoardLike;
