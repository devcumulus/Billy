import React, { useState, useEffect, useRef } from "react";
import {
  CateHover,
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
  SearchDiv,
  SearchDivisionLine,
  SearchForm,
  SearchWord,
  SubCate,
} from "../../styles/header/HeaderStyle";
import { DivisionLine } from "../../styles/login/LoginPageStyle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";
import MenuTab, { mainCate, subCate } from "./MenuTab";
import { searchGet } from "../../api/header/header_api";

const Header = ({ searchName, pageNum }) => {
  // 검색 데이터 연동
  const [isHovered, setIsHovered] = useState(true);
  const [isCateHoverVisible, setIsCateHoverVisible] = useState(false);
  const [isSearchWord, setIsSearchWord] = useState(false);
  const [search, setSearch] = useState("");
  const [mc, setMc] = useState("");
  const [sc, setSc] = useState("");
  const searchWordRef = useRef(null);
  const searchBtRef = useRef(null);

  const handleChangeSearch = e => {
    setSearch(e.target.value);
  };
  const onClickSearch = e => {
    e.preventDefault();
    // console.log("검색실행", search);
    sessionStorage.setItem("searchValue", search);
    const sendData = {
      search: search,
      mc: mc,
      sc: sc,
      pageNum: 1,
    };
    searchGet({ sendData, successFn, failFn, errFn });
  };
  const handleKeyDown = e => {
    // 키 다운 이벤트 처리 함수
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtRef.current.click(); // SearchBt 클릭 이벤트 호출
    }
  };
  const successFn = result => {
    // console.log("검색 성공", result);
    const searchValue = sessionStorage.getItem("searchValue");

    let url = `/search?search=${search}`;
    if (mc) {
      url += `&mc=${mc}`;
    }
    if (sc) {
      url += `&sc=${sc}`;
    }
    navigate(url, { state: { result, searchValue } });
    window.location.reload();
  };

  const failFn = result => {
    console.log("검색 오류", result);
  };

  const errFn = result => {
    console.log("검색 서버에러", result);
  };

  // 검색 카테고리 선택
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedSubCate, setSelectedSubCate] = useState([
    { id: 0, title: "전체" },
  ]);
  const handleMainCategoryChange = event => {
    const selectedOption = mainCate.find(
      item => item.id === parseInt(event.target.value),
    );
    setSelectedValue(selectedOption ? selectedOption.title : "");
    setMc(selectedOption ? selectedOption.id : "");
    const selectedMainCategoryId = parseInt(event.target.value);
    const selectedMainCategory = mainCate.find(
      item => item.id === selectedMainCategoryId,
    );

    if (selectedMainCategory) {
      const selectedSubCategoryId = selectedMainCategoryId - 1;
      const selectedSubCategory = subCate[selectedSubCategoryId];

      setSelectedSubCate(selectedSubCategory);
    }
  };

  const [selectedSubValue, setSelectedSubValue] = useState("");
  const handleSubCategoryChange = event => {
    const selectedOption = selectedSubCate.find(
      item => item.title === event.target.value,
    );
    setSelectedSubValue(selectedOption ? selectedOption.title : "");
    setSc(selectedOption ? selectedOption.id : "");
  };

  const handleSearchDivClick = () => {
    setIsCateHoverVisible(!isCateHoverVisible);
    setIsSearchWord(false);
  };

  const handleClickOutsideCateHover = e => {
    if (isCateHoverVisible && e.target.closest(".header-search") === null) {
      setIsCateHoverVisible(false);
    }
  };

  const handleSearchWordClick = () => {
    setIsSearchWord(!isSearchWord);
    setIsCateHoverVisible(false);
  };

  const handleClickOutsideSearchWord = e => {
    if (isSearchWord && e.target.closest(".header-search") === null) {
      setIsSearchWord(false);
    }
  };

  // 페이지 이동
  const navigate = useNavigate();
  const handleLogo = () => {
    navigate(`/`);
  };
  const handleLogin = () => {
    navigate(`/login`);
  };
  const handleJoin = () => {
    navigate(`/join/step_1`);
  };
  const handleMy = subItem => {
    sessionStorage.setItem("selectedItem", subItem);
  };

  // 스크롤 시 그림자 생성
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideSearchWord);
    return () => {
      document.removeEventListener("click", handleClickOutsideSearchWord);
    };
  }, [isSearchWord]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideCateHover);
    return () => {
      document.removeEventListener("click", handleClickOutsideCateHover);
    };
  }, [isCateHoverVisible]);

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
  const { moveToPath, isLogin, doLogout, userAuth } = useCustomLogin();
  // console.log(userAuth)

  const dispatch = useDispatch();
  const handleLogout = () => {
    doLogout();
    moveToPath("/");
  };

  return (
    <HeaderStyle
      style={
        scrollPosition < 30
          ? { boxShadow: `none` }
          : { boxShadow: `0px 2px 5px 0px rgba(0, 0, 0, 0.25)` }
      }
    >
      <HeaderTop>
        <HeaderLogo src="/images/logo.svg" onClick={handleLogo} />
        <div className="header-search">
          <SearchForm>
            <SearchWord
              ref={searchWordRef}
              onChange={e => handleChangeSearch(e)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder={"검색어를 입력해주세요."}
              min={2}
              value={search}
              onMouseEnter={() => setIsHovered(false)}
              onMouseLeave={() => setIsHovered(true)}
              onClick={handleSearchWordClick}
              style={{
                backgroundColor: isSearchWord ? "#FFF" : "",
                borderRadius: isSearchWord ? "45px" : "",
                boxShadow: isSearchWord
                  ? "4px 0px 8px 0px rgba(0, 0, 0, 0.25)"
                  : "",
              }}
            />
            {isHovered && !isSearchWord && (
              <SearchDivisionLine></SearchDivisionLine>
            )}
            <SearchDiv
              onMouseEnter={() => setIsHovered(false)}
              onMouseLeave={() => setIsHovered(true)}
              onClick={handleSearchDivClick}
              style={{
                backgroundColor: isCateHoverVisible ? "#FFF" : "",
                borderRadius: isCateHoverVisible ? "45px" : "",
                boxShadow: isCateHoverVisible
                  ? "-4px 0px 8px 0px rgba(0, 0, 0, 0.25)"
                  : "",
              }}
            >
              <b>카테고리</b>
              <div>
                <span>{selectedValue ? selectedValue : "메인 카테고리"}</span>
                <p></p>
                <span>
                  {selectedSubValue ? selectedSubValue : "상세 카테고리"}
                </span>
              </div>
            </SearchDiv>
            {isCateHoverVisible && (
              <CateHover>
                <div>
                  <h1>메인 카테고리</h1>
                  <select onChange={handleMainCategoryChange} defaultValue="">
                    <option value="" disabled hidden>
                      전체
                    </option>
                    {mainCate.map(item => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <h1>상세 카테고리</h1>
                  <select onChange={handleSubCategoryChange} defaultValue="">
                    <option value="" disabled hidden>
                      전체
                    </option>
                    {selectedSubCate.map(listItem => {
                      return (
                        <option key={listItem.id}>{listItem.title}</option>
                      );
                    })}
                  </select>
                </div>
              </CateHover>
            )}
            <SearchBt
              ref={searchBtRef}
              onClick={e => onClickSearch(e)}
              type="button"
            />
          </SearchForm>
        </div>
        {isLogin ? (
          <LoginState>
            <button onClick={handleLogout}>로그아웃</button>
            <DivisionLine></DivisionLine>
            {userAuth == 1 ? (
              <Link
                to="/my"
                onClick={() => {
                  handleMy("대여중");
                }}
              >
                <button>마이페이지</button>
              </Link>
            ) : (
              <Link
                to="/admin"
                // onClick={() => {
                //   handleMy("대여중");
                // }}
              >
                <button>관리자페이지</button>
              </Link>
            )}
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
          {mainCate.map(item => (
            <MainCate
              key={item.title}
              onMouseEnter={() => handleCategoryHover(item.title)}
              onMouseLeave={() => handleCategoryLeave(item.title)}
              className={activeCategory === item.title ? "active" : ""}
            >
              <MainCateTitle
                style={
                  activeCategory === item.title
                    ? {
                        color: "#2C39B5",
                        fontWeight: "500",
                        fontSize: "13px",
                      }
                    : { color: "#777" }
                }
              >
                {item.title}
              </MainCateTitle>
              {activeCategory === item.title && (
                <SubCate>
                  {subCate[item.id - 1].map(listItem => (
                    <li
                      key={listItem.id}
                      title={listItem.title}
                      onClick={() => {
                        // navigate(`/more/1/${item.id}/${listItem.id}`, {
                        navigate(
                          `/more?mc=${item.id}&sc=${listItem.id}&page=1`,
                          {
                            state: { title: listItem.title },
                          },
                        );
                        window.location.reload(); // 페이지 이동 후 화면 갱신
                      }}
                      onMouseEnter={() => handleSubCateHover(listItem.title)}
                      onMouseLeave={handleSubCateLeave}
                      style={
                        activeSubCate === listItem.title
                          ? {
                              color: "#2C39B5",
                              fontWeight: "500",
                              background: "#F2F2FF",
                            }
                          : {}
                      }
                    >
                      {listItem.title}
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
