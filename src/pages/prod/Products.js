import React, { useEffect, useState } from "react";

import Layout from "../../layouts/Layout";
import {
  Amounts,
  BtWrap,
  BtnColor,
  BtnColorSub,
  Detail,
  Goods,
  GoodsWrap,
  ListSrc,
  PictureS,
  Possession,
  Price,
  ProductS,
  Rla,
  TransactionS,
} from "../../styles/productsStyle";
import RadioButton from "./RadiButton";
import { DatePicker, Space } from "antd";
import ImageUpload from "./ImageUpload";
import { BtSection, CancelBt, SaveBt } from "../../styles/join/JoinPageStyle";
import { useNavigate } from "react-router";
import MyDatePicker from "./MyDatePicker";
import { useForm } from "react-hook-form";
import FormComponent from "./FormComponent";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// 엑시오스 기본데이터
const initSample = {
  mainPic: "",
  pics: [""],
  dto: {
    title: "",
    contents: "",
    addr: "",
    restAddr: "",
    price: 0,
    rentalPrice: 0,
    depositPer: 0,
    buyDate: "2024-01-26",
    rentalStartDate: "2024-01-26",
    rentalEndDate: "2024-01-26",
    icategory: 1,
    inventory: 1,
  },
};
// 엽 초기값
const BasicSetting = {
  mainPic: "사진",
  title: "상품명",
  icategory: "카테고리숫자",
  contents: "상품내용",
  buyDate: "구매날짜",
};

