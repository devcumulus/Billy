// 담당자: 최배근
import styled from "@emotion/styled";
import React from "react";
import { Common } from "../../styles/CommonStyles";

const MyH1Div = styled.div`
  width: 1260px;
  padding-bottom: 1.7rem;
  border-bottom: 1px solid ${Common.color.primary};
  margin-bottom: 3.3rem;
  h1 {
    font-size: 2.4rem;
    font-weight: 400;
  }
`;

const Mytitle = (props) => {

  return (
    <MyH1Div>
      <h1>{props.title}</h1>
    </MyH1Div>
  );
};

export default Mytitle;
