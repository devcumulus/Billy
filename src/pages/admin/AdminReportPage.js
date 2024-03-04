import React, { useEffect, useState } from "react";
import {
  PaginationContent,
  ReportMain,
  ReportSearchBt,
  ReportSearchForm,
  ReportSearchWord,
  ReportTitle,
} from "../../styles/admin/AdminReportPageStyle";
import {
  ReportDoneContent,
  ReportYetContent,
} from "../../components/admin/ReportContent";
import { ModalBackground } from "../../components/joinpopup/JoinPopUp";
import { getDispute, postDispute } from "../../api/admin/admin_report_api";

const stateCate = [
  {
    id: 1,
    title: "수락",
  },
  {
    id: -1,
    title: "반려",
  },
  {
    id: 0,
    title: "미처리",
  },
];

const conflictCate = [
  // {
  //   id: 0,
  //   title: "전체",
  // },
  {
    id: 1,
    title: "잠수(구매전)",
  },
  {
    id: 2,
    title: "잠수(구매후)",
  },
  {
    id: 3,
    title: "허위매물",
  },
  {
    id: 4,
    title: "바꿔치기",
  },
  {
    id: 5,
    title: "매너",
  },
  {
    id: 6,
    title: "지연",
  },
];

const accidentCate = [
  // {
  //   id: 0,
  //   title: "전체",
  // },
  {
    id: -1,
    title: "파손",
  },
  {
    id: -2,
    title: "분실",
  },
];

