import React, { useEffect, useState } from "react";
import AdminMemberPage from "./AdminMemberPage";
import AdminReportPage from "./AdminReportPage";
import AdminBoardPage from "./AdminBoardPage";
import AdminFreeBoardPage from "./AdminFreeBoardPage";
import AdminChatHistoryPage from "./AdminChatHistoryPage";
import styled from "@emotion/styled";
import AdminCategory from "../../components/admin/AdminCategory";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginState } from "../../styles/header/HeaderStyle";
import { DivisionLine } from "../../styles/login/LoginPageStyle";
import { AdminTitle } from "../../styles/admin/AdminPageStyle";
import useCustomLogin from "../../hooks/useCustomLogin";

const AllWidth = styled.div`
  width: 1260px;
  margin: 0 auto;
`;
const Flex = styled.div`
  display: flex;
  margin-bottom: 9rem;
  > div:nth-of-type(2) {
    width: 1090px;
    margin-left: 35px;
    display: flex;
    flex-direction: column;
    gap: 3.3rem;
  }
`;

const AdminPage = () => {
  const [activeBtn, setActiveBtn] = useState("개인 회원");
  const [selectedItem, setSelectedItem] = useState("개인 회원");
  const adminCate = [
    {
      title: "회원 조회",
      name: ["individual", "enterprise"],
      list: ["개인 회원"],
    },
    {
      title: "신고 내역",
      name: ["conflict", "accident"],
      list: ["분쟁 신고", "사고 신고"],
    },
    {
      title: "게시판 내역",
      name: ["prod", "free"],
      list: ["상품 게시판", "자유 게시판"],
    },
    {
      title: "채팅",
      name: ["chat"],
      list: ["채팅 내역"],
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  // 로그아웃
  const { moveToPath, isLogin, doLogout } = useCustomLogin();
  const handleLogout = () => {
    doLogout();
    moveToPath("/");
  };

  // 메인페이지로 이동
  const handleMain = () => {
    navigate(`/`);
  };

  // AdminCate 상태 변경
  useEffect(() => {
    const storedItem = sessionStorage.getItem("selectedItem");
    if (storedItem && storedItem !== selectedItem) {
      setSelectedItem(storedItem);
      setActiveBtn(storedItem);
    } else {
      const params = new URLSearchParams(location.search);
      const item = params.get("item") || selectedItem;
      setSelectedItem(item);
      setActiveBtn(item);
    }
  }, [location.search, selectedItem]);

  const handleSubItemClick = subItem => {
    setSelectedItem(subItem);
    setActiveBtn(subItem);
    const selectedCategory = adminCate.find(category =>
      category.list.includes(subItem),
    );

    if (selectedCategory) {
      const selectedName = selectedCategory.name.find(name => {
        return (
          (name === "individual" && subItem === "개인 회원") ||
          (name === "conflict" && subItem === "분쟁 신고") ||
          (name === "accident" && subItem === "사고 신고") ||
          (name === "prod" && subItem === "상품 게시판") ||
          (name === "free" && subItem === "자유 게시판") ||
          (name === "chat" && subItem === "채팅 내역")
        );
      });

      if (selectedName) {
        navigate(`/admin?${selectedName}`, {
          state: { selectedItem: subItem },
        });
        sessionStorage.setItem("selectedItem", subItem);
      }
    }
  };

  return (
    <AllWidth>
      <div>
        <AdminTitle>
          <h1>관리자 페이지</h1>
          <LoginState>
            <button onClick={handleLogout}>로그아웃</button>
            <DivisionLine color="#C14B45"></DivisionLine>
            <button onClick={handleMain}>메인페이지</button>
          </LoginState>
        </AdminTitle>
        <Flex>
          <AdminCategory
            adminCate={adminCate}
            selectedItem={selectedItem}
            onSubItemClick={handleSubItemClick}
          />
          <div>
            {activeBtn === "개인 회원" && (
              <AdminMemberPage
                activeBtn={activeBtn}
                setActiveBtn={setActiveBtn}
                handleSubItemClick={handleSubItemClick}
              />
            )}
            {activeBtn === "분쟁 신고" || activeBtn === "사고 신고" ? (
              <AdminReportPage
                activeBtn={activeBtn}
                setActiveBtn={setActiveBtn}
                handleSubItemClick={handleSubItemClick}
              />
            ) : null}
            {/* {activeBtn === "상품 게시판" || activeBtn === "자유 게시판" ? (
              <AdminBoardPage
                activeBtn={activeBtn}
                setActiveBtn={setActiveBtn}
                handleSubItemClick={handleSubItemClick}
              />
            ) : null} */}
            {activeBtn === "상품 게시판" && <AdminBoardPage />}
            {activeBtn === "자유 게시판" && <AdminFreeBoardPage />}
            {activeBtn === "채팅 내역" && <AdminChatHistoryPage />}
          </div>
        </Flex>
      </div>
    </AllWidth>
  );
};

export default AdminPage;
