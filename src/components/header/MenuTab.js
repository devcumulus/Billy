// 담당자: 사공은진
import React, { useState } from "react";
import {
  MainMenu,
  MainMenuList,
  MenuTabStyle,
  SubMenuList,
} from "../../styles/header/MenuTabStyle";
import { Link, useNavigate } from "react-router-dom";

export const mainCate = [
  {
    id: 1,
    title: "스마트 기기",
  },
  {
    id: 2,
    title: "PC / 노트북",
  },
  {
    id: 3,
    title: "영상 / 카메라",
  },
  {
    id: 4,
    title: "음향",
  },
  {
    id: 5,
    title: "게임 기기",
  },
];

export const subCate = [
  [
    { id: 1, title: "스마트 워치" },
    { id: 2, title: "태블릿" },
    { id: 3, title: "갤럭시" },
    { id: 4, title: "아이폰" },
  ],
  [
    { id: 1, title: "노트북" },
    { id: 2, title: "PC" },
    { id: 3, title: "마우스" },
    { id: 4, title: "키보드" },
  ],
  [
    { id: 1, title: "빔프로젝터" },
    { id: 2, title: "셋톱박스" },
    { id: 3, title: "카메라" },
    { id: 4, title: "캠코더" },
    { id: 5, title: "DSLR" },
  ],
  [
    { id: 1, title: "스피커" },
    { id: 2, title: "이어폰" },
    { id: 3, title: "헤드폰" },
    { id: 4, title: "마이크" },
  ],
  [
    { id: 1, title: "플레이스테이션" },
    { id: 2, title: "닌텐도" },
    { id: 3, title: "Wii" },
    { id: 4, title: "XBOX" },
    { id: 5, title: "기타" },
  ],
];

const MenuTab = () => {
  // hover시 배경색 변경
  const [activeCategory, setActiveCategory] = useState(null);
  const handleCategoryHover = category => {
    setActiveCategory(category); // 마우스가 hover되었음을 상태에 저장
  };
  const handleCategoryLeave = () => {
    setActiveCategory(null); // 마우스가 hover되지 않았음을 상태에 저장
  };
  // 페이지 이동
  const navigate = useNavigate();

  return (
    <MenuTabStyle>
      {mainCate.map(item => (
        <MainMenu key={item.id}>
          <MainMenuList>{item.title}</MainMenuList>
          <SubMenuList>
            {subCate[item.id - 1].map(listItem => (
              <li
                key={listItem.id}
                title={listItem.title}
                onClick={() => {
                  // navigate(`/more/1/${item.id}/${listItem.id}`,{ state: { title: listItem.title }});
                  navigate(`/more?mc=${item.id}&sc=${listItem.id}&page=1`, {
                    state: { title: listItem.title },
                  });
                  window.location.reload(); // 페이지 이동 후 화면 갱신
                }}
                onMouseEnter={() => handleCategoryHover(listItem.title)}
                onMouseLeave={handleCategoryLeave}
                style={
                  activeCategory === listItem.title
                    ? { color: "#2C39B5", fontWeight: "500" }
                    : {}
                }
              >
                {listItem.title}
              </li>
            ))}
          </SubMenuList>
        </MainMenu>
      ))}
    </MenuTabStyle>
  );
};
export default MenuTab;
