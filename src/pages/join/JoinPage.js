import React, { useState } from "react";
import Layout from "../../layouts/Layout";
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
  JoinPageStyle,
  SaveBt,
} from "../../styles/join/JoinPageStyle";
import { JoinHeader } from "../../styles/join/JoinFirstPageStyle";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/address/Address";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import JoinPopUp from "../../components/joinpopup/JoinPopUp";

const JoinPage = () => {
  // 이미지 업로드
  const [uploadImgBefore, setUploadImgBefore] = useState(
    `${process.env.PUBLIC_URL}/images/join/join_img.svg`,
  );
  const [fileCount, setFileCount] = useState(0);
  const [uploadImgBeforeFile, setUploadImgBeforeFile] = useState(null);
  const handleChangeFileOne = e => {
    const file = e.target.files[0];
    if (file) {
      // 미리보기
      const tempUrl = URL.createObjectURL(file);
      setUploadImgBefore(tempUrl); // 미리보기 끝
      // FB 파일을 보관
      setUploadImgBeforeFile(file); // 파일 1개 추가 끝
      setFileCount(prev => prev + 1); // 파일 추가 되었어요.
    }
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
  // const [calendarLocation, setCalendarLocation] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectAddress = data => {
    const selectedAddress = data.address;
    // setFormData(prev => ({ ...prev, address })); // 주소를 직접 formData에 설정
    setAddress(selectedAddress);
    setModalOpen(false);
    console.log(address);
  };
  const handleClickButton = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // 양식 검증(yup)
  const [photo, setPhoto] = useState("");
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeNickname = e => {
    setNickname(e.target.value);
  };
  const handleChangeUserId = e => {
    setUserId(e.target.value);
  };
  const handleChangePassword = e => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  };
  const handleChangePhoneNumber = e => {
    setPhoneNumber(e.target.value);
  };
  const handleChangeAddress = e => {
    setAddress(e.target.value);
  };
  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const [catchErr, setCatchErr] = useState(false);
  const handleConfirm = e => {
    e.preventDefault();
    if (uploadImgBeforeFile === null || address === "" || !formState.isValid) {
      setCatchErr(true);
    } else {
      navigate(`/join/3`);
    }
  };

  // const [formData, setFormData] = useState({
  //   photo: "",
  //   nickname: "",
  //   userId: "",
  //   password: "",
  //   confirmPassword: "",
  //   phoneNumber: "",
  //   address: "",
  //   email: "",
  // });
  const phoneRegExp = /^(\d{3})-(\d{4})-(\d{4})$/;
  const validationSchema = yup.object().shape({
    // photo: yup
    //   .string()
    //   .required("사진을 선택해주세요."),
    nickname: yup
      .string()
      .max(15, "15자까지만 입력하세요 ")
      .required("닉네임은 필수 입력 사항입니다."),
    userId: yup
      .string()
      .max(15, "15자까지만 입력하세요 ")
      .required("아이디는 필수 입력 사항입니다."),
    password: yup
      .string()
      .required("비밀번호는 필수 입력 사항입니다.")
      .min(8, "8자 이상 입력하세요.")
      .max(15, "15자까지만 입력하세요 "),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 확인은 필수 입력 사항입니다."),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "전화번호가 올바르지 않습니다.")
      .required("휴대폰 번호는 필수 입력 사항입니다."),
    // address: yup.string().required("주소는 필수 입력 사항입니다."),
    email: yup
      .string()
      .email("이메일 형식이 올바르지 않습니다.")
      .required("이메일은 필수 입력 사항입니다."),
  });

  const { register, handleSubmit, formState } = useForm({
    // defaultValues: initState,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  // 확인 버튼 선택시 실행
  const handleSubmitJoin = data => {
    console.log("최종 데이터 : ", data);
  };

  // 휴대폰 번호 확인 버튼
  const [showModal, setShowModal] = useState(false);
  const phoneNumberConfirm = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  // 취소 & 저장 버튼
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/login`);
  };
  // const handleConfirm = e => {
  //   e.target.form.submit();
  //   // console.log(formData);
  //   // navigate(`/join/3`);
  // };
  const handleNotValid = e => {
    setCatchErr(true);
  };
  // const handleConfirm = () => {
  //   console.log(validationSchema)
  // }

  return (
    <Layout>
      <JoinPageStyle>
        <JoinHeader>
          <p>회원가입</p>
          <img src="/images/join/join_step2.svg" />
        </JoinHeader>
        <JoinBox onSubmit={handleSubmit(handleSubmitJoin)}>
          <JoinElement>
            <JoinElementTxt>
              <p>사진</p>
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInputBox>
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
                  {...register("photo")}
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
              </JoinElementInput>{" "}
              {!fileCount && catchErr ? (
                <InputValid>사진을 선택해주세요.</InputValid>
              ) : (
                ""
              )}
            </JoinElementInputBox>
          </JoinElement>

          <JoinElement>
            <JoinElementTxt>
              <p>닉네임</p>
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInputBox>
              <JoinElementInput width="440px">
                <input
                  type="text"
                  maxLength={15}
                  placeholder="15자 이내"
                  name="nickname"
                  // value={nickname}
                  // onChange={handleChangeNickname}
                  {...register("nickname")}
                />
                <ConfirmBt>중복 확인</ConfirmBt>
              </JoinElementInput>
              {catchErr && formState.errors.nickname && (
                <InputValid>{formState.errors.nickname?.message}</InputValid>
              )}
            </JoinElementInputBox>
          </JoinElement>

          <JoinElement>
            <JoinElementTxt>
              <p>아이디</p>
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInputBox>
              <JoinElementInput width="440px">
                <input
                  type="text"
                  maxLength={15}
                  placeholder="15자 이내"
                  name="userId"
                  // value={userId}
                  // onChange={handleChangeUserId}
                  {...register("userId")}
                />
                <ConfirmBt>중복 확인</ConfirmBt>
              </JoinElementInput>
              <InputValid>{formState.errors.userId?.message}</InputValid>
            </JoinElementInputBox>
          </JoinElement>

          <JoinElement>
            <JoinElementTxt>
              <p>비밀번호</p>
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInputBox>
              <JoinElementInput>
                <input
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                  maxLength={15}
                  placeholder="특수문자 포함 8~15자 이내"
                  name="password"
                  // value={password}
                  // onChange={handleChangePassword}
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
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInputBox>
              <JoinElementInput>
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  minLength={8}
                  maxLength={15}
                  placeholder="비밀번호 확인"
                  name="confirmPassword"
                  // value={confirmPassword}
                  // onChange={handleChangeConfirmPassword}
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
              <InputValid>
                {formState.errors.confirmPassword?.message}
              </InputValid>
            </JoinElementInputBox>
          </JoinElement>

          <JoinElement>
            <JoinElementTxt>
              <p>휴대폰 번호</p>
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInputBox>
              <JoinElementInput width="440px">
                <input
                  type="text"
                  placeholder="예) 010-0000-0000"
                  name="phoneNumber"
                  // value={phoneNumber}
                  // onChange={handleChangePhoneNumber}
                  {...register("phoneNumber")}
                />
                <ConfirmBt onClick={phoneNumberConfirm} type="button">휴대폰 인증</ConfirmBt>
              </JoinElementInput>
              <InputValid>{formState.errors.phoneNumber?.message}</InputValid>
            </JoinElementInputBox>
            {showModal && (
              <>
                {formState.errors.phoneNumber ? (
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
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInputBox>
              <JoinAddressInput>
                {/* <ConfirmBt onClick={handleClickButton}>주소 검색</ConfirmBt> */}
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
                <input placeholder="상세 주소를 입력해주세요." />

                {modalOpen && (
                  <Modal handleClose={handleCloseModal}>
                    <DaumPostcode
                      onComplete={handleSelectAddress}
                      autoClose={false}
                    />
                  </Modal>
                )}
              </JoinAddressInput>
              <InputValid>{formState.errors.address?.message}</InputValid>
            </JoinElementInputBox>
          </JoinElement>

          <JoinElement>
            <JoinElementTxt>
              <p>이메일</p>
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInputBox>
              <JoinElementInput>
                <input
                  type="email"
                  placeholder="예) a123@naver.com"
                  name="email"
                  // value={email}
                  // onChange={handleChangeEmail}
                  {...register("email")}
                />
              </JoinElementInput>
              <InputValid>{formState.errors.email?.message}</InputValid>
            </JoinElementInputBox>
          </JoinElement>
          <BtSection mgtop="90px" mgbtm="0px">
            <CancelBt onClick={handleCancel}>취소</CancelBt>
            {/* <SaveBt onClick={handleConfirm}>저장</SaveBt> */}
            {formState.isValid && fileCount ? (
              <SaveBt onClick={handleConfirm} type="button">
                저장
              </SaveBt>
            ) : (
              <SaveBt onClick={handleNotValid}>취소</SaveBt>
            )}
          </BtSection>
        </JoinBox>
      </JoinPageStyle>
    </Layout>
  );
};
export default JoinPage;