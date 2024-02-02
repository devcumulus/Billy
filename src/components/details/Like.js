import React, { useState } from "react";
import { StyledButton } from "../../styles/details/DetailsComponentStyles";

function Like() {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <StyledButton onClick={toggleLike}>
      {liked ? (
        <img src="images/details/like_full.svg" alt="풀 하트" />
      ) : (
        <img src="images/details/like.svg" alt="빈 하트" />
      )}
    </StyledButton>
  );
}

export default Like;
