import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { SideBar } from "../../components/SideBar";
import ProductSlide from "../../components/main/ProductSlide";
import Layout from "../../layouts/Layout";
import { MainWrap } from "../../styles/main/mainStyle";
import { getMoreProduct, getProduct, getProductFirst } from "../../api/main/main_api";

const initData = [
  [
    {
      "iuser": 0,
      "nick": "string",
      "userPic": "string",
      "iauth": 0,
      "iproduct": 0,
      "title": "string",
      "prodMainPic": "string",
      "rentalPrice": 0,
      "rentalStartDate": "2024-03-03T06:19:29.673Z",
      "rentalEndDate": "2024-03-03T06:19:29.673Z",
      "addr": "string",
      "restAddr": "string",
      "view": 0,
      "istatus": 0,
      "prodLike": 0,
      "isLiked": 0,
      "categories": {
        "mainCategory": 1,
        "subCategory": 1
      },
      "hashTags": [
        {
          "id": 0,
          "tag": "string"
        }
      ]
    }
  ],
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
  {
    image: "../images/main/camera.jpeg",
    title: "인스탁스 미니12 폴라로이드 즉석 카메라",
    price: "150,000 원",
    address: "대구광역시 달서구 상인동",
    view: 10,
  },
];

const btList = [
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

const sectionTitle = [
  [
    {id: 1, title: "스마트 기기"},
    {desc: "편리함과 혁신이 만나 일상을 더욱 특별하게 만듭니다"},
  ],
  [
    {id: 2, title: "PC / 노트북"},
    {desc: "신속하고 안정적인 성능의 PC 및 노트북으로 일상을 관리하세요"},
  ],
  [
    {id: 3, title: "영상 / 카메라"},
    {desc: "여러분의 순간을 놀라운 품질로 기록하고 공유하세요"},
  ],
  [
    {id: 4, title: "음향"},
    {desc: "탁월한 음질과 혁신적인 기술로 일상을 더욱 특별하게 만나보세요"},
  ],
  [
    {id: 5, title: "게임 기기"},
    {desc: "현존하는 최고의 게임 기기로 새로운 세계를 탐험하세요"},
  ]
  
];

const MainPage = () => {
  const [productData, setProductData] = useState(null);
  console.log(productData)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductFirst(); 
        console.log(res);
        const newData = [...new Array(5)].map((item,index)=>{
          const found = res.filter((element)=> element.categories.mainCategory-1 === index);
          return found
        })
        console.log(newData)
        setProductData(newData); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      <Layout>
        <SideBar />
        <MainWrap>
          {productData && productData.map((item, index) => {
            return (
              <ProductSlide
                id={index+1}
                key={`product${index}`}
                btList={btList[index]}
                data={item}
                title={sectionTitle[index][0].title}
                desc={sectionTitle[index][1].desc}
              />
            );
          })}
        </MainWrap>
      </Layout>
    </>
  );
};

export default MainPage;