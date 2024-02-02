import React, { useState } from "react";
import {
  MainMenu,
  MainMenuList,
  MenuTabStyle,
  SubMenuList,
} from "../../styles/header/MenuTabStyle";
import { useNavigate } from "react-router-dom";
export const menuCate = [
  {
    title: "스마트 기기",
    list: [
      { id: 101, cate: "스마트 워치" },
      { id: 102, cate: "태블릿" },
      { id: 103, cate: "갤럭시" },
      { id: 104, cate: "아이폰" },
    ],
  },
  {
    title: "PC / 노트북",
    list: [
      { id: 201, cate: "노트북" },
      { id: 202, cate: "PC" },
      { id: 203, cate: "마우스" },
      { id: 204, cate: "키보드" },
    ],
  },
  {
    title: "영상 / 카메라",
    list: [
      { id: 301, cate: "빔프로젝터" },
      { id: 302, cate: "셋톱박스" },
      { id: 303, cate: "카메라" },
      { id: 304, cate: "캠코더" },
      { id: 305, cate: "DSLR" },
    ],
  },
  {
    title: "음향",
    list: [
      { id: 401, cate: "스피커" },
      { id: 402, cate: "이어폰" },
      { id: 403, cate: "헤드폰" },
      { id: 404, cate: "마이크" },
    ],
  },
  {
    title: "게임 기기",
    list: [
      { id: 501, cate: "플레이스테이션" },
      { id: 502, cate: "닌텐도" },
      { id: 503, cate: "Wii" },
      { id: 504, cate: "XBOX" },
      { id: 505, cate: "기타" },
    ],
  },
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
  const handleClickCate = () => {
    navigate(`/main/more`);
  };
  return (
    <MenuTabStyle>
      {menuCate.map(item => (
        <MainMenu key={item.title}>
          <MainMenuList>{item.title}</MainMenuList>
          <SubMenuList>
            {item.list.map(listItem => (
              <li
                key={listItem.id}
                onClick={handleClickCate}
                onMouseEnter={() => handleCategoryHover(listItem.cate)}
                onMouseLeave={handleCategoryLeave}
                style={
                  activeCategory === listItem.cate
                    ? { color: "#2C39B5", fontWeight: "500" }
                    : {}
                }
              >
                {listItem.cate}
              </li>
            ))}
          </SubMenuList>
        </MainMenu>
      ))}
    </MenuTabStyle>
  );
};
export default MenuTab;
