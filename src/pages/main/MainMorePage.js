import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLoginMoreProduct, getMoreProduct, getProdListCount } from "../../api/main/mainMore_api";
import { SideBar } from "../../components/SideBar";
import Like from "../../components/details/Like";
import JoinPopUp, {
  ModalBackground,
} from "../../components/joinpopup/JoinPopUp";
import useCustomLogin from "../../hooks/useCustomLogin";
import Layout from "../../layouts/Layout";
import { PaginationBlue } from "../../styles/free/FreePageStyle";
import { MoreWrap } from "../../styles/main/mainMoreStyle";

const region = [
  {
    title: "대구광역시",
    list: [
      "전체",
      "달서구",
      "중구",
      "동구",
      "서구",
      "남구",
      "북구",
      "수성구",
      "달성군",
    ],
  },
  {
    title: "서울특별시",
    list: [
      "전체",
      "종로구",
      "중구",
      "용산구",
      "성동구",
      "광진구",
      "동대문구",
      "중랑구",
      "성북구",
      "강북구",
      "도봉구",
      "노원구",
      "은평구",
      "서대문구",
      "마포구",
      "양천구",
      "강서구",
      "구로구",
      "금천구",
      "영등포구",
      "동작구",
      "관악구",
      "서초구",
      "강남구",
      "송파구",
      "강동구",
    ],
  },
  {
    title: "부산광역시",
    list: [
      "전체",
      "중구",
      "서구",
      "동구",
      "영도구",
      "부산진구",
      "동래구",
      "남구",
      "북구",
      "해운대구",
      "사하구",
      "금정구",
      "강서구",
      "연제구",
      "수영구",
      "사상구",
      "기장군",
    ],
  },
  {
    title: "인천광역시",
    list: [
      "전체",
      "중구",
      "동구",
      "미추홀구",
      "연수구",
      "남동구",
      "부평구",
      "계양구",
      "서구",
    ],
  },
  {
    title: "광주광역시",
    list: ["전체", "동구", "서구", "남구", "북구", "광산구"],
  },
  {
    title: "대전광역시",
    list: ["전체", "동구", "중구", "서구", "유성구", "대덕구"],
  },
  {
    title: "울산광역시",
    list: ["전체", "중구", "남구", "동구", "북구"],
  },
];

const MainMorePage = () => {
  const navigate = useNavigate(`/details/`); // useNavigate 훅을 사용하여 navigate 함수 가져오기
  
  const { isLogin } = useCustomLogin();
  const [loginState, setLoginState] = useState(false);
  
  const location = useLocation();
  const { pathname, state } = location;
  const { title } = location.state || {};
  // const urlParseArr = pathname.split("/");
  // const parseMainCategory = parseInt(urlParseArr[3]);
  // const parseSubCategory = parseInt(urlParseArr[4]);
  const searchValue = sessionStorage.getItem("searchValue");
  const searchParams = new URLSearchParams(location.search);
  const parseMainCategory = parseInt(searchParams.get("mc"));
  const parseSubCategory = parseInt(searchParams.get("sc"));

  const [addr, setAddr] = useState("");
  const [totalPage, setTotalPage] = useState(null);

  

  // 페이지 번호
  const [pageNum, setPageNum] = useState(1);
  const [sortType, setSortType] = useState(0);
  // 전지역 데이터
  const [datas, setDatas] = useState([]);
  // 지역별 시, 구 분류 데이터
  const [filterData, setFilterData] = useState([]);
  // 지역 선택 관리
  const [regionNum, setRegionNum] = useState(null);
  const [districtNum, setDistrictNum] = useState(null);

  const fetchData = async (pageNum, _sortType) => {
    try {
      let res = await getMoreProduct(pageNum,parseMainCategory,parseSubCategory,_sortType);
      if(isLogin) {
        res = await getLoginMoreProduct(pageNum,parseMainCategory,parseSubCategory,_sortType);
      }
      console.log(isLogin)
      setDatas(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegionChange = e => {
    if (e.target.value === "전체") {
      setRegionNum(null);
    } else {
      const regionIndex = region.findIndex(
        item => item.title === e.target.value,
      );
      setRegionNum(regionIndex);
    }
    setDistrictNum(null);
  };

  const regionFilter = e => {
    const selectedRegion = e.target.value;
    const districtIndex = region[regionNum].list.indexOf(selectedRegion);
    setDistrictNum(districtIndex);
  };

  const handlePageChange = _tempPage => {
    setPageNum(_tempPage);
  };

  const listCountData = async () => {
    await getProdListCount(
      // searchValue,
      parseMainCategory,
      parseSubCategory,
      addr,
      // successFn,
      // errorFn,
      setTotalPage,
    );
  };
  useEffect(() => {
    listCountData();
  }, [parseMainCategory, parseSubCategory, addr]);

 
    // details 페이지로 이동
  const handlePageChangeDetails = async _item => {
    if (isLogin) {
      const url = `/details?mc=${_item.categories.mainCategory}&sc=${_item.categories.subCategory}&productId=${_item.iproduct}`;
      const serverData = {
        mainCategoryId: _item.categories.mainCategory,
        subCategoryId: _item.categories.subCategory,
        iproduct: _item.iproduct,
      };
      // console.log(serverData);
      // const res = getProductDetail(serverData);
      navigate(url);
    } else {
      setLoginState(true);
    }
  };
  const closeModal = () => {
    setLoginState(false);
    navigate(`/login`);
  };

  useEffect(() => {
    if (sortType !== 0) fetchData(pageNum, sortType);
    else fetchData(pageNum);
  }, [pageNum, sortType]);

  useEffect(() => {
    if (regionNum !== null) {
      const regionData = datas.filter(item =>
        item.addr.includes(region[regionNum].title.slice(0, 2)),
      );
      if (districtNum !== null) {
        const districtData = regionData.filter(item =>
          item.addr.includes(` ${region[regionNum].list[districtNum]}`),
        );
        setFilterData(districtData);
      } else {
        setFilterData(regionData);
      }
    } else {
      setFilterData(datas);
    }
  }, [districtNum, datas, regionNum, pageNum]);

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
          <div className="header-cate-wrap">
            <div>{title || "Default Title"}</div>
            <div>{totalPage}개</div>
          </div>
          <div>
            <div className="bt-wrap">
              <div>
                <button onClick={() => setSortType(0)}>최신순</button>
                <img src="/images/main/line.svg" />
                <button onClick={() => setSortType(2)}>조회순</button>
              </div>
            </div>
            <div className="region-wrap">
              <select onChange={handleRegionChange} defaultValue="전체">
                <option>전체</option>
                {region.map((item, index) => {
                  return (
                    <option key={`regionTitle${index}`}>{item.title}</option>
                  );
                })}
              </select>
              <select
                onChange={e => regionFilter(e)}
                value={
                  regionNum !== null && region[regionNum].list[districtNum]
                }
                disabled={regionNum === null}
              >
                {regionNum === null && <option>-</option>}
                {regionNum !== null &&
                  region[regionNum].list.map((item, index) => {
                    return <option key={`regionList${index}`}>{item}</option>;
                  })}
              </select>
            </div>
          </div>
        </div>
        <div className="main-wrap">
          {filterData &&
            filterData.map((item, index) => (
              <div
                className="item-wrap"
                key={`MainMore-item-${index}`}
                onClick={() => handlePageChangeDetails(item)}
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
                  alt="제품 이미지"
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
                  {item.hashTags.slice(0, 3).map((tagData, tagIndex) => (
                        <span key={tagIndex} className="hash-tag">{tagData.tag}</span>
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

export default MainMorePage;
