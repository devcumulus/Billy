import React, { useState } from 'react'
import DaumPostcode from "react-daum-postcode";
import {
  BtSection,
  CancelBt,
  ConfirmBt,
  ImageInputBt,
  JoinAddressInput,
  JoinBox,
  JoinElement,
  JoinElementInput,
  JoinElementTxt,
  SaveBt,
} from "../../styles/join/JoinPageStyle";
import * as yup from "yup";
import { JoinHeader } from "../../styles/join/JoinFirstPageStyle";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import JoinPopUp from '../../components/joinpopup/JoinPopUp';
import { Modal } from '../../components/address/Address';

const MyInfoPage = () => {
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
const [calendarLocation, setCalendarLocation] = useState("");
const [modalOpen, setModalOpen] = useState(false);

const handleSelectAddress = data => {
  const { address } = data;
  // setFormData(prev => ({ ...prev, address })); // 주소를 직접 formData에 설정
  setCalendarLocation(address);
  setModalOpen(false);
};
const handleClickButton = () => {
  setModalOpen(true);
};
const handleCloseModal = () => {
  setModalOpen(false);
};

// 양식 검증(yup)
const [formData, setFormData] = useState({
  photo: "",
  nickname: "",
  userId: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  address: "",
  email: "",
});
const phoneRegExp = /^(\d{3})-(\d{4})-(\d{4})$/;
const validationSchema = yup.object().shape({
  photo: yup.string().required("사진은 필수 입력 사항입니다."),
  nickname: yup
    .string()
    .max(15, "15자까지만 입력하세요 ")
    .required("닉네임은 필수 입력 사항입니다."),
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
  address: yup.string().required("주소는 필수 입력 사항입니다."),
});

const { register, handleSubmit, formState } = useForm({
  defaultValues: formData,
  resolver: yupResolver(validationSchema),
  mode: "onChange",
});
// 확인 버튼 선택시 실행
const handleSubmitJoin = data => {
  console.log(data);
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
};
const handleConfirm = () => {
};

  return (
    <>
        <JoinHeader mgtop={"0"} mgbtm={"0"}>
          <p>회원정보 수정</p>
        </JoinHeader>
        <JoinBox onSubmit={handleSubmit(handleSubmitJoin)}>
          <JoinElement>
            <JoinElementTxt>
              <p>사진</p>
              <span>*</span>
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
            </JoinElementInput>
          </JoinElement>
          <div style={{ color: "red", fontSize: "13px" }}>
            {formState.errors.photo?.message}
          </div>
          <JoinElement>
            <JoinElementTxt>
              <p>닉네임</p>
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInput width="440px">
              <input
                type="text"
                {...register("nickname")}
                placeholder="15자 이내"
              />
              <ConfirmBt>중복 확인</ConfirmBt>
            </JoinElementInput>
          </JoinElement>
          <div style={{ color: "red", fontSize: "13px" }}>
            {formState.errors.nickname?.message}
          </div>
          <JoinElement>
            <JoinElementTxt>
              <p>아이디</p>
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInput>
              <div
                {...register("userId")}
              ></div>
            </JoinElementInput>
          </JoinElement>
          <JoinElement>
            <JoinElementTxt>
              <p>비밀번호</p>
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInput>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="특수문자 포함 8~15자 이내"
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
          </JoinElement>
          <div style={{ color: "red", fontSize: "13px" }}>
            {formState.errors.password?.message}
          </div>
          <JoinElement>
            <JoinElementTxt>
              <p>비밀번호 확인</p>
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInput>
              <input
                type={showPasswordConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="비밀번호 확인"
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
          </JoinElement>
          <div style={{ color: "red", fontSize: "13px" }}>
            {formState.errors.confirmPassword?.message}
          </div>
          <JoinElement>
            <JoinElementTxt>
              <p>휴대폰 번호</p>
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInput width="440px">
              <input
                type="text"
                {...register("phoneNumber")}
                placeholder="예) 010-0000-0000"
              />
              <ConfirmBt onClick={phoneNumberConfirm}>휴대폰 인증</ConfirmBt>
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
            </JoinElementInput>
          </JoinElement>
          <div style={{ color: "red", fontSize: "13px" }}>
            {formState.errors.phoneNumber?.message}
          </div>
          <JoinElement>
            <JoinElementTxt>
              <p>주소</p>
              <span>*</span>
            </JoinElementTxt>
            <JoinAddressInput>
              <ConfirmBt onClick={handleClickButton}>주소 검색</ConfirmBt>
              <input
                type="text"
                {...register("address")}
                value={calendarLocation}
                placeholder="주소 검색을 해주세요."
                // onClick={handleClickButton}
                readOnly
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
          </JoinElement>
          <div style={{ color: "red", fontSize: "13px" }}>
            {formState.errors.address?.message}
          </div>
          <JoinElement>
            <JoinElementTxt>
              <p>이메일</p>
              <span>*</span>
            </JoinElementTxt>
            <JoinElementInput>
              <div
                {...register("email")}
              ></div>
            </JoinElementInput>
          </JoinElement>
        </JoinBox>
        <BtSection>
          <CancelBt onClick={handleCancel}>취소</CancelBt>
          {formState.isValid ? (
            <SaveBt onClick={handleConfirm}>저장</SaveBt>
          ) : (
            <SaveBt>취소</SaveBt>
          )}
        </BtSection>
    </>
  )
}

export default MyInfoPage