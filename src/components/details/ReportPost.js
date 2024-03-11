// 담당자: 박준서
import React from "react";
import {
  ReportBox,
  ReportText,
  ReportTitle,
} from "../../styles/details/DetailsComponentStyles";
const ReportPost = () => {
  return (
    <ReportBox>
      <ReportTitle>신고 하기</ReportTitle>

      <ReportText>광고성 게시물 같아요.</ReportText>
      <ReportText>허위 매물 같아요.</ReportText>
      <ReportText>상품 정보가 정확하지 않아요.</ReportText>
      <ReportText>기타</ReportText>
    </ReportBox>
  );
};

export default ReportPost;
