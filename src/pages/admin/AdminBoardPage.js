import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
const SEARCH_OPTIONS = [
  
  "닉네임", "카테고리"];

const SEARCH_OPTIONS_TEXT = [
  "검색어를 입력해주세요",
  "닉네임을 입력해주세요",
  "카테고리를 입력해주세요",
];

const AdminBoardPage = () => {
  const navigate = useNavigate();
  const moveToDetail = (mainCategory, subCategory, iproduct) => {
    navigate(`/details?mc=${mainCategory}&sc=${subCategory}&productId=${iproduct}`)
  }
  // 전체 게시물 데이터
  const [boardAllData, setBoardAllData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedSearchOption, setSelectedSearchOption] = useState(0); // 선택된 검색 옵션 상태
  const [inputValue, setInputValue] = useState(""); // 검색어 상태
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태
  
  const successFn = res => setBoardAllData(res);

  const errorFn = res => alert(`${res.message} \n 에러코드(${res.errorCode})`);

  // 페이지네이션
  const handlePageChange = _tempPage => {
    setPage(_tempPage);
    getAllProducts(
      _tempPage,
      successFn, 
      errorFn, 
      selectedSearchOption, 
      inputValue,
      sortType
      );
  };


  const handleSearchOptionChange = e => setSelectedSearchOption(e.target.value);

  const handleSearchKeywordChange = e => setInputValue(e.target.value);

  const handleSearchSubmit = () => {
    getAllProducts(1, successFn, errorFn, selectedSearchOption, inputValue);
    setSearchKeyword(inputValue);
    setPage(1);
  };
  
  // 게시글 삭제
  const handleClickDelete = async iproduct => {
    const confirmDelete = window.confirm("해당 게시물을 삭제하시겠습니까?");
    if (confirmDelete) {
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
    }
  };

  const [sortType, setSortType] = useState();
  const getSortedData = newSortType => {
    setSortType(newSortType); // 정렬 상태 변경
    getAllProducts(
      1, // 첫 페이지부터 데이터를 가져옴
      successFn,
      errorFn,
      selectedSearchOption,
      inputValue,
      newSortType // 변경된 정렬 상태를 함께 전달
    );
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
            value={inputValue}
            onChange={handleSearchKeywordChange}
            // disabled={selectedSearchOption === 0}
          />
          <button onClick={handleSearchSubmit} type="submit">
            <img src="/images/admin/bt_search.svg" />
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
                  <td>{item.pricePerDay.toLocaleString()}</td>
                  <td>{item.nick}</td>
                  <td>{item.view}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>                  
                  <td>
                    {item.productInquiry}
                    <button 
                    className="move"
                    onClick={() => moveToDetail(item.mainCategory,item.subCategory,item.iproduct)}
                    >이동</button>
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
          style={{paddingTop: "30px"}}
        />
      </div>
    </BoardWrap>
  );
};

export default AdminBoardPage;
