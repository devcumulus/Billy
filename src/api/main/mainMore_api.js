import axios from "axios";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { jwtAxios } from "../../util/jwtUtil";
const path = `${SERVER_URL}/api`;

const failPostDatas = () => {
  const navigate = useNavigate();
  navigate("/");
};

// MainMorePage.js
export const getMoreProduct = async (pageNum, categoryId, subCategoryId, sortType) => {
  try {
    let url;
    console.log(pageNum, categoryId, subCategoryId, sortType)
    // api/prod?sort=1&page=1&mc=1&sc=1
    if (sortType) url = `${path}/prod?sort=${sortType}&page=${pageNum}&mc=${categoryId}&sc=${subCategoryId}`;
    else url = `${path}/prod?page=${pageNum}&mc=${categoryId}&sc=${subCategoryId}`;
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};
export const getProdListCount = async (iuser) => {
  {
    try {
      let url;
      console.log(pageNum, categoryId, subCategoryId, sortType)
      
      if (sortType) url = `${path}/prod?sort=${sortType}&page=${pageNum}&mc=${categoryId}&sc=${subCategoryId}`;
      else url = `${path}/prod?page=${pageNum}&mc=${categoryId}&sc=${subCategoryId}`;
      const res = await axios.get(url);
  
      return res.data;
    } catch (error) {
      console.log(error);
      failPostDatas("/");
    }
  }
  };

// MainMoreSearchPage.js
export const getSearchProduct = async (
  search,
  pageNum,
  categoryId,
  subCategoryId,
  sortType,
  addr,
) => {
  try {
    let url;
    console.log(search, pageNum, categoryId, subCategoryId, sortType, addr);
    if (sortType)
      url = `${path}/prod?sort=${sortType}&search=${search}&page=${pageNum}&mc=${categoryId}&sc=${subCategoryId}&addr=${addr}`;
    else
      url = `${path}/prod?search=${search}&page=${pageNum}&mc=${categoryId}&sc=${subCategoryId}&addr=${addr}`;
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.log(error);
    failPostDatas("/");
  }
};