const conflictData = [
  {
    id: 1,
    uid: "junseo",
    nick: "바보준서",
    cate: "잠수(구매전)",
    date: "2024.02.15",
    oppositeId: "kong123",
    penaltyPoint: "-15",
    state: "반려",
    content: `15일 14시에 중앙로역에서 만나기로 했는데 안 나왔어요.
    한시간동안 기다렸는데 연락도 없고!!! 아주 나쁜 놈이네요`,
  },
  {
    id: 2,
    uid: "qwqwqw11",
    nick: "현빈대마왕",
    cate: "지연",
    date: "2024.02.15",
    oppositeId: "qwqwqw55",
    penaltyPoint: "-10",
    state: "수락",
    content: `오늘까지 대여 날짜인데 반납할 시간 없다고 내일 반납한다고 하네요.
    내일 대여하기로 한 사람있는데 전 어떻게 해야하죠??`,
  },
  {
    id: 3,
    uid: "junseo",
    nick: "바보준서",
    cate: "잠수(구매전)",
    date: "2024.02.15",
    oppositeId: "kong123",
    penaltyPoint: "-15",
    state: "수락",
    content: `15일 14시에 중앙로역에서 만나기로 했는데 안 나왔어요.
    한시간동안 기다렸는데 연락도 없고!!! 아주 나쁜 놈이네요`,
  },
  {
    id: 4,
    uid: "qwqwqw11",
    nick: "현빈대마왕",
    cate: "지연",
    date: "2024.02.15",
    oppositeId: "qwqwqw55",
    penaltyPoint: "-10",
    state: "반려",
    content: `오늘까지 대여 날짜인데 반납할 시간 없다고 내일 반납한다고 하네요.
    내일 대여하기로 한 사람있는데 전 어떻게 해야하죠??`,
  },
  {
    id: 5,
    uid: "junseo",
    nick: "바보준서",
    cate: "잠수(구매전)",
    date: "2024.02.15",
    oppositeId: "kong123",
    penaltyPoint: "-15",
    state: "미처리",
    content: `15일 14시에 중앙로역에서 만나기로 했는데 안 나왔어요.
    한시간동안 기다렸는데 연락도 없고!!! 아주 나쁜 놈이네요`,
  },
  {
    id: 6,
    uid: "qwqwqw11",
    nick: "현빈대마왕",
    cate: "지연",
    date: "2024.02.15",
    oppositeId: "qwqwqw55",
    penaltyPoint: "-10",
    state: "미처리",
    content: `오늘까지 대여 날짜인데 반납할 시간 없다고 내일 반납한다고 하네요.
    내일 대여하기로 한 사람있는데 전 어떻게 해야하죠??`,
  },
  {
    id: 7,
    uid: "junseo",
    nick: "바보준서",
    cate: "파손",
    date: "2024.02.15",
    oppositeId: "kong123",
    penaltyPoint: "-15",
    state: "반려",
    content: `15일 14시에 중앙로역에서 만나기로 했는데 안 나왔어요.
    한시간동안 기다렸는데 연락도 없고!!! 아주 나쁜 놈이네요`,
  },
  {
    id: 8,
    uid: "qwqwqw11",
    nick: "현빈대마왕",
    cate: "파손",
    date: "2024.02.15",
    oppositeId: "qwqwqw55",
    penaltyPoint: "-10",
    state: "수락",
    content: `오늘까지 대여 날짜인데 반납할 시간 없다고 내일 반납한다고 하네요.
    내일 대여하기로 한 사람있는데 전 어떻게 해야하죠??`,
  },
  {
    id: 9,
    uid: "junseo",
    nick: "바보준서",
    cate: "분실",
    date: "2024.02.15",
    oppositeId: "kong123",
    penaltyPoint: "-15",
    state: "수락",
    content: `15일 14시에 중앙로역에서 만나기로 했는데 안 나왔어요.
    한시간동안 기다렸는데 연락도 없고!!! 아주 나쁜 놈이네요`,
  },
  {
    id: 10,
    uid: "qwqwqw11",
    nick: "현빈대마왕",
    cate: "파손",
    date: "2024.02.15",
    oppositeId: "qwqwqw55",
    penaltyPoint: "-10",
    state: "반려",
    content: `오늘까지 대여 날짜인데 반납할 시간 없다고 내일 반납한다고 하네요.
    내일 대여하기로 한 사람있는데 전 어떻게 해야하죠??`,
  },
  {
    id: 11,
    uid: "junseo",
    nick: "바보준서",
    cate: "분실",
    date: "2024.02.15",
    oppositeId: "kong123",
    penaltyPoint: "-15",
    state: "미처리",
    content: `15일 14시에 중앙로역에서 만나기로 했는데 안 나왔어요.
    한시간동안 기다렸는데 연락도 없고!!! 아주 나쁜 놈이네요`,
  },
  {
    id: 12,
    uid: "qwqwqw11",
    nick: "현빈대마왕",
    cate: "분실",
    date: "2024.02.15",
    oppositeId: "qwqwqw55",
    penaltyPoint: "-10",
    state: "미처리",
    content: `오늘까지 대여 날짜인데 반납할 시간 없다고 내일 반납한다고 하네요.
    내일 대여하기로 한 사람있는데 전 어떻게 해야하죠??`,
  },
];

