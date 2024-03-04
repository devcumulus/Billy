import React, { useEffect, useState } from "react";
import {
  MyListDiv,
  MyListTop,
  MyManagementBt,
  MyManagementBtHover,
} from "../../styles/my/MyList";
import { deleteMyBoard, getMyBoard } from "../../api/my/my_api";
import { useTable, usePagination } from "react-table";
import { DetailsContainer, PaginationButton, PaginationContainer, TrContaineer } from "../../styles/my/MyTable";
import MyModal from "./interest/MyModal";
import { ModalBackground } from "../joinpopup/JoinPopUp";
import { Link } from "react-router-dom";

const contentData = {
  "list": [
    {
      "iboard": 14,
      "title": "etst13",
      "contents": ``,
      "view": 0,
      "createdAt": "2024-02-28T07:56:39.226281",
      "istatus": 0,
      "commentCount": 16
    },
    {
      "iboard": 14,
      "title": "etst13",
      "contents": null,
      "view": 0,
      "createdAt": "2024-02-28T07:56:39.226281",
      "istatus": 0,
      "commentCount": 16
    }
  ]
}

const MyBoardList = ({ activeBtn }) => {
  const [data, setData] = useState([]);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  const columns  = React.useMemo(
    () => [
      {
        Header: "번호",
        accessor: "iboard",
        width: 50,
      },
      {
        Header: "날짜",
        accessor: "createdAt",
        width: 100,
      },
      {
        Header: "제목",
        accessor: "title",
        width: 100,
      },
      {
        Header: "내용",
        accessor: "contents",
        width: 200,
      },
      {
        Header: "조회수",
        accessor: "view",
        width: "50px",
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
      initialState: { pageIndex: 0,pageSize: 10},
    },
    usePagination
  );


  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (activeBtn === "등록 게시글") {
          result = await getMyBoard();
        } 
        setData(result.list)
        // setData(contentData.list)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [activeBtn]);

  const handleDeleteBoardClick = async (iboard) => {
    try {
      const favResult = await deleteMyBoard(iboard);

      const updatedResult = await getMyBoard(1);
      setData(updatedResult.list);

    } catch (error) {
      console.error("Error deleteBoard:", error);
    }
  };

  const handleDeleteClick = (row) => {
    setShowModal(true);
    setItemToDelete(row.original);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    if (itemToDelete) {
      await handleDeleteBoardClick(itemToDelete.iboard);
      setShowModal(false);
    }
  };

  return (
    <MyListDiv>
      {showModal && (
        <>
        <MyModal onCancel={handleCancel} onConfirm={handleConfirm}  
        txt={
          <>
            이 게시글을  <br />
            삭제하시겠습니까?
          </>
        }/>
        <ModalBackground></ModalBackground>
        </>
      )}
      <MyListTop>
        {activeBtn === "등록 게시글" && <h2>등록 게시글</h2>}
      </MyListTop>
      <table
        {...getTableProps()}
        style={{
          borderCollapse: "collapse",
          width: "980px",
          marginTop: "20px",
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
                {row.cells.map((cell,columnIndex) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      height: "60px",
                      textAlign: "center",
                      fontSize: "14px",
                      borderBottom: "1px solid #2C39B5",
                      whiteSpace: "nowrap", 
                      overflow: "hidden",   
                      textOverflow: "ellipsis",
                      maxWidth: headerGroups[0].headers[columnIndex].width,
                    }}
                    key={cell.column.id}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </TrContaineer>
              <tr>
                <td colSpan={columns.length}>
                  <DetailsContainer show={isRowExpanded} content={"end"}>
                    <Link to={`/free/modify?iboard=${row.original.iboard}`}>
                      <MyManagementBt>수정</MyManagementBt>
                    </Link>
                    <MyManagementBtHover onClick={()=>handleDeleteClick(row)}>삭제</MyManagementBtHover>
                  </DetailsContainer>
                </td>
              </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
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
  );
};

export default MyBoardList;
