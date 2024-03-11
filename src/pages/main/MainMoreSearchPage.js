import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SideBar } from "../../components/SideBar";
import { MoreWrap } from "../../styles/main/mainMoreStyle";
import { Pagination } from "antd";
import Layout from "../../layouts/Layout";
import {
  getCountSearchProduct,
  getSearchProduct,
} from "../../api/main/mainMore_api";
import Like from "../../components/details/Like";
import useCustomLogin from "../../hooks/useCustomLogin";
import JoinPopUp, {
  ModalBackground,
} from "../../components/joinpopup/JoinPopUp";
import { PaginationBlue } from "../../styles/free/FreePageStyle";

const region = [
  {
    id: 1,
    title: "대구",
  },
  {
    id: 2,
    title: "서울",
  },
  {
    id: 3,
    title: "부산",
  },
  {
    id: 4,
    title: "인천",
  },
  {
    id: 5,
    title: "광주",
  },
  {
    id: 6,
    title: "대전",
  },
  {
    id: 7,
    title: "울산",
  },
];
const district = [
  [
    { id: 1, title: "달서구" },
    { id: 2, title: "중구" },
    { id: 3, title: "동구" },
    { id: 4, title: "서구" },
    { id: 5, title: "북구" },
    { id: 6, title: "수성구" },
    { id: 7, title: "달성군" },
  ],
  [
    { id: 1, title: "종로구" },
    { id: 2, title: "중구" },
    { id: 3, title: "용산구" },
    { id: 4, title: "성동구" },
    { id: 5, title: "광진구" },
    { id: 6, title: "동대문구" },
    { id: 7, title: "중랑구" },
    { id: 8, title: "성북구" },
    { id: 9, title: "강북구" },
    { id: 10, title: "도봉구" },
    { id: 11, title: "노원구" },
    { id: 12, title: "은평구" },
    { id: 13, title: "서대문구" },
    { id: 14, title: "마포구" },
    { id: 15, title: "양천구" },
    { id: 16, title: "강서구" },
    { id: 17, title: "구로구" },
    { id: 18, title: "금천구" },
    { id: 19, title: "영등포구" },
    { id: 20, title: "동작구" },
    { id: 21, title: "관약구" },
    { id: 22, title: "서초구" },
    { id: 23, title: "강남구" },
    { id: 24, title: "송파구" },
    { id: 25, title: "강동구" },
    { id: 26, title: "강남구" },
  ],
  [
    { id: 1, title: "중구" },
    { id: 2, title: "서구" },
    { id: 3, title: "동구" },
    { id: 4, title: "영도구" },
    { id: 5, title: "부산진구" },
    { id: 6, title: "동래구" },
    { id: 7, title: "남구" },
    { id: 8, title: "북구" },
    { id: 9, title: "해운대구" },
    { id: 10, title: "사하구" },
    { id: 11, title: "금정구" },
    { id: 12, title: "강서구" },
    { id: 13, title: "연제구" },
    { id: 14, title: "수영구" },
    { id: 15, title: "사상구" },
    { id: 16, title: "기장군" },
  ],
  [
    { id: 1, title: "중구" },
    { id: 2, title: "동구" },
    { id: 3, title: "미추홀구" },
    { id: 4, title: "연수구" },
    { id: 5, title: "남동구" },
    { id: 6, title: "부평구" },
    { id: 7, title: "계양구" },
    { id: 8, title: "서구" },
  ],
  [
    { id: 1, title: "동구" },
    { id: 2, title: "서구" },
    { id: 3, title: "남구" },
    { id: 4, title: "북구" },
    { id: 5, title: "광산구" },
  ],
  [
    { id: 1, title: "동구" },
    { id: 2, title: "서구" },
    { id: 3, title: "중구" },
    { id: 4, title: "유성구" },
    { id: 5, title: "대덕구" },
  ],
  [
    { id: 1, title: "중구" },
    { id: 2, title: "남구" },
    { id: 3, title: "동구" },
    { id: 4, title: "북구" },
  ],
];

const MainMoreSearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const searchValue = sessionStorage.getItem("searchValue");
  const searchParams = new URLSearchParams(location.search);
  const parseMainCategory = parseInt(searchParams.get("mc"));
  const parseSubCategory = parseInt(searchParams.get("sc"));

  // 데이터 연동(목록 불러오기)
  const fetchData = async (pageNum, _sortType, _addr) => {
    try {
      const res = await getSearchProduct(
        searchValue,
        pageNum,
        parseMainCategory,
        parseSubCategory,
        _sortType,
        _addr,
      );
      setDatas(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const [datas, setDatas] = useState(state.result);

  // 지역 카테고리 선택
  const [regionValue, setRegionValue] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState([
    { id: 0, title: "전체" },
  ]);

  const handleRegionChange = e => {
    const selectedRegionValueId = parseInt(e.target.value);
    const selectedOption = region.find(
      item => item.id === selectedRegionValueId,
    );
    setRegionValue(selectedOption ? selectedOption.title : "");
    if (selectedOption) {
      const selectedDistrictValueId = selectedRegionValueId - 1;
      const selectedDistrictValue = district[selectedDistrictValueId];
      setSelectedDistrict(selectedDistrictValue);
    }
  };

  const [districtValue, setDistrictValue] = useState("");
  const handleDistrictChange = e => {
    const selectedRegionValueId = parseInt(e.target.value);
    const selectedOption = selectedDistrict.find(
      item => item.id === selectedRegionValueId,
    );
    setDistrictValue(selectedOption ? selectedOption.title : "");
  };

  const [addr, setAddr] = useState("");
  useEffect(() => {
    if (!regionValue && !districtValue) {
      setAddr(null);
    }
    if (regionValue && !districtValue) {
      setAddr(regionValue);
    }
    if (regionValue && districtValue) {
      setAddr(`${regionValue}_${districtValue}`);
    }
  }, [regionValue, districtValue]);

  console.log(addr);

  // 데이터연동(페이지네이션)
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(null);

  const handlePageChange = _tempPage => {
    setPageNum(_tempPage);
  };

  const listCountData = async () => {
    await getCountSearchProduct(
      searchValue,
      parseMainCategory,
      parseSubCategory,
      addr,
      setTotalPage,
    );
  };
  useEffect(() => {
    listCountData();
  }, [searchValue, parseMainCategory, parseSubCategory, addr]);

  // 정렬
  const [sortType, setSortType] = useState(null);

  useEffect(() => {
    if (!sortType && !addr) fetchData(pageNum, null, null);
    if (!sortType && addr) fetchData(pageNum, null, addr);
    if (sortType && !addr) fetchData(pageNum, sortType, null);
    if (sortType && addr) fetchData(pageNum, sortType, addr);
  }, [pageNum, sortType, addr]);

  // useEffect(() => {
  //   const regionData = datas.filter(item =>
  //     item.addr.includes(region[regionNum].title.slice(0, 2)),
  //   );
  //   const districtData = regionData.filter(item =>
  //     item.addr.includes(region[regionNum].list[districtNum]),
  //   );
  //   setFilterData(districtData);
  // }, [districtNum, datas, regionNum]);

  // details 페이지로 이동
  const { isLogin } = useCustomLogin();
  const [loginState, setLoginState] = useState(false);

  const handlePageChangeDetails = async _item => {
    if (isLogin) {
      const url = `/details?mc=${_item.categories.mainCategory}&sc=${_item.categories.subCategory}&productId=${_item.iproduct}`;
      navigate(url);
    } else {
      setLoginState(true);
    }
  };
  const closeModal = () => {
    setLoginState(false);
    navigate(`/login`);
  };

  return (
    <Layout>
      {loginState && (
        <>
          <JoinPopUp txt="로그인 후 이용해주세요." onConfirm={closeModal} />
          <ModalBackground></ModalBackground>
        </>
      )}
      <SideBar />
      <MoreWrap>
        <div className="header-wrap">
          <div className="header-cate-wrap" style={{ flexDirection: "column" }}>
            <div>검색어 : {searchValue}</div>
            <div>{totalPage}개</div>
          </div>
          <div>
            <div className="bt-wrap">
              <div>
                <button
                  onClick={() => setSortType(0)}
                  style={{
                    fontWeight: sortType === 0 ? "bold" : "normal",
                    color: sortType === 0 ? "#2c39b5" : "",
                  }}
                >
                  최신순
                </button>
                <img src="/images/main/line.svg" />
                <button
                  onClick={() => setSortType(2)}
                  style={{
                    fontWeight: sortType === 2 ? "bold" : "normal",
                    color: sortType === 2 ? "#2c39b5" : "",
                  }}
                >
                  조회순
                </button>
              </div>
            </div>
            <div className="region-wrap">
              <select onChange={handleRegionChange} defaultValue="">
                <option value="" disabled hidden>
                  전체
                </option>
                {region.map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
              <select onChange={handleDistrictChange} defaultValue="">
                <option value="" disabled hidden>
                  전체
                </option>
                {selectedDistrict.map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="main-wrap">
          {datas &&
            datas.map((item, index) => (
              <div
                className="item-wrap"
                key={`MainMore-item-${index}`}
                onClick={() => {
                  handlePageChangeDetails(item);
                }}
              >
                <div className="like-wrap">
                  <Like
                    isLiked={item.isLiked !== 0 ? true : false}
                    productId={item.iproduct}
                  />
                </div>
                <img
                  className="item-image"
                  src={`/pic/${item.prodMainPic}`}
                  alt=""
                />

                <div className="desc-wrap">
                  <span className="desc-title">{item.title}</span>
                  <hr />
                  <div className="desc-price">
                    {item.rentalPrice.toLocaleString()}
                  </div>
                  <div className="ad-view-wrap">
                    <div className="desc-ad">{item.addr}</div>
                    <div className="view">조회수{item.view}</div>
                  </div>
                  {item.hashTags.map((tagData, tagIndex) => (
                    <span key={tagIndex} className="hash-tag">
                      {tagData.tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className="pagination">
          <PaginationBlue
            current={pageNum}
            onChange={handlePageChange}
            total={totalPage}
            pageSize={16}
          />
        </div>
      </MoreWrap>
    </Layout>
  );
};

export default MainMoreSearchPage;
