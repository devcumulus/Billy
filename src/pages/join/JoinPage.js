// 담당자: 사공은진
import React, { useEffect, useState } from "react";
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
  ShowPasswordBt,
  ShowPasswordImg,
} from "../../styles/join/JoinPageStyle";
import { JoinHeader } from "../../styles/join/JoinFirstPageStyle";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/address/Address";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import JoinPopUp, {
  ModalBackground,
} from "../../components/joinpopup/JoinPopUp";
import {
  idOverlapPost,
  joinPost,
  nickOverlapPost,
  verificationGet,
  verificationPost,
} from "../../api/join/join_api";
import VerificationModal from "../../components/joinpopup/VerificationModal";
import VerificationOk from "../../components/joinpopup/VerificationOk";

const JoinPage = () => {
  // 중복확인(닉네임)
  const [nickOverlapConfirm, setNickOverlapConfirm] = useState(false);
  const [nickConfirmModal, setNickConfirmModal] = useState(false);
  const [nickFailModal, setNickFailModal] = useState(false);
  const [nickNullModal, setNickNullModal] = useState(false);

  const NickOverlap = () => {
    const obj = {
      div: 1,
      uid: "userId123",
      nick: nickname,
    };
    nickOverlapPost(
      obj,
      () => {
        setIsValid(2);
        nickPostSuccess();
      },
      nickPostFail,
    );
  };
  const NickOverlapBt = e => {
    e.preventDefault();
    NickOverlap();
  };
  const nickPostSuccess = () => {
    setNickOverlapConfirm(true);
    setNickConfirmModal(true);
  };
  const closeNickConfirmModal = () => {
    setNickConfirmModal(false);
  };
  const nickPostFail = () => {
    setNickFailModal(true);
  };
  const closeNickFailModal = () => {
    setNickFailModal(false);
  };
  const nickNullBt = () => {
    setNickNullModal(true);
  };
  const closeNickNullBt = () => {
    setNickNullModal(false);
  };

  // 중복확인(아이디)
  const [idOverlapConfirm, setIdOverlapConfirm] = useState(false);
  const [idConfirmModal, setIdConfirmModal] = useState(false);
  const [idFailModal, setIdFailModal] = useState(false);
  const [idNullModal, setIdNullModal] = useState(false);

  const IdOverlap = () => {
    const obj = {
      div: 2,
      uid: userId,
      nick: "nickname",
    };
    idOverlapPost(
      obj,
      () => {
        setIsValid(2);
        idPostSuccess();
      },
      idPostFail,
    );
  };
  const IdOverlapBt = e => {
    e.preventDefault();
    IdOverlap();
  };
  const idPostSuccess = () => {
    setIdOverlapConfirm(true);
    setIdConfirmModal(true);
  };
  const closeIdConfirmModal = () => {
    setIdConfirmModal(false);
  };
  const idPostFail = () => {
    setIdFailModal(true);
  };
  const closeIdFailModal = () => {
    setIdFailModal(false);
  };
  const idNullBt = () => {
    setIdNullModal(true);
  };
  const closeIdNullBt = () => {
    setIdNullModal(false);
  };

  // 이미지 업로드
  const [uploadImg, setUploadImg] = useState(
    `${process.env.PUBLIC_URL}/images/join/join_img.svg`,
  );
  const [uploadImgFile, setUploadImgFile] = useState(null);

  const handleChangeFileOne = e => {
    const file = e.target.files[0];
    if (file) {
      // 미리보기
      const tempUrl = URL.createObjectURL(file);
      setUploadImg(tempUrl); // 미리보기 끝
      // FB 파일을 보관
      setUploadImgFile(file); // 파일 1개 추가 끝
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
  const [addrModal, setAddrModal] = useState(false);

  const handleSelectAddress = data => {
    const selectedAddress = data.address;
    setAddress(selectedAddress);
    setAddrModal(false);
    console.log(address);
  };
  const handleClickButton = () => {
    setAddrModal(true);
  };
  const handleCloseModal = () => {
    setAddrModal(false);
  };

  // 양식 검증(yup)
  const phoneRegExp = /^(\d{3})-(\d{4})-(\d{4})$/;
  const validationSchema = yup.object().shape({
    nickname: yup
      .string()
      .max(20, "20자까지만 입력하세요 ")
      .required("닉네임은 필수 입력 사항입니다."),
    userId: yup
      .string()
      .min(4, "4자 이상 입력하세요.")
      .max(15, "15자까지만 입력하세요 ")
      .required("아이디는 필수 입력 사항입니다."),
    password: yup
      .string()
      .required("비밀번호는 필수 입력 사항입니다.")
      .min(8, "8자 이상 입력하세요.")
      .max(20, "20자까지만 입력하세요 "),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 확인은 필수 입력 사항입니다."),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "전화번호가 올바르지 않습니다.")
      .required("휴대폰 번호는 필수 입력 사항입니다."),
    email: yup
      .string()
      .email("이메일 형식이 올바르지 않습니다.")
      .required("이메일은 필수 입력 사항입니다.")
      .max(30, "30자까지만 입력하세요 "),
  });

  const { register, handleSubmit, formState, watch } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const [photo, setPhoto] = useState("");
  const nickname = watch("nickname");
  const userId = watch("userId");
  const password = watch("password");
  const phoneNumber = watch("phoneNumber");
  const [address, setAddress] = useState("");
  const [restAddress, setRestAddress] = useState("");
  const [isValid, setIsValid] = useState(0);
  const email = watch("email");

  const handleChangeAddress = e => {
    setAddress(e.target.value);
  };
  const handleChangeRestAddress = e => {
    setRestAddress(e.target.value);
  };

  // 본인 인증 버튼
  const [verificationModal, setVerificationModal] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [resultOk, setResultOk] = useState(false);
  const [verifiData, setVerifiData] = useState();
  const [verifiResultModal, setVerifiResultModal] = useState(false);

  const verifiResultonConfirm = () => {
    setVerifiResultModal(true);
  };

  const verifiResultClose = () => {
    setVerifiResultModal(false);
  };

  const verificationConfirm = () => {
    setVerificationModal(true);
  };
  const closeVerificationModal = () => {
    setVerificationModal(false);
  };

  const onVerifiConfirm = async id => {
    try {
      let result;
      result = await verificationGet(id);

      if (result) {
        setVerifiData(result);
        setVerificationModal(false);
        setResultOk(true);
      } else {
        console.log("Result is empty");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 데이터 연동(회원가입)
  const handleSubmitJoin = async () => {
    const formData = new FormData();
    const dto = new Blob(
      [
        JSON.stringify({
          addr: address,
          restAddr: restAddress,
          uid: userId,
          upw: password,
          nick: nickname,
          phone: phoneNumber,
          email: email,
          isValid: isValid,
          iverificationInfo: verificationId,
        }),
      ],
      { type: "application/json" },
    );
    formData.append("dto", dto);

    if (uploadImgFile) {
      console.log(uploadImgFile);
      const response = await fetch(uploadImg);
      const blob = await response.blob();
      const currentDate = new Date();
      const seconds = Math.floor(currentDate.getTime() / 1000);
      const file = new File([blob], `image${seconds}.jpg`, {
        type: "image/jpeg",
      });

      formData.append("pic", file);
    }
    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      joinPost({ obj: formData });
      navigate(`/join/step_3?nick=${nickname}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 취소 & 저장 버튼
  const [catchErr, setCatchErr] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/login`);
  };

  const handleNotValid = e => {
    setCatchErr(true);
  };

  return (
    <Layout>
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
            txt="사용할 수 없는 닉네임입니다."
            onConfirm={closeNickFailModal}
          />
          <ModalBackground></ModalBackground>
        </>
      )}
      {nickNullModal && (
        <>
          <JoinPopUp txt="닉네임을 입력해주세요." onConfirm={closeNickNullBt} />
          <ModalBackground></ModalBackground>
        </>
      )}

      {idConfirmModal && (
        <>
          <JoinPopUp
            txt="사용 가능한 아이디입니다."
            onConfirm={closeIdConfirmModal}
          />
          <ModalBackground></ModalBackground>
        </>
      )}
      {idFailModal && (
        <>
          <JoinPopUp
            txt="사용할 수 없는 아이디입니다."
            onConfirm={closeIdFailModal}
          />
          <ModalBackground></ModalBackground>
        </>
      )}
      {idNullModal && (
        <>
          <JoinPopUp txt="4글자 이상 입력해주세요." onConfirm={closeIdNullBt} />
          <ModalBackground></ModalBackground>
        </>
      )}

      {verificationModal && (
        <>
          <VerificationModal
            closeModal={closeVerificationModal}
            onConfirm={onVerifiConfirm}
            verificationId={verificationId}
            setVerificationId={setVerificationId}
          />
          <ModalBackground></ModalBackground>
        </>
      )}

      {verifiResultModal && (
        <>
          <VerificationOk
            closeModal={verifiResultClose}
            verifiData={verifiData}
          />
          <ModalBackground></ModalBackground>
        </>
      )}

      {addrModal && (
        <Modal handleClose={handleCloseModal}>
          <DaumPostcode onComplete={handleSelectAddress} autoClose={false} />
        </Modal>
      )}

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
                <label htmlFor="img">
                  <ImageInputBt
                    type="button"
                    onClick={() => {
                      document.getElementById("img").click();
                    }}
                  >
                    <img src={uploadImg} alt="" />
                  </ImageInputBt>
                </label>
                <input
                  type="file"
                  {...register("photo")}
                  accept="image/png, image/gif, image/jpeg"
                  onClick={() => {
                    document.getElementById("img").click();
                  }}
                  onChange={event => {
                    handleChangeFileOne(event, "before");
                  }}
                  id="img"
                  style={{ display: "none" }}
                />
              </JoinElementInput>{" "}
              {uploadImgFile === null && catchErr ? (
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
                  maxLength={20}
                  placeholder="20자 이내"
                  name="nickname"
                  {...register("nickname")}
                />
                {!nickname ? (
                  <ConfirmBt onClick={nickNullBt} type="button">
                    중복 확인
                  </ConfirmBt>
                ) : (
                  <ConfirmBt onClick={NickOverlapBt} type="button">
                    중복 확인
                  </ConfirmBt>
                )}
              </JoinElementInput>
              {catchErr && formState.errors.nickname && (
                <InputValid>{formState.errors.nickname?.message}</InputValid>
              )}
              {catchErr &&
                !nickOverlapConfirm &&
                !formState.errors.nickname && (
                  <InputValid>닉네임 중복 확인을 해주세요.</InputValid>
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
                  minLength={4}
                  maxLength={15}
                  placeholder="4~15자 이내"
                  name="userId"
                  {...register("userId")}
                />
                {!userId || userId.length < 4 ? (
                  <ConfirmBt onClick={idNullBt} type="button">
                    중복확인
                  </ConfirmBt>
                ) : (
                  <ConfirmBt onClick={IdOverlapBt} type="button">
                    중복 확인
                  </ConfirmBt>
                )}
              </JoinElementInput>
              <InputValid>{formState.errors.userId?.message}</InputValid>
              {catchErr && !idOverlapConfirm && !formState.errors.userId && (
                <InputValid>아이디 중복 확인을 해주세요.</InputValid>
              )}
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
                  maxLength={20}
                  placeholder="특수문자 포함 8~20자 이내"
                  name="password"
                  {...register("password")}
                />
                <ShowPasswordBt type="button" onClick={handleTogglePassword}>
                  {showPassword ? (
                    <ShowPasswordImg src="/images/join/eye_open.png" />
                  ) : (
                    <ShowPasswordImg src="/images/join/eye_close.png" />
                  )}
                </ShowPasswordBt>
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
                  maxLength={20}
                  placeholder="비밀번호 확인"
                  name="confirmPassword"
                  {...register("confirmPassword")}
                />
                <ShowPasswordBt
                  type="button"
                  onClick={handleTogglePasswordConfirm}
                >
                  {showPasswordConfirm ? (
                    <ShowPasswordImg src="/images/join/eye_open.png" />
                  ) : (
                    <ShowPasswordImg src="/images/join/eye_close.png" />
                  )}
                </ShowPasswordBt>
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
                  {...register("phoneNumber")}
                />
                {resultOk === true ? (
                  <ConfirmBt
                    width={"130px"}
                    type="button"
                    onClick={() => {
                      verifiResultonConfirm();
                    }}
                  >
                    본인 결과 확인
                  </ConfirmBt>
                ) : (
                  <ConfirmBt
                    width={"130px"}
                    type="button"
                    onClick={() => {
                      verificationConfirm();
                    }}
                  >
                    본인 인증 확인
                  </ConfirmBt>
                )}
              </JoinElementInput>
              <InputValid>{formState.errors.phoneNumber?.message}</InputValid>
            </JoinElementInputBox>
          </JoinElement>

          <JoinElement>
            <JoinElementTxt>
              <p>주소</p>
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInputBox>
              <JoinAddressInput>
                <input
                  type="text"
                  value={address}
                  placeholder="주소를 검색해주세요."
                  onClick={handleClickButton}
                  readOnly
                  name="address"
                  onChange={handleChangeAddress}
                />
                {catchErr && address === "" && (
                  <InputValid>주소를 검색해주세요.</InputValid>
                )}
                <input
                  type="text"
                  value={restAddress}
                  placeholder="상세 주소를 입력해주세요."
                  name="restAddress"
                  onChange={handleChangeRestAddress}
                />
                {catchErr && restAddress === "" && (
                  <InputValid>상세 주소를 입력해주세요.</InputValid>
                )}
              </JoinAddressInput>
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
                  maxLength={30}
                  placeholder="예) a123@naver.com"
                  name="email"
                  {...register("email")}
                />
              </JoinElementInput>
              {catchErr && formState.errors.email && (
                <InputValid>{formState.errors.email?.message}</InputValid>
              )}
            </JoinElementInputBox>
          </JoinElement>

          <BtSection mgtop="90px" mgbtm="0px">
            <CancelBt onClick={handleCancel}>취소</CancelBt>
            {formState.isValid &&
            uploadImgFile !== null &&
            address &&
            restAddress &&
            nickOverlapConfirm &&
            idOverlapConfirm ? (
              <SaveBt type="submit">저장</SaveBt>
            ) : (
              <SaveBt onClick={handleNotValid}>저장</SaveBt>
            )}
          </BtSection>
        </JoinBox>
      </JoinPageStyle>
    </Layout>
  );
};
export default JoinPage;
