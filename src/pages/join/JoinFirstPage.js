import React, { useState } from "react";
import Layout from "../../layouts/Layout";
import {
  ConfirmBt,
  JoinAgreement,
  JoinFirstPageStyle,
  JoinHeader,
  JoinMain,
  RadioBox,
} from "../../styles/join/JoinFirstPageStyle";
import { useNavigate } from "react-router-dom";
import JoinPopUp from "../../components/joinpopup/JoinPopUp";

const JoinFirstPage = () => {
  const navigate = useNavigate();

  const [agreementChecked, setAgreementChecked] = useState(false);
  const [personalInfoChecked, setPersonalInfoChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // "확인" 버튼 클릭을 처리하는 함수
  const handlePageSubmit = () => {
    if (agreementChecked && personalInfoChecked) {
      navigate(`/join/2`);
    } else {
      setShowModal(true);
    }
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <JoinFirstPageStyle>
        <JoinHeader>
          <p>회원가입</p>
          <img src="/images/join/join_step1.svg" />
        </JoinHeader>
        <JoinMain>
          <JoinAgreement>
            <h1>대여서비스 이용약관</h1>
            <br />
            <h2>
              제1조 (목적)
              <br />
              본 약관은 [회사/서비스 제공자 명] (이하 &quot;회사&quot;)가
              제공하는 대여서비스(이하 &quot;서비스&quot;)의 이용조건과 운영에
              관한 제반 사항을 규정함을 목적으로 합니다.
              <br />
              <br />
              제2조 (이용 계약의 성립)
              <br />
              1. 서비스를 이용하고자 하는 자(이하 &quot;이용자&quot;)는 본
              약관의 내용에 동의함으로써 이용계약이 성립됩니다.
              <br />
              2. 이용자는 서비스 이용 신청 시 회사가 요청하는 개인정보를
              제공하여야 합니다.
              <br />
              <br />
              제3조 (서비스의 제공 및 변경)
              <br />
              1. 회사는 이용자 간의 물품 대여를 중개하는 플랫폼을 제공합니다.
              <br />
              2. 서비스의 내용, 이용 방법, 이용 시간에 대한 변경 사항은 서비스
              내 공지사항 또는 이메일을 통해 통보됩니다.
              <br />
              <br />
              제4조 (이용자의 의무)
              <br />
              1. 이용자는 본 약관 및 관련 법령 및 회사가 고지하는 사항을
              준수하여야 합니다.
              <br />
              2. 이용자는 대여 서비스 이용 시 사용되는 물품의 상태를 정확히
              확인하고, 대여 기간 및 요금에 대한 사항을 준수해야 합니다.
              <br />
              3. 이용자는 회사의 중개 플랫폼을 통해 얻은 정보를 무단으로 복제,
              변경, 유출하거나 상업적으로 활용할 수 없습니다.
              <br />
              <br />
              제5조 (서비스 수수료 및 결제)
              <br />
              1. 회사는 서비스 이용에 대한 수수료를 부과할 수 있으며, 수수료의
              내용과 결제 방법은 서비스 내 공지사항이나 별도의 안내에서 확인할
              수 있습니다.
              <br />
              <br />
              제6조 (물품 상태 보증 및 보험)
              <br />
              1. 물품의 대여는 이용자 간의 직거래로 이루어지므로, 물품의 상태와
              관련된 책임은 해당 이용자에게 있습니다.
              <br />
              2. 이용자는 물품을 대여함에 있어 보험 가입 여부를 신중하게
              결정하여야 합니다.
            </h2>
          </JoinAgreement>
          <RadioBox name="agreement">
            <input
              type="radio"
              id="agreement-agree"
              name="agreement-radio"
              onChange={() => setAgreementChecked(true)}
            />
            <label htmlFor="agreement-agree">동의함</label>
            <input
              type="radio"
              id="agreement-disagree"
              name="agreement-radio"
              onChange={() => setAgreementChecked(false)}
            />
            <label htmlFor="agreement-disagree">동의안함</label>
          </RadioBox>
          <JoinAgreement>
            <h1>개인정보처리방침</h1>
            <br />
            <h2>
              본 개인정보처리방침은 [회사/서비스 제공자 명] (이하
              &quot;회사&quot;)이 제공하는 서비스와 관련하여 이용자의 개인정보를
              어떻게 수집, 이용, 보호하는지에 대한 정보를 제공합니다. 회사는 이
              개인정보처리방침을 개정할 수 있으며, 변경사항은 서비스 내에
              공지하거나 이메일을 통해 통보할 수 있습니다.
              <br />
              <br />
              1. 수집하는 개인정보 항목
              <br />
              회사는 서비스 제공 및 이용과정에서 다음과 같은 개인정보를 수집할
              수 있습니다.
              <br />
              - 필수정보: 이용자의 식별정보(이름, 연락처, 이메일 등)
              <br />
              - 선택정보: 서비스 이용과정에서 생성되는 추가정보
              <br />
              <br />
              2. 개인정보 수집 목적
              <br />
              회사는 다음과 같은 목적으로 개인정보를 수집 및 이용합니다.
              <br />
              - 서비스 제공 및 계약 이행
              <br />
              - 이용자 식별 및 본인 확인
              <br />
              - 서비스의 원활한 운영과 개선
              <br />
              - 고객 상담 및 불만처리
              <br />
              - 마케팅 및 광고 활용
              <br />
              <br />
              3. 개인정보의 보유 및 이용기간
              <br />
              회사는 이용자의 개인정보를 서비스 제공 기간 동안에 한하여
              보유하며, 법령에 따라 보존할 필요가 있는 경우에는 관련 법령에서
              정한 기간 동안 보존합니다.
              <br />
              <br />
              4. 개인정보의 제3자 제공
              <br />
              회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
              다만, 아래의 경우에는 예외로 합니다.
              <br />- 이용자 동의가 있는 경우
            </h2>
          </JoinAgreement>
          <RadioBox name="personalInfo">
            <input
              type="radio"
              id="personalInfo-agree"
              name="personalInfo-radio"
              onChange={() => setPersonalInfoChecked(true)}
            />
            <label htmlFor="personalInfo-agree">동의함</label>
            <input
              type="radio"
              id="personalInfo-disagree"
              name="personalInfo-radio"
              onChange={() => setPersonalInfoChecked(false)}
            />
            <label htmlFor="personalInfo-disagree">동의안함</label>
          </RadioBox>
        </JoinMain>
        <ConfirmBt onClick={handlePageSubmit}>확인</ConfirmBt>
        {showModal && (
          <>
            <JoinPopUp txt="약관에 동의해주세요." onConfirm={closeModal} />
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
              }}
            ></div>
          </>
        )}
      </JoinFirstPageStyle>
    </Layout>
  );
};

export default JoinFirstPage;
