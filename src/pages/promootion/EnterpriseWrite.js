import React, { useEffect, useRef, useState } from "react";
import Layout from "../../layouts/Layout";
import { SideBar } from "../../components/SideBar";
import Mytitle from "../../components/my/Mytitle";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import MyDatePicker from "../prod/MyDatePicker";
import { BtSection, CancelBt, SaveBt } from "../../styles/join/JoinPageStyle";
import { Modal } from "../../components/address/Address";
import DaumPostcode from "react-daum-postcode";
import Calendar from "../../components/details/Calendar";
import { DatePicker } from "antd";
import { CalendarOutlined, ArrowRightOutlined } from "@ant-design/icons";
import koKR from "antd/lib/date-picker/locale/ko_KR";
import {
  AllWidth,
  BtWrap,
  BtnColor,
  BtnColorSub,
  ListDiv,
  PriceDiv,
  ProductImgBt,
  ProductImgMap,
  ProductImgMapBt,
  Resets,
} from "../../styles/prod/productsStyle";
import { failPostDatas, postprod } from "../../api/prod/prod_api";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
// 오늘 날짜 출력
import moment from "moment";

//서버에서 돌려주는 값
const initState = {
  mainPic: "", //메인 사진
  pics: [""], //서브 사진
  dto: {
    title: "", //재목(50자 한정)
    contents: "", // 내용 (1500자 제한)
    addr: "", //주소
    restAddr: "", // 나머지 주소
    price: 0, //가격
    rentalPrice: 0, //임대 가격
    depositPer: 0, //보증금 비율
    buyDate: "2024-01-31", //구매날짜
    rentalStartDate: "2024-01-31", //임대시작
    rentalEndDate: "2024-01-31", // 임대 종료
    icategory: {
      //카테고리숫자
      mainCategory: 0, //메인카테고리
      subCategory: 1, //하위 카테고리
    },
    inventory: 0, // 제고
  },
};

// 초기값
// const initState = {
//   mainPic: "",
//   pics: [],
//   title: "", //재목(50자 한정)
//   contents: "", // 내용 (1500자 제한)
//   // addr: "", //주소
//   // restAddr: "", // 나머지 주소
//   price: "", //가격
//   rentalPrice: "", //임대 가격
//   depositPer: "", //보증금 비율

//   buyDate: "", //구매날짜
//   rentalStartDate: "", //임대시작
//   rentalEndDate: "", // 임대 종료
//   icategory: {
//     //카테고리숫자
//     mainCategory: "1", //메인카테고리
//     subCategory: "1", //하위 카테고리
//   },
//   hashtag: "#",
// };

const btlist = [
  ["스마트워치", "태블릿", "갤럭시", "아이폰"],
  ["노트북", "PC", "마우스", "키보드"],
  ["빔프로젝터", "셋톱박스", "카메라", "캠코더", "DSLR"],
  ["스피커", "이어폰", "헤드폰", "마이크"],
  ["플레이스테이션", "닌텐도", "Wii", "XBOX", "기타"],
];

