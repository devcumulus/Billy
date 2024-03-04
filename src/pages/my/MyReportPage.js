import React, { useEffect, useState } from 'react'
import { MyListDiv, MyListTop } from '../../styles/my/MyList'
import { useTable, usePagination } from 'react-table';
import { getMyDispute } from '../../api/my/my_api';
import MyModal from "../../components/my/interest/MyModal";
import { DetailsContainer, PaginationButton, PaginationContainer, TrContaineer } from '../../styles/my/MyTable';
import { ModalBackground } from '../../components/joinpopup/JoinPopUp';

const contentData = [
  {
    idispute: 1,
    category: "잠수(구매전)",
    createdAt: "2024.02.15",
    reportedUserNick: "kong123",
    penalty: "-5점",
    status: "STAND_BY",
    kind: "대기",
    details: `
      15일 14시에 중앙로역에서 만나기로 했는데 안 나왔어요.
      한시간동안 기다렸는데 연락도 없고!!! 아주 나쁜 놈이네요.
      15일 14시에 중앙로역에서 만나기로 했는데 안 나왔어요.
      한시간동안 기다렸는데 연락도 없고!!! 아주 나쁜 놈이네요
    `,
  },
  {
    idispute: 2,
    category: "잠수(구매전)",
    createdAt: "2024.02.15",
    reportedUserNick: "kong123",
    penalty: "-5점",
    status: "cre",
    kind: "대기",
    details: `
      15일 14시에 중앙로역에서 만나기로 했는데 안 나왔어요.
      한시간동안 기다렸는데 연락도 없고!!! 아주 나쁜 놈이네요.
      15일 14시에 중앙로역에서 만나기로 했는데 안 나왔어요.
      한시간동안 기다렸는데 연락도 없고!!! 아주 나쁜 놈이네요
    `,
  },
  {
    idispute: 3,
    category: "잠수(구매전)",
    createdAt: "2024.02.15",
    reportedUserNick: "kong123",
    penalty: "-5점",
    status: "STAND_BY",
    kind: "대기",
    details: `
      15일 14시에 중앙로역에서 만나기로 했는데 안 나왔어요.
      한시간동안 기다렸는데 연락도 없고!!! 아주 나쁜 놈이네요.
      15일 14시에 중앙로역에서 만나기로 했는데 안 나왔어요.
      한시간동안 기다렸는데 연락도 없고!!! 아주 나쁜 놈이네요
    `,
  },
]

const MyReportPage = ({activeBtn}) => {
  const [data, setData] = useState([]);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [pageNum, setPageNum] = useState(1);

  const columns  = React.useMemo(
    () => [
      {
        Header: "번호",
        accessor: "idispute",
        width: 80,
      },
      {
        Header: "날짜",
        accessor: "createdAt",
        width: 80,
      },
      {
        Header: "신고 아이디",
        accessor: "reportedUserNick",
        width: 120,
      },
      {
        Header: "신고 카테고리",
        accessor: "category",
        width: 150,
      },
      {
        Header: "벌점",
        accessor: "penalty",
        width: 80,
      },
      {
        Header: "상태",
        accessor: "kind",
        width: 80,
      }
    ],[]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data, // data 속성을 useState로부터 받아온 데이터로 설정
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMyDispute(1);
        setData(result.disputes);
      } catch (error) {
        console.error(error);
        setData(contentData);
      }
    };

    fetchData();
  }, [activeBtn]);


  const handleDisputeClick = async (itemToDelete) => {
    try {
      const disputeClick = await patchDispute(itemToDelete);
      const updatedDispute = await getMyDispute(pageNum);
      setData(updatedDispute);
    } catch (error) {
      console.error("Error dispute:", error);
    }
  };
  
  const handleDeleteClick = (item) => {
    setShowModal(true);
    setItemToDelete(item);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    await handleDisputeClick(itemToDelete);
    setShowModal(false);
  };

  return (
    <MyListDiv>
      <MyListTop>
        <h2>신고 내역</h2>
      </MyListTop>
      <table
        {...getTableProps()}
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "25px",
        }}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderTop: "1px solid #2C39B5",
                    borderBottom: "1px solid #2C39B5",
                    height: "40px",
                    textAlign: "center",
                    fontWeight: "normal",
                    fontSize: "14px",
                    width: column.width,
                  }}
                  key={column.id}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page && page.map((row,index) => {
            prepareRow(row);
            const isRowExpanded = expandedRowIndex === index;
            return (
              <React.Fragment key={row.id}>
              <TrContaineer {...row.getRowProps()} 
                onClick={() => setExpandedRowIndex(isRowExpanded ? null : index)}
                style={{cursor: "pointer"}}
              >
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      height: "60px",
                      textAlign: "center",
                      fontSize: "14px",
                      borderBottom: "1px solid #2C39B5",
                    }}
                    key={cell.column.id}
                  >
                    {cell.column.id === 'reportedUserNick' && !cell.value
                      ? row.original.title
                      : cell.render('Cell')}
                  </td>
                ))}
              </TrContaineer>
              <tr>
                <td colSpan={columns.length}>
                  <DetailsContainer show={isRowExpanded}>
                    <p>{row.original.details}</p>
                    {row.original.status === "STAND_BY" && (
                      <div>
                        <span onClick={() => handleDeleteClick(row.original.idispute)}>철회</span>
                      </div>
                      
                    )}
                  </DetailsContainer>
                </td>
              </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      {showModal && (
        <>
        <MyModal onCancel={handleCancel} onConfirm={handleConfirm}  
        txt={
          <>
            신고 내역을  <br />
            철회하시겠습니까?
          </>
        }/>
        <ModalBackground></ModalBackground>
        </>
      )}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
      <PaginationContainer>
        <PaginationButton
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </PaginationButton>
        <PaginationButton
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </PaginationButton>
        {Array.from({ length: pageCount }, (_, i) => (
          <PaginationButton
            key={i}
            className={pageIndex === i ? "active" : ""}
            onClick={() => gotoPage(i)}
          >
            {i + 1}
          </PaginationButton>
        ))}
        <PaginationButton
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </PaginationButton>
        <PaginationButton
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </PaginationButton>
      </PaginationContainer>
         <span></span>
      </div>
    </MyListDiv>
  )
}

export default MyReportPage