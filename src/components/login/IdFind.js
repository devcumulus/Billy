import React, { useEffect, useState } from "react";
import { IdBox, LoginBox, Logo } from "../../styles/login/LoginPageStyle";
import { BtSection, CancelBt, SaveBt } from "../../styles/join/JoinPageStyle";
import styled from "@emotion/styled";
import { idPost } from "../../api/login/login_api";

const IdFindStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  width: 500px;
  height: 460px;
  background: #fff;
  padding-top: 20px;
`;

const IdFind = ({ closeModal }) => {
  const [userNum, setUserNum] = useState("");
  const [userList, setUserList] = useState({ uid: "", iauth: 0 });
  // useEffect(() => {
  //   idPost(phone, uid, userList)
  // }, [])

  //  전화번호 필드 바꾸기
  // const handleChange = e => {
  //   setUserNum(e.target.value);
  // };

  const [confirmClick, setConfirmClick] = useState(false);
  const loginUserId = () => {
    setConfirmClick(true);
    const obj = {
      phone: userNum,
    };
    idPost(obj, setUserList);
  };

  return (
    <IdFindStyle>
      <Logo>로고</Logo>
      <LoginBox height={"340px"} mgbtm={"50px"}>
        {!userList.uid && confirmClick ? (
          <p
            style={{
              color: "red",
            }}
          >
            휴대폰 번호가 잘못 입력되었습니다.<br/>
            다시 입력해주세요.
          </p>
        ) : (
          <p>
            아이디를 잊으셨나요? <br />
            휴대폰 번호를 입력해 주세요.
          </p>
        )}

        {!userList.uid && (
          <IdBox
            type="text"
            placeholder="휴대폰 번호 예) 010-0000-0000"
            value={userNum}
            onChange={e => setUserNum(e.target.value)}
          />
        )}
        {userList.uid && <IdBox value={`아이디: ${userList.uid}`} />}

        <BtSection width={"380px"}>
          <CancelBt onClick={closeModal}>닫기</CancelBt>
          <SaveBt onClick={() => loginUserId(userNum)}>확인</SaveBt>
          {/* 사용자 정보 : {userList.iauth} : {userList.uid} */}
          {/* {userNum === userList?.phone && userList?.uid} */}
        </BtSection>
      </LoginBox>
    </IdFindStyle>
  );
};

export default IdFind;
