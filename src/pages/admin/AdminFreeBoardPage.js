import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BoardWrap, HeaderWrap } from '../../styles/admin/AdminBoardPageStyle'
import Pagination from '../../components/Pagination'
import { deleteFreeBoard, getFreeBoard } from '../../api/admin/admin_board_api'
import { PaginationContent } from '../../styles/admin/AdminReportPageStyle'

const boardData = {
  "totalBoardCount": 11,
  "boards": [
    {
      "iboard": 32,
      "nick": "hehe",
      "view": 20,
      "createdAt": "2024-02-28T11:00:46.575Z"
    }
  ]
}

const initFreeBoardData = {
  "totalBoardCount": 11,
  "boards": [
    {
      "iboard": 32,
      "nick": "hehe",
      "view": 20,
      "createdAt": "2024-02-28T11:00:46.575Z"
    }
  ]
}
const SEARCH_OPTIONS = ["전체", "닉네임", "제목"];

const SEARCH_OPTIONS_TEXT = [
  "검색어를 입력해주세요",
  "닉네임을 입력해주세요",
  "제목을 입력해주세요",
];


const AdminFreeBoardPage = () => {
  // 게시물 이동
  const navigate = useNavigate();
  const moveToDetail = iboard => {
    navigate(`/free/details?iboard=${iboard}`);
  };
  // 전체 자유게시판 데이터
  const [freeBoardAllData, setFreeBoardAllData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedSearchOption, setSelectedSearchOption] = useState(0); // 선택된 검색 옵션 상태
  const [inputValue, setInputValue] = useState(""); // 검색어 상태
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태

  const successFn = res => {
    setFreeBoardAllData(res);
    console.log("성공했을때", res);
  };
  const errorFn = res => {
    console.log("실패", res);
    alert(`${res.message} \n 에러코드(${res.errorCode})`);
  };

// 페이지네이션
const handlePageChange = _tempPage => {
  setPage(_tempPage);
  getFreeBoard(
    _tempPage,
    successFn, 
    errorFn, 
    selectedSearchOption, 
    inputValue,
    sortType
    );
};
  
  const handleSearchOptionChange = e => {
  const selectedOption = e.target.value;
  setSelectedSearchOption(selectedOption);
  if (selectedOption === "전체") {
    // 전체 옵션이 선택된 경우에는 모든 데이터를 요청합니다.
    getFreeBoard(1, successFn, errorFn);
    setSearchKeyword("");
    setInputValue("");
  }
}

  const handleSearchKeywordChange = e => setInputValue(e.target.value);

  const handleSearchSubmit = () => {
    getFreeBoard(1, successFn, errorFn, selectedSearchOption, inputValue);
    setSearchKeyword(inputValue);
    setPage(1);
  };
 
  
  // 게시글 삭제
  const handleClickDelete = async iboard => {
    const confirmDelete = window.confirm("해당 게시물을 삭제하시겠습니까?");
    if (confirmDelete) {
    try {
      const reason = 1;
      const res = await deleteFreeBoard(iboard, reason, errorFn);
      getFreeBoard(
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
    getFreeBoard(
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
    getFreeBoard(page, successFn, errorFn);
  }, []);
  

  return (
    <BoardWrap>
        <HeaderWrap>
            <div className='header-title'>
                <div className='title'>자유 게시판</div>
                <div className='total'>총 {freeBoardAllData.totalBoardCount}개</div>
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
      <table style={{ width: "100%"}}>
      <thead
            style={{height: "50px", background: "#FFE6E6", fontSize: "16px" }}
          >
            <tr>
              <th>게시글 번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>조회수</th>
              <th>등록일</th>
              <th>게시글 조회</th>
              <th>게시글 관리</th>
            </tr>
          </thead>
          {freeBoardAllData && 
            freeBoardAllData.boards && 
            freeBoardAllData.boards.map((item, index) => (
            <React.Fragment key={index}>
            <tbody
              key={item.id}
              style={{
                fontSize: "16px",
                background: index % 2 === 1 ? "#FFF7F7" : "inherit",
              }}
              >
              <tr className='board-data'>
                <td>{item.iboard}</td>
                <td>{item.title}</td>
                <td>{item.nick}</td>
                <td>{item.view}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>                
                <td>{item.postInquiry}
                <td>{item.postManage}</td>
                  <button className='move' onClick={() => moveToDetail(item.iboard)}>이동</button>
                </td>
                <td>{item.productManage}
                  <button className='delete' onClick={e => {handleClickDelete(item.iboard)}}>삭제</button>
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
          total={freeBoardAllData.totalBoardCount}
          pageSize={12}
          style={{paddingTop: "30px"}}
        />
      </div>
    </BoardWrap>
  )
}

export default AdminFreeBoardPage;