const AdminReportPage = ({ activeBtn }) => {
  // 데이터 연동(목록 불러오기)
  const [reportList, setReportList] = useState([]);
  const [reportLength, setReportLength] = useState([]);
  const [page, setPage] = useState(1);
  const [div, setDiv] = useState(null);
  const [search, setSearch] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      if (activeBtn === "분쟁 신고") {
        setDiv(1);
      } else if (activeBtn === "사고 신고") {
        setDiv(-1);
      }
      // setData(result)
    };
    fetchData();
  }, [activeBtn]);

  const reportListData = async () => {
    await getDispute(
      page,
      div,
      search,
      category,
      state,
      setReportList,
      setReportLength,
    );
    // setReportList(res.data)
  };
  useEffect(() => {
    reportListData();
  }, [page, div, search, category, state]);

  // 데이터 연동(신고 수락 or 반려)
  const [type, setType] = useState(null);
  const [idispute, setIdispute] = useState(null);
  const handleClickOk = () => {
    setType(1);
    setContentYetModal(false);
  };
  const handleClickNo = () => {
    setType(-1);
    setContentYetModal(false);
  };

  useEffect(() => {
    const stateData = async () => {
      await postDispute(idispute, type);
    };
    stateData();
  }, [idispute, type]);

  // 상태변경 or 상태확인 버튼 클릭
  const [contentYetModal, setContentYetModal] = useState(false);
  const [contentDoneModal, setContentDoneModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const handleClickYet = (detail, idispute) => {
    setSelectedDetail(detail);
    setIdispute(idispute);
    setContentYetModal(true);
  };
  const closeContentYetModal = () => {
    setContentYetModal(false);
  };
  const handleClickDone = detail => {
    setSelectedDetail(detail);
    setContentDoneModal(true);
  };
  const closeContentDoneModal = () => {
    setContentDoneModal(false);
  };

  // 페이지네이션
  // const [pageNum, setPageNum] = useState(1);
  const handlePageChange = _tempPage => {
    setPage(_tempPage);
  };

  return (
    <>
      {contentYetModal && (
        <>
          <ReportYetContent
            onClose={closeContentYetModal}
            detail={selectedDetail}
            Bt_No={handleClickNo}
            Bt_Ok={handleClickOk}
          />
          <ModalBackground />
        </>
      )}
      {contentDoneModal && (
        <>
          <ReportDoneContent
            onClose={closeContentDoneModal}
            detail={selectedDetail}
          />
          <ModalBackground />
        </>
      )}
      <ReportTitle>
        <h1>{activeBtn}</h1>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <ReportSearchForm>
            <ReportSearchWord
              type="text"
              placeholder={"아이디를 입력하세요."}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            ></ReportSearchWord>
            <ReportSearchBt
              type="button"
              onClick={() => setSearch(inputValue)}
            />
          </ReportSearchForm>
          {activeBtn === "분쟁 신고" ? (
            <select onChange={e => setCategory(e.target.value)} defaultValue="">
              <option value="" disabled hidden>
                카테고리 선택
              </option>
              {conflictCate.map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          ) : (
            <select onChange={e => setCategory(e.target.value)} defaultValue="">
              <option value="" disabled hidden>
                카테고리
              </option>
              {accidentCate.map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          )}
          <select onChange={e => setState(e.target.value)} defaultValue="">
            <option value="" disabled hidden>
              상태 선택
            </option>
            {stateCate.map(item => {
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
              <th>아이디</th>
              <th>닉네임</th>
              <th>신고 카테고리</th>
              <th>신고일자</th>
              <th>신고한 유저</th>
              <th>벌점</th>
              <th>상태</th>
              <th>
                변경 및<br />
                조회
              </th>
              {/* <th>조회</th> */}
            </tr>
          </thead>
          {reportList.map((item, index) => (
            <tbody
              key={item.idispute}
              style={{
                backgroundColor: index % 2 === 0 ? "inherit" : "#FFF7F7",
              }}
            >
              <tr>
                <td>{item.reportedUserUid}</td>
                <td>{item.reportedUserNick}</td>
                <td style={{ cursor: "pointer" }}>{item.category}</td>
                <td>{item.createdAt}</td>
                <td>{item.reporterUid}</td>
                <td>{item.penalty}</td>
                <td>{item.status} </td>
                <td>
                  {item.status === "대기중" ? (
                    <button
                      onClick={() => handleClickYet(item.detail, item.idispute)}
                    >
                      확인
                    </button>
                  ) : (
                    <button onClick={() => handleClickDone(item.detail)}>
                      확인
                    </button>
                  )}
                </td>
                {/* <td>
                  <button>이동</button>
                </td> */}
              </tr>
            </tbody>
          ))}
        </table>
      </ReportMain>
      <div style={{ margin: "0 auto" }}>
        <PaginationContent
          current={page}
          onChange={handlePageChange}
          total={reportLength}
          pageSize={12}
        />
      </div>
    </>
  );
};

export default AdminReportPage;
