import React, { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../../api/admin/admin_board_api";
import { BoardWrap, HeaderWrap } from "../../styles/admin/AdminBoardPageStyle";
import { PaginationContent } from "../../styles/admin/AdminReportPageStyle";

const boardData = [
  {
    totalDisputeCount: 0,
    products: [
      {
        iproduct: 114,
        iuser: 1,
        nick: "ㅎㅎㅎㅎㅎ",
        mainCategory: 1,
        subCategory: 2,
        pricePerDay: 2,
        view: 50,
        createdAt: "2024-02-27T10:41:13.518Z",
        status: 0,
      },
    ],
  },
];

const initBoardData = {
  totalDisputeCount: 0,
  products: [
    {
      iproduct: 0,
      iuser: 0,
      nick: "string",
      mainCategory: 2,
      subCategory: 1,
      pricePerDay: 0,
      view: 0,
      createdAt: "2024-02-27T11:23:41.089Z",
      status: 0,
    },
  ],
};

const category = [
  {
    mainCategory: "스마트 기기",
    subCategory: [
      { id: 1, title: "스마트 워치" },
      { id: 2, title: "태블릿" },
      { id: 3, title: "갤럭시" },
      { id: 4, title: "아이폰" },
    ],
  },
  {
    mainCategory: "PC / 노트북",
    subCategory: [
      { id: 1, title: "노트북" },
      { id: 2, title: "PC" },
      { id: 3, title: "마우스" },
      { id: 4, title: "키보드" },
    ],
  },
  {
    mainCategory: "영상 / 카메라",
    subCategory: [
      { id: 1, title: "빔프로젝터" },
      { id: 2, title: "셋톱박스" },
      { id: 3, title: "카메라" },
      { id: 4, title: "캠코더" },
      { id: 5, title: "DSLR" },
    ],
  },
  {
    mainCategory: "음향",
    subCategory: [
      { id: 1, title: "스피커" },
      { id: 2, title: "이어폰" },
      { id: 3, title: "헤드폰" },
      { id: 4, title: "마이크" },
    ],
  },
  {
    mainCategory: "게임 기기",
    subCategory: [
      { id: 1, title: "플레이스테이션" },
      { id: 2, title: "닌텐도" },
      { id: 3, title: "Wii" },
      { id: 4, title: "XBOX" },
      { id: 5, title: "기타" },
    ],
  },
];
const SEARCH_OPTIONS = ["전체", "닉네임", "카테고리"];

const SEARCH_OPTIONS_TEXT = [
  "------------",
  "닉네임을 입력해주세요",
  "카테고리를 입력해주세요",
];

const AdminBoardPage = () => {
  // 전체 게시물 데이터
  const [boardAllData, setBoardAllData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedSearchOption, setSelectedSearchOption] = useState(0); // 선택된 검색 옵션 상태
  const [inputValue, setInputValue] = useState(""); // 검색어 상태
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태
  // const [sortType, setSortType] = useState(0); // 최신순, 조회순 정렬

  // 백엔드에서 제공하는 sort 값을 받아오는 함수
  // const getSort = sortType => {
  //   // 예시로 '조회수 많은순 내림차순'을 반환
  //   if (sortType === 1) return "조회순";
  //   else return "최신순"; // 기본값은 최신순
  // };
  const successFn = res => setBoardAllData(res);

  const errorFn = res => alert(`${res.message} \n 에러코드(${res.errorCode})`);

  const handlePageChange = (value, page, totalPage) => {
    console.log(value);
    if (value === "first") {
      getAllProducts(1, successFn, errorFn);
      setPage(1);
    } else if (value === "prev") {
      if (page !== 1) {
        getAllProducts(page - 1, successFn, errorFn);
        setPage(page - 1);
      }
    } else if (value === "next") {
      if (page !== totalPage) {
        getAllProducts(page + 1, successFn, errorFn);
        setPage(page + 1);
      }
    } else if (value === "last") {
      getAllProducts(totalPage, successFn, errorFn);
      setPage(totalPage);
    } else {
      getAllProducts(value, successFn, errorFn);
      setPage(value);
    }
  };

  const handleSearchOptionChange = e => setSelectedSearchOption(e.target.value);

  const handleSearchKeywordChange = e => setInputValue(e.target.value);

  const handleSearchSubmit = () => {
    getAllProducts(1, successFn, errorFn, selectedSearchOption, inputValue);
    setSearchKeyword(inputValue);
    setPage(1);
  };

  const handleClickDelete = async iproduct => {
    try {
      const reason = 1;
      const res = await deleteProduct(iproduct, reason, errorFn);
      getAllProducts(
        page,
        successFn,
        errorFn,
        selectedSearchOption,
        inputValue,
      );
      setSearchKeyword(inputValue);
    } catch (error) {
      console.log(error);
    }
  };

  const getSortedData = sortType => {
    if (sortType === 0) {
      if (selectedSearchOption != 0 && inputValue) {
        getAllProducts(1, successFn, errorFn, selectedSearchOption, inputValue);
      } else {
        getAllProducts(1, successFn, errorFn);
      }
    } else if (sortType === 1) {
      if (selectedSearchOption != 0 && inputValue) {
        getAllProducts(
          1,
          successFn,
          errorFn,
          selectedSearchOption,
          inputValue,
          sortType,
        );
      } else {
        // getAllProducts(1, successFn, errorFn, sortType);
      }
    }
  };

  useEffect(() => {
    console.log("인풋밸류", inputValue, "서치키워드", searchKeyword);
  }, [inputValue, searchKeyword]);
  useEffect(() => {
    getAllProducts(page, successFn, errorFn);
  }, []);

  return (
    <BoardWrap>
      <HeaderWrap>
        <div className="header-title">
          <div className="title">상품 게시판</div>
          <div className="total">총 {boardAllData.totalDisputeCount}개</div>
        </div>
        <div className="search-wrap">
          <select
            onChange={handleSearchOptionChange}
            value={selectedSearchOption}
          >
            {SEARCH_OPTIONS.map((option, index) => (
              <option key={option} value={index}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder={SEARCH_OPTIONS_TEXT[selectedSearchOption]}
            value={selectedSearchOption === "전체" ? "--" : inputValue}
            onChange={handleSearchKeywordChange}
            disabled={selectedSearchOption === 0}
          />
          <button onClick={handleSearchSubmit} type="submit">
            <img src="/images/admin/search.svg" />
          </button>
        </div>
        <div className="bt-wrap">
          <div>
            <button onClick={() => getSortedData(0)}>최신순</button>
            <img src="/images/admin/line.svg" />
            <button onClick={() => getSortedData(1)}>조회순</button>
          </div>
        </div>
      </HeaderWrap>
      <table style={{ width: "100%" }}>
        <thead
          style={{ height: "50px", background: "#FFE6E6", fontSize: "16px" }}
        >
          <tr>
            <th>상품번호</th>
            <th>카테고리</th>
            <th>대여 가격</th>
            <th>판매자 이름</th>
            <th>조회수</th>
            <th>등록일</th>
            <th>상품 조회</th>
            <th>상품 관리</th>
          </tr>
        </thead>
        {boardAllData &&
          boardAllData.products &&
          boardAllData.products.map((item, index) => (
            <React.Fragment key={index}>
              <tbody
                key={item.id}
                style={{
                  fontSize: "16px",
                  background: index % 2 === 1 ? "#FFF7F7" : "inherit",
                }}
              >
                <tr className="board-data">
                  <td>{item.iproduct}</td>
                  <td>
                    {
                      category[item.mainCategory - 1].subCategory[
                        item.subCategory - 1
                      ].title
                    }
                  </td>
                  <td>{item.pricePerDay}</td>
                  <td>{item.nick}</td>
                  <td>{item.view}</td>
                  <td>{item.createdAt}</td>
                  <td>
                    {item.productInquiry}
                    <button className="move">이동</button>
                  </td>
                  <td>
                    {item.productManage}
                    <button
                      className="delete"
                      onClick={e => {
                        handleClickDelete(item.iproduct);
                      }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              </tbody>
            </React.Fragment>
          ))}
      </table>
      <div>
        <PaginationContent
          current={page}
          onChange={handlePageChange}
          total={boardAllData.totalDisputeCount}
          pageSize={12}
        />
      </div>
    </BoardWrap>
  );
};

export default AdminBoardPage;
