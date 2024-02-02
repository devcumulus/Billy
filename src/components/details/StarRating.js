import React from "react";
import styled from "@emotion/styled";

const StarContainer = styled.div`
  display: inline-block;
  margin-left: 90px;
`;

const StarIcon = styled.span`
  font-size: 20px;
  color: ${({ filled }) => (filled ? "#FFD700" : "#ccc")};
`;

const StarRating = ({ totalStars, rating }) => {
  return (
    <StarContainer>
      {[...Array(totalStars)].map((_, index) => (
        <StarIcon key={index} filled={index < rating}>
          &#9733;
        </StarIcon>
      ))}
    </StarContainer>
  );
};

export default StarRating;
