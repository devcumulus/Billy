// 담당자: 최배근
import React, { useEffect, useState } from "react";
import {
  PaginationContent,
  ReportMain,
  ReportTitle,
} from "../../styles/admin/AdminReportPageStyle";
import { ModalBackground } from "../../components/joinpopup/JoinPopUp";
import { deleteIrefund, getAdminReserve } from "../../api/admin/admin_reserve_api";
import AdminReserve from "../../components/admin/AdminReserve";

const accidentCate = [
  {
    id: "",
    title: "전체",
  },
  {
    id: 1,
    title: "처리됨",
  },
  {
    id: 0,
    title: "대기중",
  },
  {
    id: -1,
    title: "반려됨",
  },
];

const AdminReservePage = ({ activeBtn }) => {
  const [reserveList, setReserveList] = useState([]);
  const [reserveLength, setReserveLength] = useState([]);
  const [state, setState] = useState(null);
  const [showModal,setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [page, setPage] = useState(1);

  const handlePageChange = _tempPage => {
    setPage(_tempPage);
  };

  const reserveListData = async () => {
    await getAdminReserve(
    page,
    state,
    setReserveList,
    setReserveLength,
    );
  };
    
  useEffect(() => {
    reserveListData();
  }, [page, state]);

    const handleSatus = (irefund) => {
      setShowModal(true);
      setItemToDelete(irefund);
    }

    const handleCancel = async () => {
      if (itemToDelete) {
        await handleReserveButton(itemToDelete, -1);
        setShowModal(false);
      }
    };
    const handleConfirm = async () => {
      if (itemToDelete) {
        await handleReserveButton(itemToDelete, 1);
        setShowModal(false);
      }
    };

    const handleReserveButton = async (irefund,div) => {
      try {
        const deleteReserve = await deleteIrefund(irefund,div);
        
      } catch (error) {
        console.error("Error deleteIrefund:", error);
      }
      reserveListData();
    };

    const closeModal = () => {
      setShowModal(false);
    }

    const formatNumberWithCommas = (number) => {
      return number.toLocaleString();
    };

  return (
    <>
      {showModal && (
        <>
        <AdminReserve onCancel={handleCancel} onConfirm={handleConfirm} onClose={closeModal}
        txt={
          <>
            이 내역을  <br />
            환불하시겠습니까?
          </>
        }/>
        <ModalBackground></ModalBackground>
        </>
      )}
      <ReportTitle>
        <h1>{activeBtn}</h1>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <select onChange={e => setState(e.target.value)} defaultValue="">
            <option value="" disabled hidden>
              상태 선택
            </option>
            {accidentCate.map(item => {
              return (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              );
            })}
          </select>
        </div>
      </ReportTitle>
      <ReportMain>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>아이디</th>
              <th>닉네임</th>
              <th>취소일자</th>
              <th>환불금액</th>
              <th>상태</th>
              <th>변경</th>
            </tr>
          </thead>
          {reserveList.map((item, index) => (
            <tbody
              key={item.refunds}
              style={{
                backgroundColor: index % 2 === 0 ? "inherit" : "#FFF7F7",
              }}
            >
              <tr>
                <td>{index+1}</td>
                <td>{item.uid}</td>
                <td>{item.nick}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>{formatNumberWithCommas(item.amount)} 원</td>
                <td>
                  {item.status === 1
                    ? "처리됨"
                    : item.status === 0
                    ? "대기중"
                    : item.status === -1
                    ? "반려됨"
                    : ""}
                </td>
                <td>{item.status === 1 && item.status === -1
                    ? ""
                    : item.status === 0
                    ? <button onClick={() => handleSatus(item.irefund)}>
                        확인
                      </button>
                    : "확인(완)"}
                  
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </ReportMain>
      <div style={{ margin: "0 auto" }}>
        <PaginationContent
          current={page}
          onChange={handlePageChange}
          total={reserveLength}
          pageSize={12}
        />
      </div>
    </>
  );
};

export default AdminReservePage;