const initState = [
  ["스마트워치", "태블릿", "갤럭시", "아이폰"],
  ["노트북", "PC", "마우스", "키보드"],
  ["빔프로젝터", "셋톱박스", "카메라", "캠코더", "DSLR"],
  ["스피커", "이어폰", "헤드폰", "마이크"],
  ["플레이스테이션", "닌텐도", "Wii", "XBOX", "기타"],
];
const Products = () => {
  //리스트 아이탬 state
  const [listItems, setListItems] = useState(initState);
  const [selectCate, setSelectCate] = useState(0);
  const [goods, setGoods] = useState([]);
  const [changebtn, setChangeBtn] = useState([0, 1, 2, 3, 4]);

  const [startDate, setStartDate] = useState(new Date());
  //이미지 파일이 담을 state
  const [image, setImage] = useState(null);

  useEffect(() => {
    // console.log(1);
    // goods 라는 배열에 내용을 넣는다.
    // goods 배열은 초기 데이터(listIems) 배열에서 [인덱스] 를 활용해서
    // 업데이트 했다.
    // selectCate 의 값이 바뀌면 goods 업데이트 됩니다.
    setGoods(listItems[selectCate]);
  }, [selectCate]);

  //버튼 클릭시 함수 호출
  const handleButtonClick = num => {
    // 상태 업데이트
    setSelectCate(num);
    // 주메뉴가 눌려지면 항상 서브메뉴들은 초기화 한다.
    setChangeBtn(null);
  };

  const handleChangeBtn = item => {
    setChangeBtn(item);
  };
  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioChange = event => {
    setSelectedValue(event.target.value);
  };

  const radioData = [
    { id: 1, name: "group1", value: "50%" },
    { id: 2, name: "group1", value: "60%" },
    { id: 3, name: "group1", value: "70%" },
    { id: 4, name: "group1", value: "80%" },
    { id: 4, name: "group1", value: "90%" },
    { id: 4, name: "group1", value: "100%" },
  ];
  const [uploadImgUrl, setUploadImgUrl] = useState("");

  const onchangeImageUpload = e => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
  };
  // 저장 취소
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(`interest`);
  };
  const handleConfirm = () => {
    navigate(`/my`);
  };
  const [selectedDate, setSelectedDate] = useState(null);

  console.log("리랜더링");

  // yup 검증 코드 수정요망
  const validationSchema = yup.object({
    title: yup
      .string("상품명을 입역해주세요.")
      .required("상품명은 필수입니다."),
    contents: yup
      .string("내용을 입력하세요.")
      .min(5, "5자 이상 입력하세요.")
      .max(6, "6자까지만 입력하세요 "),
    dateInput: yup
      .string("날짜를 입력하세요.")
      .required("상품등록날은 필수입니다.")
      .email("이메일 형식에 맞지 않습니다"),
    usermemo: yup.string("내용을 입력하세요.").required("메모 필수입니다."),
  });

  // 1. useForm 을 활용
  // register 는 폼의 name 값 셋팅 및 읽기기능
  // handleSubmit 은 폼의 상태 변화 및 완료시 실행이 됩니다.
  const { register, handleSubmit, formState } = useForm({
    defaultValues: BasicSetting,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  // 확인 버튼 선택시 실행
  const handleSubmitMy = data => {
    console.log(data);
  };

  return (
    <Layout>
      <GoodsWrap>
        <Goods>
          <p>기본정보</p>
        </Goods>
        <div>
          <form onSubmit={handleSubmit(handleSubmitMy)}>
            <PictureS>
              <label htmlFor="pictures">
                <p className="pic">사진</p> <p>*</p>
              </label>
              <input type="file" name="picture" id="pictures" />
              <ImageUpload />
            </PictureS>

            <ProductS>
              <ladel htmlFor="product" className="ladelprt">
                <p className="prd">상품명</p> <p>*</p>
              </ladel>
              <input
                type="text"
                id="product"
                placeholder="상품을 입력해주세요"
                {...register("title")}
              />
            </ProductS>

            <ListSrc>
              <ladel className="ladelct">
                <p className="ct">카테고리</p> <p>*</p>
              </ladel>

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
                        // handleChangeBtn(2);
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
                        // handleChangeBtn(3);
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
                  {goods.map((item, index) => (
                    <li key={index}>
                      <BtnColorSub
                        type="button"
                        clickbtn={changebtn === item}
                        onClick={() => {
                          handleChangeBtn(item);
                        }}
                      >
                        {item}
                      </BtnColorSub>
                    </li>
                  ))}
                </ul>
              </BtWrap>
            </ListSrc>

            <Price>
              <label htmlFor="price" className="LadelPre">
                <p className="pre">대여가격</p>
                <p>*</p>
              </label>
              <input
                type="number"
                placeholder="₩ 대여 가격"
                name="price"
                id="price"
              ></input>
            </Price>

            <Detail>
              <label htmlFor="detail" className="LadelDta">
                <p className="dta">상품내용</p> <p>*</p>
              </label>
              <textarea
                name="detail"
                id="detail"
                placeholder="구매시기,브랜드/모델명,제품의 상태(사용감,하자유무를)등 입력 해주세요"
              ></textarea>
            </Detail>

            <Amounts>
              <div className="surround">
                <ladel htmlFor="amounts" className="Ladelamu">
                  <p className="amu">보증금</p> <p className="pt">*</p>
                </ladel>
                {/* 라디오 버튼은 여러개 중에 오로지 1개만 선택이 가능 함. 같은지 다른지 파악하는 것은 name 속성의 단어가 같은지를 비교 */}
                {/* <input
                  type="text"
                  name="amounts"
                  id="amounts"
                  placeholder="금액을 입력해주세요"
                  className="dd"
                ></input>
              </div>
              <div className="smallmap">
                {radioData.map(radio => (
                  <RadioButton
                    key={radio.id}
                    name={radio.name}
                    value={radio.value}
                    checked={selectedValue === radio.value}
                    onChange={handleRadioChange}
                    className="small"
                  />
                ))}
                <p className="guarantee"> 보증금 : {selectedValue}</p> */}
                <div className="one" style={{ display: "flex" }}>
                  <div>
                    <div style={{ display: "flex" }}>
                      <input type="number" />
                      <p className="ones">원</p>
                    </div>
                    <p className="deposit">제품의 가격을 입력해주세요</p>
                  </div>

                  <div>
                    <div style={{ display: "flex" }}>
                      <input type="number" />
                      <p className="ones">%</p>
                    </div>
                    <p className="deposit">50 ~ 10% 보증금</p>
                  </div>
                  <div>
                    <div style={{ display: "flex" }}>
                      <input type="number" />
                      <p className="ones">원</p>
                    </div>

                    <p className="deposit">1일 대여가격</p>
                  </div>
                </div>
              </div>
            </Amounts>

            <Possession>
              <div className="possession">
                <ladel htmlFor="possessionS" className="Ladlpossession">
                  <p className="quantity">소유 수량</p>
                  <p className="star">*</p>
                </ladel>
              </div>
              <input
                type="number"
                className="psion"
                placeholder="제품소유 수량을 입력해주세요"
              />
            </Possession>

            <Rla>
              <ladel htmlFor="oldmail" className="LadelRa">
                <p className="black">제품구매일</p> <p>*</p>
              </ladel>

              <MyDatePicker />
            </Rla>

            <TransactionS>
              <ladel htmlFor="transaction" className="Ladeltst">
                <p className="tst">거래가능주소</p> <p>*</p>
              </ladel>
              <input type="button" value="우편 검색" id="btn" />
              <input
                type="text"
                name="transaction"
                id="readOnlyInput"
                readOnly
                value="우편주소를 검색해주세요"
              />
            </TransactionS>
            <div>
              <div>
                <ladel htmlFor="transaction" className="Ladeltst">
                  <p className="tst">대여 기한 성정</p> <p>*</p>
                </ladel>
                {/* 준서형 달력 떙겨오기 */}
              </div>
            </div>
            <BtSection>
              <CancelBt type="button" onClick={handleCancel}>
                취소
              </CancelBt>
              <SaveBt type="button" onClick={handleConfirm}>
                저장
              </SaveBt>
            </BtSection>

            {/* 확인 버튼 */}
            <div>
              모든 검증을 통과했는지 파악 : {formState.isValid ? "OK" : "NO"}
            </div>

            <FormComponent />
          </form>
        </div>
      </GoodsWrap>
    </Layout>
  );
};

export default Products;
