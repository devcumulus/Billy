// 담당자 : 최배근
import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import {
  BtSection,
  CancelBt,
  ConfirmBt,
  ImageInputBt,
  InputValid,
  JoinAddressInput,
  JoinBox,
  JoinElement,
  JoinElementInput,
  JoinElementInputBox,
  JoinElementTxt,
  SaveBt,
} from "../../styles/join/JoinPageStyle";
import { JoinHeader } from "../../styles/join/JoinFirstPageStyle";
import { Modal } from "../../components/address/Address";
import { useSelector } from "react-redux";
import * as yup from "yup";

import { getMyUser, putMyInfo } from "../../api/my/my_api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import JoinPopUp, {
  ModalBackground,
} from "../../components/joinpopup/JoinPopUp";
import { useNavigate } from "react-router-dom";
import { nickOverlapPost } from "../../api/join/join_api";

const MyInfoPage = () => {
  const [data, setData] = useState([]);
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [restAddress, setRestAddress] = useState("");
  const [showCheck, setShowCheck] = useState(false);
  const [phoneNumber, seetPhoneNumber] = useState("");
  const [userDataReady, setUserDataReady] = useState(false);

  const navigate = useNavigate();
  // 유저 iuser 값
  const iuser = useSelector(state => state.loginSlice.iuser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMyUser(iuser);
        setData(result);
        setUploadImgBefore(`/pic/${result.storedPic}`);
        setNickname(result.nick);
        setAddress(result.addr);
        setRestAddress(result.restAddr);
        seetPhoneNumber(result.phone);
        setUserDataReady(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [iuser]);

  // 이미지 업로드
  const [uploadImgBefore, setUploadImgBefore] = useState(
    `${process.env.PUBLIC_URL}/images/join/join_img.svg`,
  );
  const [uploadImgBeforeFile, setUploadImgBeforeFile] = useState(null);
  const handleChangeFileOne = e => {
    const file = e.target.files[0];
    if (file) {
      // 미리보기
      const tempUrl = URL.createObjectURL(file);
      setUploadImgBefore(tempUrl); // 미리보기 끝
      // FB 파일을 보관
      setUploadImgBeforeFile(file); // 파일 1개 추가 끝
    }
  };

  // 중복확인(닉네임)
  const [nickOverlapConfirm, setNickOverlapConfirm] = useState(false);
  const [nickOverlapFail, setNickOverlapFail] = useState(false);
  const [nickConfirmModal, setNickConfirmModal] = useState(false);
  const [nickFailModal, setNickFailModal] = useState(false);

  const NickOverlap = async () => {
    const obj = {
      div: 1,
      uid: "userId123",
      nick: nickname,
    };
    nickOverlapPost(obj, nickPostSuccess, nickPostFail);
  };

  const handleNicknameChange = e => {
    setNickname(e.target.value);
  };

  const handleNickOverlapClick = e => {
    e.preventDefault();
    NickOverlap();
  };

  const closeNickConfirmModal = () => {
    setNickConfirmModal(false);
  };
  const nickPostSuccess = () => {
    setNickOverlapConfirm(true);
    setNickConfirmModal(true);
  };
  const nickPostFail = () => {
    setNickFailModal(true);
  };
  const closeNickFailModal = () => {
    setNickFailModal(false);
  };

  // 비밀번호 보이기/감추기
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };
  const handleTogglePasswordConfirm = () => {
    setShowPasswordConfirm(prev => !prev);
  };

  // 주소 검색 모달창
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectAddress = data => {
    const selectedAddress = data.address;
    setAddress(selectedAddress);
    setModalOpen(false);
  };
  const handleClickButton = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleChangeAddress = e => {
    setAddress(e.target.value);
  };
  const handleChangeRestAddress = e => {
    setRestAddress(e.target.value);
  };
  const handleChangePhoneNumber = e => {
    seetPhoneNumber(e.target.value);
  };

  const [catchErr, setCatchErr] = useState(false);

  const validationSchema = yup.object().shape({
    password: yup.lazy(value =>
      value
        ? yup
            .string()
            .required("비밀번호는 필수 입력 사항입니다.")
            .min(8, "8자 이상 입력하세요.")
            .max(15, "15자까지만 입력하세요 ")
        : yup.string().notRequired(),
    ),
    confirmPassword: yup.lazy(value =>
      value
        ? yup
            .string()
            .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
            .required("비밀번호 확인은 필수 입력 사항입니다.")
        : yup.string().notRequired(),
    ),
  });

  const { register, handleSubmit, formState, watch, reset } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  // 휴대폰 번호 확인 버튼
  const [showModal, setShowModal] = useState(false);
  const phoneNumberConfirm = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const closeCheck = () => {
    setShowCheck(false);
    navigate(`/my?rental`, { state: { selectedItem: "대여중" } });
    sessionStorage.setItem("selectedItem", "대여중");
  };

  useEffect(() => {}, [address]);

  const handleCancel = async () => {
    try {
      const result = await getMyUser(iuser);
      setData(result);
      setUploadImgBefore(`/pic/${result.storedPic}`);
      setNickname(result.nick);
      setAddress(result.addr);
      setRestAddress(result.restAddr);
      seetPhoneNumber(result.phone);
      setUserDataReady(true);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  // 회원 수정  할떄 쓰는 함수
  const handleConfirm = async () => {
    if (!userDataReady) {
      return;
    }

    const formData = new FormData();

    const dto = {
      phone: phoneNumber,
      addr: address,
      restAddr: restAddress,
      email: data.email,
    };
    if (nickname !== data.nick) {
      dto.nick = nickname;
    }
    if (watch("password")) {
      dto.upw = watch("password");
    }

    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" }),
    );

    formData.append("dto", dto);

    if (uploadImgBeforeFile) {
      console.log(uploadImgBeforeFile);
      const response = await fetch(uploadImgBefore);
      const blob = await response.blob();
      const currentDate = new Date();
      const seconds = Math.floor(currentDate.getTime() / 1000);
      const file = new File([blob], `image${seconds}.jpg`, {
        type: "image/jpeg",
      });

      formData.append("pic", file);
    }
    try {
      putMyInfo({ product: formData });
      setShowCheck(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {nickConfirmModal && (
        <>
          <JoinPopUp
            txt="사용 가능한 닉네임입니다."
            onConfirm={closeNickConfirmModal}
          />
          <ModalBackground></ModalBackground>
        </>
      )}
      {nickFailModal && (
        <>
          <JoinPopUp
            txt="이미 존재하는 닉네임입니다."
            onConfirm={closeNickFailModal}
          />
          <ModalBackground></ModalBackground>
        </>
      )}
      <JoinHeader mgtop={"0"} mgbtm={"20px"}>
        <p>회원정보 수정</p>
      </JoinHeader>
      <JoinBox margin={"0 auto 50px"}>
        <JoinElement>
          <JoinElementTxt>
            <p>사진</p>
          </JoinElementTxt>
          <JoinElementInput>
            <label htmlFor="input-file-before">
              <ImageInputBt
                type="button"
                onClick={() => {
                  document.getElementById("input-file-before").click();
                }}
              >
                <img src={uploadImgBefore} alt="" />
              </ImageInputBt>
            </label>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onClick={() => {
                document.getElementById("input-file-before").click();
              }}
              onChange={event => {
                handleChangeFileOne(event, "before");
              }}
              id="input-file-before"
              style={{ display: "none" }}
            />
          </JoinElementInput>
        </JoinElement>

        <JoinElement>
          <JoinElementTxt>
            <p>닉네임</p>
          </JoinElementTxt>
          <JoinElementInput width="440px">
            <input
              type="text"
              placeholder="15자 이내"
              value={nickname}
              onChange={handleNicknameChange}
            />
            <ConfirmBt onClick={handleNickOverlapClick} type="button">
              중복 확인
            </ConfirmBt>
            {catchErr && formState.errors.nickname && (
              <InputValid>{formState.errors.nickname?.message}</InputValid>
            )}
            {catchErr && !nickOverlapConfirm && !formState.errors.nickname && (
              <InputValid>닉네임 중복 확인을 해주세요.</InputValid>
            )}
          </JoinElementInput>
        </JoinElement>

        <JoinElement>
          <JoinElementTxt>
            <p>비밀번호</p>
          </JoinElementTxt>
          <JoinElementInputBox>
            <JoinElementInput>
              <input
                type={showPassword ? "text" : "password"}
                minLength={8}
                maxLength={15}
                placeholder="특수문자 포함 8~15자 이내"
                name="password"
                {...register("password")}
              />
              <button
                type="button"
                style={{
                  background: "transparent",
                  border: `none`,
                  width: `0px`,
                  height: `0px`,
                }}
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <img
                    src="/images/join/eye_open.png"
                    style={{
                      width: `20px`,
                      height: `20px`,
                      border: `none`,
                      transform: "translate(-150%, 40%)",
                    }}
                  />
                ) : (
                  <img
                    src="/images/join/eye_close.png"
                    style={{
                      width: `20px`,
                      height: `20px`,
                      border: `none`,
                      transform: "translate(-150%, 40%)",
                    }}
                  />
                )}
              </button>
            </JoinElementInput>
            <InputValid>{formState.errors.password?.message}</InputValid>
          </JoinElementInputBox>
        </JoinElement>

        <JoinElement>
          <JoinElementTxt>
            <p>비밀번호 확인</p>
          </JoinElementTxt>
          <JoinElementInputBox>
            <JoinElementInput>
              <input
                type={showPasswordConfirm ? "text" : "password"}
                minLength={8}
                maxLength={15}
                placeholder="비밀번호 확인"
                name="confirmPassword"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                style={{
                  background: "transparent",
                  border: `none`,
                  width: `0px`,
                  height: `0px`,
                }}
                onClick={handleTogglePasswordConfirm}
              >
                {showPasswordConfirm ? (
                  <img
                    src="/images/join/eye_open.png"
                    style={{
                      width: `20px`,
                      height: `20px`,
                      border: `none`,
                      transform: "translate(-150%, 40%)",
                    }}
                  />
                ) : (
                  <img
                    src="/images/join/eye_close.png"
                    style={{
                      width: `20px`,
                      height: `20px`,
                      border: `none`,
                      transform: "translate(-150%, 40%)",
                    }}
                  />
                )}
              </button>
            </JoinElementInput>
            <InputValid>{formState.errors.confirmPassword?.message}</InputValid>
          </JoinElementInputBox>
        </JoinElement>

        <JoinElement>
          <JoinElementTxt>
            <p>휴대폰 번호</p>
          </JoinElementTxt>
          <JoinElementInputBox>
            <JoinElementInput width="440px">
              <input
                type="text"
                placeholder="예) 010-0000-0000"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChangePhoneNumber}
              />
              <ConfirmBt onClick={phoneNumberConfirm} type="button">
                휴대폰 인증
              </ConfirmBt>
            </JoinElementInput>
            <InputValid>{formState.errors.phoneNumber?.message}</InputValid>
          </JoinElementInputBox>
          {showModal && (
            <>
              {formState.errors.phoneNumber || phoneNumber === "" ? (
                <JoinPopUp
                  txt="휴대폰 인증에 실패하셨습니다."
                  onConfirm={closeModal}
                />
              ) : (
                <JoinPopUp
                  txt="휴대폰 인증이 완료되었습니다."
                  onConfirm={closeModal}
                />
              )}

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
        </JoinElement>

        <JoinElement>
          <JoinElementTxt>
            <p>주소</p>
          </JoinElementTxt>
          <JoinElementInputBox>
            <JoinAddressInput>
              <input
                type="text"
                value={address}
                placeholder="주소 검색을 해주세요."
                onClick={handleClickButton}
                readOnly
                name="address"
                onChange={handleChangeAddress}
                // {...register("address")}
              />
              <input
                type="text"
                value={restAddress}
                placeholder="상세 주소를 입력해주세요."
                name="restAddress"
                onChange={handleChangeRestAddress}
              />

              {modalOpen && (
                <Modal handleClose={handleCloseModal}>
                  <DaumPostcode
                    onComplete={handleSelectAddress}
                    autoClose={false}
                  />
                </Modal>
              )}
            </JoinAddressInput>
            {catchErr && address === "" && (
              <InputValid>주소를 검색해주세요.</InputValid>
            )}
          </JoinElementInputBox>
        </JoinElement>

        <JoinElement>
          <JoinElementTxt>
            <p>이메일</p>
          </JoinElementTxt>
          <JoinElementInput lineHight={"32px"}>
            <div>{data.email}</div>
          </JoinElementInput>
        </JoinElement>
        <BtSection mgtop={"50px"} mgbtm={"20px"}>
          <CancelBt type="button" onClick={handleCancel}>
            취소
          </CancelBt>
          <SaveBt type="button" onClick={handleSubmit(handleConfirm)}>
            저장
          </SaveBt>
          {showCheck && (
            <>
              <JoinPopUp
                txt="회원정보 수정이 완료되었습니다."
                onConfirm={closeCheck}
              />
              <ModalBackground></ModalBackground>
            </>
          )}
        </BtSection>
      </JoinBox>
    </>
  );
};

export default MyInfoPage;
