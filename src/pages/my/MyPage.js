import React, { useEffect, useState } from 'react'
import Layout from "../../layouts/Layout";
import MyCategory from "../../components/my/MyCategory";
import Mytitle from "../../components/my/Mytitle";
import styled from '@emotion/styled';
import MyRentalPage from './MyRentalPage';
import MyManagementPage from './MyManagementPage';
import MyBoardPage from './MyBoardPage'
import MyReviewPage from './MyReviewPage';
import MyInterestPage from './MyInterestPage';
import MyReservationPage from './MyReservationPage'
import MyReportPage from './MyReportPage';
import MyInfoPage from './MyInfoPage';
import MyWithDrawPage from './MyWithDrawPage';
import { useLocation, useNavigate } from 'react-router-dom';
import { SideBar } from '../../components/SideBar';

const AllWidth = styled.div`
  width: 1260px;
  margin: 0 auto;
`;

const Flex = styled.div`
  display: flex;
  margin-bottom: 9rem;
  > div:nth-of-type(2) {
    width: 1020px;
    margin-left: 105px;
    display: flex;
    flex-direction: column;
    gap: 3.3rem;
  }
`;

const MyPage = () => {
  const [activeBtn, setActiveBtn] = useState("대여중");
  const [selectedItem, setSelectedItem] = useState("대여중");
  const myCate = [
    {
      title: "대여 리스트",
      name: ["rental","rentaled"],
      list: ["대여중", "대여 완료"],
    },
    {
      title: "등록 리스트",
      name: ["management","myboard"],
      list: ["등록 상품 관리","등록 게시글"]
    },
    {
      title: "관심 상품",
      name: ["interest"],
      list: ["관심 목록"],
    },
    {
      title: "후기 관리",
      name: ["myreview","prodreview"],
      list: ["내 작성 후기", "내 상품 후기"],
    },
    {
      title: "내역 관리",
      name: ["reservation","report"],
      list: ["예약 내역","신고 내역"]
    },
    {
      title: "내 정보",
      name: ["info","withdraw"],
      list: ["회원정보 수정", "회원탈퇴"],
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();

 useEffect(() => {
    const storedItem = sessionStorage.getItem('selectedItem');
    if (storedItem && storedItem !== selectedItem) {
      setSelectedItem(storedItem);
      setActiveBtn(storedItem);
    } else {
      const params = new URLSearchParams(location.search);
      const item = params.get('item') || selectedItem;
      setSelectedItem(item);
      setActiveBtn(item);
    }
  }, [location.search, selectedItem]);

  const handleSubItemClick = (subItem) => {
    setSelectedItem(subItem);
    setActiveBtn(subItem);
    const selectedCategory = myCate.find(category => category.list.includes(subItem));

    if (selectedCategory) {
      const selectedName = selectedCategory.name.find(name => {
        return (
          (name === 'rental' && subItem === '대여중') ||
          (name === 'rentaled' && subItem === '대여 완료') ||
          (name === 'management' && subItem === '등록 상품 관리') ||
          (name === 'myboard' && subItem === '등록 게시글') ||
          (name === 'interest' && subItem === '관심 목록') ||
          (name === 'myreview' && subItem === '내 작성 후기') ||
          (name === 'prodreview' && subItem === '내 상품 후기') ||
          (name === 'reservation' && subItem === '예약 내역') ||
          (name === 'report' && subItem === '신고 내역') ||
          (name === 'info' && subItem === '회원정보 수정') ||
          (name === 'withdraw' && subItem === '회원탈퇴')
        );
      });
  
      if (selectedName) {
        navigate(`/my?${selectedName}`, { state: { selectedItem: subItem } });
        sessionStorage.setItem('selectedItem', subItem);
      }
    }
  };

  return (
    <Layout>
    <SideBar />
    <AllWidth>
      <div>
        <Mytitle title={"마이 페이지"}/>
      </div>
      <Flex>
        <MyCategory myCate={myCate} selectedItem={selectedItem} onSubItemClick={handleSubItemClick}/>
        <div>
        {activeBtn === "대여중" || activeBtn === "대여 완료" ?  
            ( <MyRentalPage activeBtn={activeBtn} setActiveBtn={setActiveBtn} handleSubItemClick={handleSubItemClick} /> ) : null}
        {activeBtn === "등록 상품 관리" && ( <MyManagementPage activeBtn={activeBtn} setActiveBtn={setActiveBtn} /> )}
        {activeBtn === "등록 게시글" && ( <MyBoardPage activeBtn={activeBtn} setActiveBtn={setActiveBtn} /> )}
        {activeBtn === "관심 목록" && ( <MyInterestPage /> )}
        {activeBtn === "내 작성 후기" || activeBtn === "내 상품 후기" ? 
            ( <MyReviewPage activeBtn={activeBtn} setActiveBtn={setActiveBtn} handleSubItemClick={handleSubItemClick} /> ) : null}
        {activeBtn === "예약 내역" && ( <MyReservationPage activeBtn={activeBtn} setActiveBtn={setActiveBtn} />)} 
        {activeBtn === "신고 내역" && ( <MyReportPage activeBtn={activeBtn} />)} 
        {activeBtn === "회원정보 수정" && ( <MyInfoPage /> )}
        {activeBtn === "회원탈퇴" && ( <MyWithDrawPage /> )}
        </div>
      </Flex>
    </AllWidth>
  </Layout>
  )
}

export default MyPage