// 검증 코드 yup
const validationSchema = yup.object({
  title: yup
    .string("내용을 입력하세요.")
    .min(2, "2자 이상 입력하세요")
    .max(50, "50자까지만 입력하세요 ")
    .required("제목은 필수 입력 사항입니다."),
  contents: yup
    .string("내용을 입력하세요.")
    .min(2, "2자 이상 입력하세요")
    .max(1500, "1500자까지만 입력하세요 ")
    .required("내용은 필수 입력 사항입니다."),
  rentalPrice: yup
    .string("내용을 입력하세요.")
    .min(3, "100원 이상 입력하세요")
    // .max(10, "21억까지만 입력하세요 ")
    .required("하루대여 가격은 필수 입력 사항입니다."),
  rentalStartDate: yup
    .string("내용을 입력하세요.")
    .required("거래 시작 날짜는 필수 입력 사항입니다."),
  rentalEndDate: yup
    .string("내용을 입력하세요.")
    .required(" / 거래 종료 날짜는 필수 입력 사항입니다."),
  addr: yup
    .string("내용 입력하세요.")
    .min(2, "주소를 입력하세요")
    .required(" 거래 주소는 필수 입력 사항입니다."),
  restAddr: yup
    .string("나머지 주소를 입력하세요.")
    .max(50, "50자까지만 입력하세요 ")
    .required(" 상세 주소는 필수 입력 사항입니다."),
  mainPic: yup
    .string("제품사진을 선택해주세요.")
    .required("제품사진은 최소 1개이상 필수 입력 사항입니다."),
  hashTags: yup
    .string("내용을 입력하세요.")
    .matches(/#/g, "태그에는 # 기호가 반드시 포함되어야 합니다.")
    .min(2, "2자 이상 입력하세요.")
    .max(50, "50자까지만 입력하세요.")
    .required("제목은 필수 입력 사항입니다."),
});

const Write = () => {
  const inputStyle = {
    width: "200px",
    height: "50px",
    borderRadius: "10px",
    border: "1px solid #2C39B5",
    flexShrink: 0,
  };
  const inputStyleCalendar = {
    width: "480px",
    height: "53.715px",
    borderRadius: "10px",
    border: "1px solid #2C39B5",
    flexShrink: 0,
    marginBottom: "0px",
  };

  const calendarPopupStyle = {
    marginLeft: "-150px",
  };

  const { register, handleSubmit, formState, setValue } = useForm({
    defaultValues: initState,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const [address, setAddress] = useState("");
  const [restAddress, setRestAddress] = useState("");
  const handleChangeAddress = e => {
    setAddress(e.target.value);
  };
  const handleChangeRestAddress = e => {
    setRestAddress(e.target.value);
  };

  const navigate = useNavigate();
  // 이미지 모음
  const [fileCount, setFileCount] = useState(0);
  const [imageBefore, setImageBefore] = useState([]);
  const [uploadImgBeforeFile, setUploadImgBeforeFile] = useState(null);
  // 이미지 선택하라는 아이콘 이미지 나오기
  const [uploadImgBefore, setUploadImgBefore] = useState(
    `${process.env.PUBLIC_URL}/images/join/join_img.svg`,
  );
  const [selectCate, setSelectCate] = useState(0);
  const [changebtn, setChangeBtn] = useState(0);
  const [textareaValue, setTextareaValue] = useState("");
  const [textareaValues, setTextareaValues] = useState("");
  const [btData, setBtData] = useState([]);

  // 카테고리
  const [btListPk, setBtListPk] = useState(btlist);
  // 범위 선정
  const [valueDeoposit, setValueDeposit] = useState(40); //초기값
  // 글자수제한
  const [inputValue, setInputValue] = useState("");

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

  const handleChangeFileOne = e => {
    const file = e.target.files[0];
    // console.log(file);
    if (file && imageBefore.length < 10) {
      // 미리보기
      const tempUrl = URL.createObjectURL(file);
      // console.log(tempUrl);
      setUploadImgBefore(tempUrl);
      // FB 파일을 보관
      setUploadImgBeforeFile(file); // 파일 1개 추가 끝
      setImageBefore(prevImages => [...prevImages, tempUrl]);
      setFileCount(prev => prev + 1); // 파일 추가 되었어요.
    }
  };

  const removeImgList = _index => {
    // console.log(_index);
    // console.log(fileCount);
    if (fileCount === 1) {
      alert("상품 대표 이미지는 최소 1개 이상 등록 하셔야 합니다.");
      return false;
    }

    const arr = imageBefore.filter((item, index) => index !== _index);
    setImageBefore(arr);
    setFileCount(prev => prev - 1); // 파일 제거 되었어요.
    // 가장 마지막 이미지를 미리보기로 설정
    setUploadImgBefore(arr[arr.length - 1]);
  };
  //버튼 감시자
  useEffect(() => {
    // console.log(imageBefore);
    setValue("mainPic", imageBefore[0]);
    setValue("pics", imageBefore);
  }, [imageBefore]);

  //버튼 클릭시 함수 호출
  const handleChangeBtn = item => {
    // console.log(item);
    setValue("icategory.subCategory", item + 1);
    setChangeBtn(item);
  };
  //주메뉴 서브메뉴 연결설정
  const handleButtonClick = num => {
    setValue("icategory.mainCategory", num + 1);
    setValue("icategory.subCategory", 1);
    // 상태 업데이트
    setSelectCate(num);
    // 주메뉴가 눌려지면 항상 서브메뉴들은 초기화 한다.
    setChangeBtn(0);
  };

  const [buyDateNow, setBuyDateNow] = useState(null);
  const handleChangeBuyDate = (date, dateString) => {
    setBuyDateNow(date);
    // date: moment 객체 (선택된 날짜)
    // dateString: 선택된 날짜를 문자열로 표현한 값
    // console.log("Selected Date:", dateString);

    var today = new Date();
    var comparisonDate = new Date(dateString);
    // 오늘 날짜가 comparisonDate 이전인지 확인
    if (today > comparisonDate) {
      setValue("buyDate", dateString);
    } else {
      alert("오늘 이전 날짜를 선택해주세요.");
      setValue("buyDate", "");
      setBuyDateNow(null);
    }
  };

  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const calendarContainerRef = useRef(null);

  const handleDateRangeChange = (dates, dateStrings) => {
    setSelectedDateRange(dates);

    setValue("rentalStartDate", dateStrings[0]);
    setValue("rentalEndDate", dateStrings[1]);
  };
  //카테고리 변화 감시자
  useEffect(() => {
    setBtData(btListPk[selectCate]);
  }, [selectCate]);

  useEffect(() => {
    setValue("buyDate", "");
    setValue("rentalStartDate", "");
    setValue("rentalEndDate", "");
  }, []);
  useEffect(() => {
    setBtData(btListPk[selectCate]);
  }, [selectCate]);

  // 확인 버튼 선택시 실행
  const handleSubmitMy = async data => {
    // console.log(data);
    const formData = new FormData();
    const dto = new Blob(
      [
        JSON.stringify({
          title: data.title, //재목(50자 한정)
          contents: data.contents, // 내용 (1500자 제한)
          addr: address, //주소
          restAddr: restAddress, // 나머지 주소
          price: data.price, //가격
          rentalPrice: data.rentalPrice, //임대 가격
          depositPer: data.depositPer, //보증금 비율
          buyDate: data.buyDate, //구매날짜
          rentalStartDate: data.rentalStartDate, //임대시작
          rentalEndDate: data.rentalEndDate, // 임대 종료
          icategory: {
            //카테고리숫자
            mainCategory: data.icategory.mainCategory, //메인카테고리
            subCategory: data.icategory.subCategory, //하위 카테고리
          },
          inventory: data.inventory,
        }),
      ],
      // JSON 형식으로 설정
      { type: "application/json" },
    );

    formData.append("dto", dto);

    const imagePromises = data.pics.map(async (image, index) => {
      const response = await fetch(image);
      const blob = await response.blob();
      const currentDate = new Date();
      const seconds = Math.floor(currentDate.getTime() / 1000);
      const file = new File([blob], `image${seconds}.jpg`, {
        type: "image/jpeg",
      });
      if (index === 0) {
        formData.append("mainPic", file);
      }
      formData.append("pics", file);
    });
    await Promise.all(imagePromises);
    postprod({ product: formData, successFn, failFn, errorFn });
  };

  const successFn = result => {
    // 성공했을 때 처리
    console.log("success", result);
    navigate("/");
    // navigator(`/details/${result}`);
    // failPostDatas("/");
  };
  const failFn = result => {
    // 실해했을 때 처리 필요
    console.log("failFn", result);
  };
  const errorFn = result => {
    // 오류 발생시 처리 필요
    console.log("errorFn", result);
    // failPostDatas("/");
  };
  const handleReset = () => {
    setValue("depositPer", 50); // hook-form의 전용 함수를 사용하여 depositPer 값을 50으로 설정
    setValueDeposit(50); // state 값을 50으로 설정
  };
  //취소 버튼시 메인으로
  const quest = useNavigate();
  const handleCancel = () => {
    quest(`/`);
  };

  // 해시태그 이용한 인풋 제어
  const [catchErr, setCatchErr] = useState(false);
  const handleNotValid = e => {
    setCatchErr(true);
  };
  // const [hashtagValue, setHashtagValue] = useState(``);
  // const handleInputChange = event => {
  //   const { value } = event.target;
  //   // 특수 문자를 정규 표현식으로 찾아내거나 대체합니다.
  //   const sanitizedValue = value.replace(/[?.;:|*~`!^\-_+<>@$%&"]/g, "");
  //   setHashtagValue(sanitizedValue); // 상태 업데이트 함수명을 바르게 설정해야 합니다.
  // };
  // const initialValue = "#";

  // const handleResets = () => {
  //   setValue("hashtag", `#`); // hook-form의 전용 함수를 사용하여 depositPer 값을 50으로 설정
  //   setValueDeposit(`#`); // state 값을 50으로 설정
  // };
  //현재 날짜 추적 이전 날짜 막는 코드
  const [selectedDateRangeAll, setSelectedDateRangeAll] = useState(null);
  // 오늘 날짜
  const [meselectedDateRange, setMeSelectedDateRange] = useState(null);
  const today = moment();
  // 오늘 이전 날짜를 비활성화하는 함수
  const disabledDate = current => {
    return current && current < moment().startOf("day");
  };

  // 멥을 돌린 아이템
  const initialInputs = [
    { id: 1, value: `` },
    { id: 2, value: `` },
    { id: 3, value: `` },
    { id: 4, value: `` },
  ];
  const [inputs, setInputs] = useState(initialInputs);
  // # 이외에 기호 안들어가게 만든 조건식
  const [inputHash, setInputHash] = useState("");
  const [inputHash1, setInputHash1] = useState("");
  const [inputHash2, setInputHash2] = useState("");
  const [inputHash3, setInputHash3] = useState("");

  const handleInputChange = (id, value) => {
    setInputs(
      inputs.map(input => (input.id === id ? { ...input, value } : input)),
    );
  };

  const handleInputChangeHash = e => {
    const newValue = e.target.value.replace(/[?.;:|*~`!^\-_+<>@$%&"]/g, "");
    setInputHash(newValue);
  };
  const handleInputChangeHash1 = e => {
    const newValue = e.target.value.replace(/[?.;:|*~`!^\-_+<>@$%&"]/g, "");
    setInputHash1(newValue);
  };
  const handleInputChangeHash2 = e => {
    const newValue = e.target.value.replace(/[?.;:|*~`!^\-_+<>@$%&"]/g, "");
    setInputHash2(newValue);
  };
  const handleInputChangeHash3 = e => {
    const newValue = e.target.value.replace(/[?.;:|*~`!^\-_+<>@$%&"]/g, "");
    setInputHash3(newValue);
  };
  // 공백을 제거하는 함수 만들기
  let [str, setStr] = useState("");
  const handleChangeS = e => {
    let newValue = e.target.value.trim(); // 입력 값에서 공백을 제거한 후 새로운 변수에 할당
    setStr(newValue); // state 변수(str) 업데이트
  };

  str = str.trim();
  let arr = str.split(" ");
  let result = arr.join("");
  console.log(result);

  // 이벤트 합치기 왜 아됨 짜증나
  const handleChangeSS = () => {
    handleChangeS();
    handleInputChangeHash3();
  };

  return (
    <Layout>
      <SideBar />
      <AllWidth>
        <div>
          <Mytitle title={"기본 정보"} />
        </div>
        <div>
          <form onSubmit={handleSubmit(handleSubmitMy)}>
            <Resets type="reset" onClick={handleReset}>
              초기화
            </Resets>
            <ListDiv>
              <label htmlFor="img">
                <p>사진</p>
                <p>*</p>
                <span>({imageBefore.length}/10)</span>
              </label>

              <div>
                <div>
                  <ProductImgBt
                    type="button"
                    onClick={() => {
                      document.getElementById("img").click();
                    }}
                  >
                    <img src={uploadImgBefore} alt="" />
                  </ProductImgBt>

                  <div style={{ color: "red" }}>
                    {formState.errors.mainPic?.message}
                  </div>
                </div>
                <input
                  type="file"
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
              </div>
              <ProductImgMap>
                {imageBefore.map((item, index) => (
                  <div key={index} onClick={() => removeImgList(index)}>
                    <img src={item} alt="" />
                  </div>
                ))}
              </ProductImgMap>
            </ListDiv>
            <ListDiv>
              <div>
                <label htmlFor="product">
                  <p>상품명</p> <p>*</p>
                </label>
              </div>
              <div>
                <div>
                  <input
                    type="text"
                    id="product"
                    maxLength={50}
                    placeholder="상품을 입력해주세요"
                    {...register("title")}
                  />
                  <div style={{ color: "red" }}>
                    {formState.errors.title?.message}
                  </div>
                </div>
                <h2>최대 50자입니다.</h2>
              </div>
            </ListDiv>
            <ListDiv>
              <label>
                <p>카테고리</p> <p>*</p>
              </label>
              <div>
                <BtWrap>
                  <ul>
                    <li>
                      <BtnColor
                        type="button"
                        clickbtn={selectCate === 0}
                        onClick={() => {
                          handleButtonClick(0);
                        }}
                      >
                        스마트기기
                      </BtnColor>
                    </li>
                    <li>
                      <BtnColor
                        type="button"
                        clickbtn={selectCate === 1}
                        onClick={() => {
                          handleButtonClick(1);
                        }}
                      >
                        pc/노트북
                      </BtnColor>
                    </li>
                    <li>
                      <BtnColor
                        type="button"
                        clickbtn={selectCate === 2}
                        onClick={() => {
                          handleButtonClick(2);
                        }}
                      >
                        영상카메라
                      </BtnColor>
                    </li>
                    <li>
                      <BtnColor
                        type="button"
                        clickbtn={selectCate === 3}
                        onClick={() => {
                          handleButtonClick(3);
                        }}
                      >
                        음향
                      </BtnColor>
                    </li>
                    <li>
                      <BtnColor
                        type="button"
                        clickbtn={selectCate === 4}
                        onClick={() => {
                          handleButtonClick(4);
                          // handleChangeBtn(4);
                        }}
                      >
                        게임 기기
                      </BtnColor>
                    </li>
                  </ul>
                </BtWrap>
                <BtWrap>
                  <ul>
                    {btData.map((item, index) => (
                      <li key={index}>
                        <BtnColorSub
                          type="button"
                          clickbtn={changebtn === index}
                          onClick={() => {
                            handleChangeBtn(index);
                          }}
                        >
                          {item}
                        </BtnColorSub>
                      </li>
                    ))}
                  </ul>
                </BtWrap>
              </div>
            </ListDiv>

            <ListDiv direction={"column"}>
              <label htmlFor="detail">
                <p>상품내용</p> <p>*</p>
              </label>
              <div>
                <div>
                  <textarea
                    id="detail"
                    maxLength={1500}
                    {...register("contents")}
                    placeholder="구매시기, 브랜드/모델명, 제품의 상태 (사용감,하자 유무) 등을 입력해 주세요."
                  />

                  <div style={{ color: "red" }}>
                    {formState.errors.contents?.message}
                  </div>
                </div>

                <h2>최대 1500자입니다.</h2>
              </div>
            </ListDiv>
            <ListDiv>
              <label>
                <p>해쉬태그</p> <p>*</p>
              </label>
              <PriceDiv>
                <div>
                  <div>
                    {inputs.map(input => (
                      <input
                        key={input.id}
                        type="text"
                        value={input.value}
                        // onFocus={handleInputChangeHash}
                        onChange={e =>
                          handleInputChange(input.id, e.target.value)
                        }
                        placeholder="#태그를작성해주세요"
                      />
                    ))}
                    <input
                      type="text"
                      // value={inputHash}
                      // onChange={handleInputChangeHash}
                      placeholder="#태그를작성해주세요"
                      {...register("hash")}
                    ></input>

                    <input
                      type="text"
                      value={inputHash1}
                      onChange={handleInputChangeHash1}
                      placeholder="#닌테도"
                    ></input>
                    <input
                      type="text"
                      value={inputHash2}
                      onChange={handleInputChangeHash2}
                      placeholder="#이벤트"
                    ></input>
                    <input
                      type="text"
                      // value={inputHash3}
                      // onChange={handleInputChangeHash3}
                      value={str}
                      onChange={e => handleChangeS(e)}
                      placeholder="#전자제품"
                    />
                    <div style={{ color: "red" }}>
                      {formState.errors.hash?.message}
                    </div>
                  </div>
                </div>
              </PriceDiv>
            </ListDiv>
            <ListDiv>
              <label htmlFor="quantity">
                <p>1일대여가격</p> <p>*</p>
              </label>
              <div>
                <div>
                  <input
                    className="showSpinner"
                    type="number"
                    id="quantity"
                    placeholder="숫자만 입력"
                    {...register("inventory")}
                  />
                  <div style={{ color: "red" }}>
                    {formState.errors.inventory?.message}
                  </div>
                </div>
              </div>
            </ListDiv>
            <ListDiv>
              <label htmlFor="dateInput">
                <p>제품 구매일</p> <p>*</p>
              </label>
              <div>
                <div>
                  <DatePicker
                    style={inputStyle}
                    placeholder={["구매일"]}
                    format="YYYY-MM-DD"
                    autoFocus={true}
                    suffixIcon={
                      <CalendarOutlined style={{ color: "#2C39B5" }} />
                    }
                    onChange={handleChangeBuyDate}
                    value={buyDateNow}
                  />

                  <div style={{ color: "red" }}>
                    {formState.errors.buyDate?.message}
                  </div>
                </div>
              </div>
            </ListDiv>
            <ListDiv>
              <label htmlFor="rentalday">
                <p>거래 가능 날짜</p> <p>*</p>
              </label>
              <div>
                <div
                  ref={calendarContainerRef}
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <DatePicker.RangePicker
                    onChange={handleDateRangeChange}
                    onFocus={setSelectedDateRangeAll}
                    value={selectedDateRange}
                    format="YYYY-MM-DD"
                    style={inputStyleCalendar}
                    placeholder={["시작일", "종료일"]}
                    suffixIcon={
                      <CalendarOutlined style={{ color: "#2C39B5" }} />
                    }
                    popupStyle={calendarPopupStyle}
                    getCalendarContainer={() => calendarContainerRef.current}
                    locale={koKR}
                    separator={
                      <span style={{ color: "#2C39B5", marginLeft: "5px" }}>
                        <ArrowRightOutlined style={{ fontSize: "18px" }} />
                      </span>
                    }
                    defaultPickerValue={today} // 시작일을 오늘 날짜로 설정
                    disabledDate={disabledDate} // 오늘 이전 날짜를 비활성화
                  />

                  <div style={{ color: "red" }}>
                    {formState.errors.rentalStartDate?.message}
                    {formState.errors.rentalEndDate?.message}
                  </div>
                </div>
              </div>
            </ListDiv>
            <ListDiv direction={"column"}>
              <label htmlFor="adress">
                <p>거래 주소</p> <p>*</p>
              </label>
              <div>
                <input
                  type="text"
                  // {...register("addr")}
                  value={address}
                  placeholder="주소 검색을 해주세요."
                  onClick={handleClickButton}
                  id="adress"
                  readOnly
                  onChange={handleChangeAddress}
                />

                {catchErr && address === "" && (
                  <div style={{ color: "red" }}>주소를 검색해주세요.</div>
                )}
                {/* <div style={{ color: "red" }}>
                  {formState.errors.addr?.message}
                </div> */}

                <input
                  type="text"
                  value={restAddress}
                  placeholder="상세 주소를 입력해주세요."
                  // {...register("restAddr")}
                  name="restAddress"
                  onChange={handleChangeRestAddress}
                />
                <div style={{ color: "red" }}>
                  {formState.errors.restAddr?.message}
                </div>

                {addrModal && (
                  <Modal handleClose={handleCloseModal}>
                    <DaumPostcode
                      onComplete={handleSelectAddress}
                      autoClose={false}
                    />
                  </Modal>
                )}
              </div>
            </ListDiv>
            <BtSection>
              <CancelBt onClick={handleCancel}>취소</CancelBt>
              {address && restAddress ? (
                <SaveBt type="submit">저장</SaveBt>
              ) : (
                <SaveBt onClick={handleNotValid}>저장</SaveBt>
              )}
            </BtSection>
          </form>
        </div>
      </AllWidth>
    </Layout>
  );
};

export default Write;
