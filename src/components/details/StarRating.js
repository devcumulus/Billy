// 담당자: 박준서
import React, { useState } from "react";
import styled from "@emotion/styled";

const StarContainer = styled.div`
  display: inline-block;
  margin-left: 90px;
`;

const StarIcon = styled.span`
  font-size: 20px;
  color: ${({ filled }) => (filled ? "#FFD700" : "#ccc")};
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
`;

const StarRating = ({ totalStars, rating, onRate, isReviewing }) => {
  const [clickedStars, setClickedStars] = useState(rating);

  const handleClick = index => {
    if (isReviewing) {
      setClickedStars(index + 1);
      onRate(index + 1);
    }
  };

  return (
    <StarContainer>
      {[...Array(totalStars)].map((_, index) => (
        <StarIcon
          key={index}
          filled={index < clickedStars}
          clickable={isReviewing}
          onClick={() => handleClick(index)}
        >
          &#9733;
        </StarIcon>
      ))}
    </StarContainer>
  );
};

export default StarRating;
