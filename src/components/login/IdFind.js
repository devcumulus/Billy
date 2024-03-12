// 담당자: 사공은진
import React, { useEffect, useState } from "react";
import {
  IdBox,
  LoginBox,
  Logo,
  LogoZone,
} from "../../styles/login/LoginPageStyle";
import { BtSection, CancelBt, SaveBt } from "../../styles/join/JoinPageStyle";
import styled from "@emotion/styled";
import { idPost } from "../../api/login/login_api";
import { verificationPost } from "../../api/join/join_api";

const IdFindStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  width: 500px;
  /* height: 460px; */
  border-radius: 15px;
  background: #fff;
  padding-top: 20px;
`;

const IdFind = ({
  closeModal,
  setVerificationId,
  verificationId,
}) => {
  const [resultOk, setResultOk] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    userPhone: "",
    userBirthday: "",
  });

  const handleChange = (fieldName, value) => {
    let sanitizedValue;

    if (fieldName === "userPhone" || fieldName === "userBirthday") {
      const numRegex = /^[0-9]*$/;
      if (!numRegex.test(value)) {
        return;
      }
      sanitizedValue = value;
    } else {
      const regex = /^[가-힣]*[ㄱ-ㅎㅏ-ㅣ]*$/;
      if (!regex.test(value)) {
        return;
      }
      sanitizedValue = value;
    }

    setUserData(prevState => ({
      ...prevState,
      [fieldName]: sanitizedValue,
    }));
  };

  // 본인 인증
  const handleVerifiConfirm = async userData => {
    if (!userData.userName || !userData.userPhone || !userData.userBirthday) {
      return;
    }
    try {
      let result;
      result = await verificationPost(userData);
      setVerificationId(result.id);
      setResultOk(true);
    } catch (error) {
      console.log(error);
      // 에러 발생 시 본인 확인 완료 문구 표시
      setResultOk(true);
    }
  };

  // 아이디 찾기 결과
  const [userList, setUserList] = useState({ uid: "", iauth: 0 });

  const loginUserId = () => {
    const obj = {
      id: verificationId,
    };
    idPost(obj, setUserList);
  };

  return (
    <IdFindStyle style={userList.uid? {height:"460px"}:{height:"540px"}}>
      <LogoZone>
        <Logo src="/images/logo.svg" style={{ marginBottom: "20px" }} />
      </LogoZone>
      <LoginBox height={"340px"} mgbtm={"50px"}>
        {!userList.uid && (
          <>
            {resultOk ? (
              <p style={{marginTop:"40px"}}>
                휴대전화로 인증요청이 전송되었습니다.
                <br />
                수락 후 확인버튼을 눌러주세요.
              </p>
            ) : (
              <p style={{marginTop:"40px"}}>
                본인인증을 위해 <br />
                정보 입력을 해주세요.
              </p>
            )}

            <IdBox
              type="text"
              placeholder="이름 예) 홍길동"
              value={userData.userName}
              onChange={e => handleChange("userName", e.target.value)}
            />
            <IdBox
              type="text"
              placeholder="휴대폰 번호 예) 01000000000"
              value={userData.userPhone}
              onChange={e => handleChange("userPhone", e.target.value)}
            />
            <IdBox
              type="number"
              placeholder="생일 예) 20240301"
              value={userData.userBirthday}
              onChange={e => handleChange("userBirthday", e.target.value)}
            />
          </>
        )}
        {userList.uid && (
          <>
            <p>본인인증을 완료하였습니다.</p>
            <IdBox value={`아이디: ${userList.uid}`} />
          </>
        )}

        <BtSection width={"380px"}>
          {resultOk ? (
            <>
              <CancelBt onClick={closeModal}>닫기</CancelBt>
              <SaveBt onClick={() => loginUserId(verificationId)} style={{fontSize:"20px"}}>
                본인 확인 완료
              </SaveBt>
            </>
          ) : (
            <>
              <CancelBt onClick={closeModal}>닫기</CancelBt>
              <SaveBt onClick={() => handleVerifiConfirm(userData)}>
                확인
              </SaveBt>
            </>
          )}

        </BtSection>
      </LoginBox>
    </IdFindStyle>
  );
};

export default IdFind;
