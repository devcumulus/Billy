// 담당자: 사공은진
import React from "react";

import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export const getNum = (value, basic) => {
  if (!value) {
    return basic;
  }
  return value;
};

const useCustomMove = () => {
  const navigate = useNavigate();
  // 쿼리 알아내기
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  // 정렬기준
  const sort = urlSearchParams.get("sort")
    ? parseInt(urlSearchParams.get("sort"))
    : "";

  // 검색어
  const search = urlSearchParams.get("search")
    ? parseInt(urlSearchParams.get("search"))
    : "";

  // 현재 목록의 페이지 번호
  const page = urlSearchParams.get("page")
    ? parseInt(urlSearchParams.get("page"))
    : 1;

  // 메인카테고리
  const mc = urlSearchParams.get("mc")
    ? parseInt(urlSearchParams.get("mc"))
    : "";

  // 서브카테고리
  const sc = urlSearchParams.get("sc")
    ? parseInt(urlSearchParams.get("sc"))
    : "";

  // 쿼리스트링 만들기
  const queryStrDefault = createSearchParams({
    sort,
    search,
    page,
    mc,
    sc,
  }).toString();

  // 목록으로 가기 기능 만들기
  const moveToList = pageParam => {
    let queryStr = "";
    if (pageParam) {
      const sortNum = getNum(pageParam.sort, sort);
      const searchStr = getNum(pageParam.search, search);
      const pageNum = getNum(pageParam.page, page);
      const mcNum = getNum(pageParam.mc, mc);
      const scNum = getNum(pageParam.sc, sc);

      queryStr = createSearchParams({
        sort: sortNum,
        search: searchStr,
        page: pageNum,
        mc: mcNum,
        sc: scNum,
      }).toString();
    } else {
      queryStr = queryStrDefault;
    }
    navigate({ pathname: "../more", search: queryStr });
  };

  // 수정창 이동하기
  const moveToModify = num => {
    navigate({ pathname: `../modify/${num}`, search: queryStrDefault });
  };

  // 상세 내용 보기
  const moveToRead = num => {
    navigate({ pathname: `../details/${num}`, search: queryStrDefault });
  };

  return { moveToList, moveToModify, moveToRead, sort, search, page, mc, sc };
};

export default useCustomMove;
