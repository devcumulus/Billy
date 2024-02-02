import React, { useEffect, useState } from "react";
import "swiper/css";
import { SideBar } from "../../components/SideBar";
import ProductSlide from "../../components/main/ProductSlide";
import Layout from "../../layouts/Layout";
import { MainWrap } from "../../styles/main/mainStyle";
import { getMoreProduct, getProduct } from "../../api/main/main_api";

const initData = [
  // {
  //   image: "../images/main/camera.jpeg",
  //   title: "인스탁스 미니12 폴라로이드 즉석 카메라",
  //   price: "150,000 원",
  //   address: "대구광역시 달서구 상인동",
  //   view: 10,
  // },
  // {
  //   image: "../images/main/camera.jpeg",
  //   title: "인스탁스 미니12 폴라로이드 즉석 카메라",
  //   price: "150,000 원",
  //   address: "대구광역시 달서구 상인동",
  //   view: 10,
  // },
  // {
  //   image: "../images/main/camera.jpeg",
  //   title: "인스탁스 미니12 폴라로이드 즉석 카메라",
  //   price: "150,000 원",
  //   address: "대구광역시 달서구 상인동",
  //   view: 10,
  // },
  // {
  //   image: "../images/main/camera.jpeg",
  //   title: "인스탁스 미니12 폴라로이드 즉석 카메라",
  //   price: "150,000 원",
  //   address: "대구광역시 달서구 상인동",
  //   view: 10,
  // },
  // {
  //   image: "../images/main/camera.jpeg",
  //   title: "인스탁스 미니12 폴라로이드 즉석 카메라",
  //   price: "150,000 원",
  //   address: "대구광역시 달서구 상인동",
  //   view: 10,
  // },
  // {
  //   image: "../images/main/camera.jpeg",
  //   title: "인스탁스 미니12 폴라로이드 즉석 카메라",
  //   price: "150,000 원",
  //   address: "대구광역시 달서구 상인동",
  //   view: 10,
  // },
  // {
  //   image: "../images/main/camera.jpeg",
  //   title: "인스탁스 미니12 폴라로이드 즉석 카메라",
  //   price: "150,000 원",
  //   address: "대구광역시 달서구 상인동",
  //   view: 10,
  // },
];

const btList = [
  [
    { id: 9, title: "빔프로젝터" },
    { id: 10, title: "셋톱박스" },
    { id: 11, title: "카메라" },
    { id: 12, title: "캠코더" },
    { id: 13, title: "DSLR" },
  ],
  [
    { id: 1, title: "스마트 워치" },
    { id: 2, title: "태블릿" },
    { id: 3, title: "갤럭시" },
    { id: 4, title: "아이폰" },
  ],
  [
    { id: 18, title: "플레이스테이션" },
    { id: 19, title: "닌텐도" },
    { id: 20, title: "Wii" },
    { id: 21, title: "XBOX" },
    { id: 22, title: "기타" },
  ],
  [
    { id: 5, title: "노트북" },
    { id: 6, title: "PC" },
    { id: 7, title: "마우스" },
    { id: 8, title: "키보드" },
  ],
];

const sectionTitle = [
  {
    title: "영상 / 카메라",
    desc: "여러분의 순간을 놀라운 품질로 기록하고 공유하세요",
  },
  {
    title: "스마트 기기",
    desc: "편리함과 혁신이 만나 일상을 더욱 특별하게 만듭니다",
  },
  {
    title: "게임 기기",
    desc: "현존하는 최고의 게임 기기로 새로운 세계를 탐험하세요",
  },
  {
    title: "PC / 노트북",
    desc: "편리함과 혁신이 만나 일상을 더욱 특별하게 만듭니다",
  },
];

const MainPage = () => {
  // const [product, setProduct] = useState(null);

  return (
    <>
      <Layout>
        <SideBar />
        <MainWrap>
        
          {btList.map((item, index) => {
            return (
              <ProductSlide
                id={index}
                key={`product${index}`}
                btList={item}
                data={initData}
                title={sectionTitle[index].title}
                desc={sectionTitle[index].desc}
              />
            );
          })}
        </MainWrap>
      </Layout>
    </>
  );
};

export default MainPage;