import React, { useEffect, useState } from "react";
import { BoardWrap, HeaderWrap } from "../../styles/admin/AdminBoardPageStyle";
import Pagination from "../../components/Pagination";
import { Modal } from "../../styles/admin/AdminChatHistoryStyle";
import { getChatHistory } from "../../api/admin/admin_board_api";
import { PaginationContent } from "../../styles/admin/AdminReportPageStyle";
import AdminChatHistoryModal from "../../components/admin/AdminChatHistoryModal";

const chatData = {
  totalChatCount: 124,
  chats: [
    {
      ichat: 222,
      category: "사기",
      nick: "우헤헹",
      createdAt: "2024-02-28T06:28:38.904Z",
    },
  ],
};

const initChatData = {
  totalChatCount: 0,
  chats: [
    {
      ichat: 0,
      category: "string",
      nick: "string",
      createdAt: "2024-02-28T06:28:38.904Z",
    },
  ],
};

const AdminChatHistoryPage = () => {
  // 채팅 내역 데이터
  const [chatHistoryData, setChatHistoryData] = useState({});
  console.log("chatHistoryData", chatHistoryData);

  const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(5);
  // const [selectedSearchOption, setSelectedSearchOption] = useState("전체"); // 선택된 검색 옵션 상태
  // const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태
  const getLength = function () {
    return chatHistoryData.length;
  };

  function handlePageChange(value) {
    if (value === "&laquo;") {
      setPage(1);
    } else if (value === "&lsaquo;") {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (page !== totalPage) {
        setPage(page + 1);
      }
    } else if (value === "&raquo;") {
      setPage(totalPage);
    } else {
      setPage(value);
    }
  }

  // 모달창
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const toggleModal = content => {
    setModalContent(content); // 모달에 표시할 내용 업데이트
    setModal(!modal);
  };

  useEffect(() => {
    getChatHistory(page, successFn, errorFn);
  }, [page]);

  const successFn = res => {
    console.log("성공했을때", res);
    setChatHistoryData(res);
    console.log(res);
  };

  const errorFn = res => {
    console.log("실패", res);
    alert(`${res.message} \n 에러코드(${res.errorCode})`);
  };

  return (
    <BoardWrap>
      <HeaderWrap>
        <div className="header-title">
          <div className="title">신고 채팅 내역</div>
          <div className="total">총 {chatHistoryData.totalChatCount}개</div>
        </div>
      </HeaderWrap>

      <table style={{ width: "100%" }}>
        <thead
          style={{ height: "50px", background: "#FFE6E6", fontSize: "16px" }}
        >
          <tr>
            <th>번호</th>
            <th>카테고리</th>
            <th>닉네임</th>
            <th>등록일</th>
            <th>내역 관리</th>
          </tr>
        </thead>
        {chatHistoryData &&
          chatHistoryData.chats &&
          chatHistoryData.chats.map((item, index) => (
            <>
              <tbody
                key={item.id}
                style={{
                  fontSize: "16px",
                  background: index % 2 === 1 ? "#FFF7F7" : "inherit",
                }}
              >
                <tr className="board-data">
                  <td>{index + 1}</td>
                  <td>{item.category}</td>
                  <td>{item.nick}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                  <td>
                    {item.productInquiry}
                    <div>
                      <button
                        className="move"
                        onClick={() => toggleModal(item)}
                      >
                        내용
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </>
          ))}
      </table>
      {modal && (
        <AdminChatHistoryModal toggleModal={toggleModal} className={modal} 
        // data={res.data} 
        />
      )}
      <div>
        <PaginationContent
          current={page}
          onChange={handlePageChange}
          total={chatHistoryData.totalChatCount}
          pageSize={12}
          style={{paddingTop: "30px"}}
        />
      </div>
    </BoardWrap>
  );
};

export default AdminChatHistoryPage;
