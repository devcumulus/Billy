import React, { useState, useEffect, useRef } from "react";
import {
  CategoryTab,
  HeaderLogo,
  HeaderMainMenu,
  HeaderMenu,
  HeaderStyle,
  HeaderTop,
  LoginState,
  MainCate,
  MainCateTitle,
  SearchBt,
  SearchForm,
  SearchWord,
  SubCate,
} from "../../styles/header/HeaderStyle";
import { DivisionLine } from "../../styles/login/LoginPageStyle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";
import MenuTab, { menuCate } from "./MenuTab";

const Header = () => {
  // 페이지 이동
  const navigate = useNavigate();
  const handleLogo = () => {
    navigate(`/`);
  };
  const handleLogin = () => {
    navigate(`/login`);
  };
  const handleJoin = () => {
    navigate(`/join/1`);
  };
  const handleMy = () => {
    navigate(`/my`);
  };
  const handleCate = () => {
    navigate(`/main/more`);
  };

  // 스크롤 시 그림자 생성
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  // 메뉴 click시 메뉴창 나오기
  const [menuVisible, setMenuVisible] = useState(false);
  const inSectionMenu = useRef();
  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  useEffect(() => {
    const clickMenuOutside = e => {
      if (menuVisible && !inSectionMenu.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", clickMenuOutside);

    return () => {
      document.removeEventListener("mousedown", clickMenuOutside);
    };
  }, [menuVisible]);

  // 카테고리 hover시 메뉴창 나오기
  const [activeCategory, setActiveCategory] = useState(null);
  const handleCategoryHover = category => {
    setActiveCategory(category); // 마우스가 hover되었음을 상태에 저장
  };
  const handleCategoryLeave = () => {
    setActiveCategory(null); // 마우스가 hover되지 않았음을 상태에 저장
  };

  // 서브카테 hover시 색상 변경
  const [activeSubCate, setActiveSubCate] = useState(null);
  const handleSubCateHover = category => {
    setActiveSubCate(category);
  };
  const handleSubCateLeave = () => {
    setActiveSubCate(null);
  };

  // 로그인 & 로그아웃
  const loginState = useSelector(state => state.loginSlice);
  // console.log(loginState);
  const { moveToPath, isLogin, doLogout } = useCustomLogin();

  const dispatch = useDispatch();
  const handleLogout = () => {
    doLogout();
    moveToPath("/");
  };

  return (
    <HeaderStyle
      style={
        scrollPosition < 100
          ? { boxShadow: `none` }
          : { boxShadow: `0px 2px 5px 0px rgba(0, 0, 0, 0.25)` }
      }
    >
      <HeaderTop>
        <HeaderLogo onClick={handleLogo}>로고</HeaderLogo>
        <div className="header-search">
          <SearchForm>
            <SearchWord type="text" />
            <SearchBt type="button" />
          </SearchForm>
        </div>
        {isLogin ? (
          <LoginState>
            <button onClick={handleLogout}>로그아웃</button>
            <DivisionLine></DivisionLine>
            <button onClick={handleMy}>마이페이지</button>
          </LoginState>
        ) : (
          <LoginState>
            <button onClick={handleLogin}>로그인</button>
            <DivisionLine></DivisionLine>
            <button onClick={handleJoin}>회원가입</button>
          </LoginState>
        )}
      </HeaderTop>
      <HeaderMenu>
        <HeaderMainMenu ref={inSectionMenu}>
          {menuVisible === true ? (
            <img src="/images/header/bt_cancel.svg" onClick={toggleMenu} />
          ) : (
            <img src="/images/header/bt_menu.svg" onClick={toggleMenu} />
          )}
          {menuVisible && <MenuTab></MenuTab>}
        </HeaderMainMenu>

        <CategoryTab>
          {menuCate.map(item => (
            <MainCate
              key={item.title}
              // onClick={() => handleTitleClick(item.title)}
              onMouseEnter={() => handleCategoryHover(item.title)}
              onMouseLeave={() => handleCategoryLeave(item.title)}
              className={activeCategory === item.title ? "active" : ""}
            >
              <MainCateTitle
                style={
                  activeCategory === item.title
                    ? { color: "#2C39B5", fontWeight: "500", fontSize: "13px" }
                    : { color: "#777" }
                }
              >
                {item.title}
              </MainCateTitle>
              {activeCategory === item.title && (
                <SubCate>
                  {item.list.map(listItem => (
                    <li
                      key={listItem.id}
                      onClick={handleCate}
                      onMouseEnter={() => handleSubCateHover(listItem.cate)}
                      onMouseLeave={handleSubCateLeave}
                      style={
                        activeSubCate === listItem.cate
                          ? { color: "#2C39B5", fontWeight: "500", background: "#F2F2FF" }
                          : {}
                      }
                    >
                      {listItem.cate}
                    </li>
                  ))}
                </SubCate>
              )}
            </MainCate>
          ))}
          <div></div>
        </CategoryTab>
      </HeaderMenu>
    </HeaderStyle>
  );
};

export default Header;
