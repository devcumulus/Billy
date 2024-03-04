import React, { useState } from "react";
import Layout from "../../layouts/Layout";
import styled from "styled-components";

import Select from "react-select";
import { postReport } from "../../api/report/report_api";
import { useParams } from "react-router-dom";
import {
  PageWrapper,
  BoxWrapper,
  ReportButton,
  ReportTitle,
  ReportTitleSub,
  Notice,
  ReportText,
  ReportUser,
} from "../../styles/chat/ReportStyles";

const reportOptions = [

  {
    label: "분쟁",
    options: [
      { value: "1", label: "거래전 연락없음" },
      { value: "2", label: "거래중 연락없음" },
      { value: "3", label: "거짓 정보" },
      { value: "4", label: "다른 제품" },
      { value: "5", label: "비매너" },
      { value: "6", label: "지각" },
    ],
  },
  {
    label: "사고",
    options: [
      { value: "7", label: "제품 손상" },
      { value: "8", label: "제품 분실" },
    ],
  },

];

const customStyles = {
  control: provided => ({
    ...provided,
    padding: "3px 3px",
    border: "1px solid #e5e5e5",
    borderRadius: "6px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#b2b2b2",
    marginBottom: "30px",
  }),
};

const Report = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [reportContent, setReportContent] = useState("");
  const { productIdentity } = useParams(); // 제품의 PK를 받아옴

  const handleReportSubmit = async () => {
    try {
      if (!selectedOption) {
        alert("신고 사유를 선택해주세요.");
        return;
      }
      if (!reportContent.trim()) {
        alert("신고 내용을 입력해주세요.");
        return;
      }

      const response = await postReport(
        productIdentity, // 제품의 PK를 식별자로 사용
        selectedOption.value,
        reportContent,
      );
      console.log("신고가 접수되었습니다:", response);
      alert("신고가 성공적으로 접수되었습니다.");
    } catch (error) {
      console.error("신고를 접수하는 도중 에러가 발생했습니다:", error);
      alert("신고를 접수하는 도중 에러가 발생했습니다.");
    }
  };

  return (
    <PageWrapper>
      <BoxWrapper>
        <ReportTitle>신고하기</ReportTitle>
        <ReportUser>신고 상태</ReportUser>
        <ReportTitleSub>신고 사유 선택</ReportTitleSub>
        <Select
          options={reportOptions}
          placeholder="신고 사유를 선택해주세요"
          styles={customStyles}
          value={selectedOption}
          onChange={setSelectedOption}
        />
        <ReportTitleSub>신고 내용</ReportTitleSub>
        <ReportText
          placeholder="신고 내용을 입력해주세요"
          value={reportContent}
          onChange={e => setReportContent(e.target.value)}
        />
        <ReportButton onClick={handleReportSubmit}>신고하기</ReportButton>
        <Notice>
          ・ 신고에 필요한 정보 외 개인정보를 포함하지 않도록 주의해주세요.
          <br />
          ・ 산업안전 보건법에 따라 고객응대 근로자 보호조치를 시행하고 있어요.
          욕설 또는 폭언을 하지 말아주세요. <br />・ 접수는 24시간 가능하지만,
          답변은 9시 - 18시 사이에 순차적으로 받을 수 있어요.
        </Notice>
      </BoxWrapper>
    </PageWrapper>
  );
};

export default Report;
