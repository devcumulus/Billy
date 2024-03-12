// 담당자: 사공은진
import styled from "@emotion/styled";
import React, { useState } from "react";
import {
  IdBox,
  LoginBox,
  Logo,
  LogoZone,
} from "../../styles/login/LoginPageStyle";
import { BtSection, CancelBt, SaveBt } from "../../styles/join/JoinPageStyle";
import { verificationPost } from "../../api/join/join_api";
import { idPost, pwPatch } from "../../api/login/login_api";

const PwFindStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  width: 500px;
  height: 540px;
  border-radius: 15px;
  background: #fff;
  padding-top: 20px;
`;

const PwFind = ({ closeModal, setVerificationId, verificationId }) => {
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

  // 아이디
  const [userList, setUserList] = useState({ uid: "", iauth: 0 });

  const loginUserId = () => {
    const obj = {
      id: verificationId,
    };
    idPost(obj, setUserList);
  };

  // 비밀번호 변경
  const [modifyPw, setModifyPw] = useState({ uid: "", upw: "", id: "" });
  const [upw, setUpw] = useState(null);
  const [confirmPw, setConfirmPw] = useState(null);
  const [pwAlert, setPwAlert] = useState(false);

  const handleChangePw = () => {
    if (upw === confirmPw) {
      const obj = {
        uid: userList.uid,
        upw: upw,
        id: verificationId,
      };
      pwPatch(obj);
      closeModal()
    } else {
      setPwAlert(true);
    }
  };
  return (
    <PwFindStyle>
      <LogoZone>
        <Logo src="/images/logo.svg" style={{ marginBottom: "20px" }} />
      </LogoZone>
      <LoginBox height={"340px"} mgbtm={"50px"}>
        {!userList.uid && (
          <>
            {resultOk ? (
              <p style={{ marginTop: "30px" }}>
                휴대전화로 인증요청이 전송되었습니다.
                <br />
                수락 후 확인버튼을 눌러주세요.
              </p>
            ) : (
              <p style={{ marginTop: "30px" }}>
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
            <p style={{ marginTop: "30px" }}>
              본인인증을 완료하였습니다.
              <br />
              새로운 비밀번호를 입력해주세요.
            </p>
            <IdBox value={`아이디: ${userList.uid}`} />
            <IdBox
              type="password"
              placeholder="비밀번호 8~20자 이내"
              value={upw}
              onChange={e => setUpw(e.target.value)}
            />
            <IdBox
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPw}
              onChange={e => setConfirmPw(e.target.value)}
            />
            {pwAlert ? (
              <p style={{ color: "red", marginTop: "0" }}>
                비밀번호가 일치하지 않습니다.
              </p>
            ) : (
              <p></p>
            )}
          </>
        )}

      </LoginBox>
        <BtSection width={"380px"} style={{margin:"auto"}} mgtop={"20px !important"}>
          {resultOk ? (
            <>
              <CancelBt onClick={closeModal}>닫기</CancelBt>
              {userList.uid ? (
                <SaveBt onClick={handleChangePw} style={{ fontSize: "20px" }}>
                  비밀번호 변경
                </SaveBt>
              ) : (
                <SaveBt
                  onClick={() => loginUserId(verificationId)}
                  style={{ fontSize: "20px" }}
                >
                  본인 확인 완료
                </SaveBt>
              )}
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
    </PwFindStyle>
  );
};

export default PwFind;
