import styled from "@emotion/styled";
import { Pagination } from "antd";

export const FreePageStyle = styled.div`
  width: 1260px;
  margin: 0 auto;
`;
export const FreeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #2c39b5;
  padding-bottom: 17px;
  p {
    color: #000;
    font-size: 24px;
    font-weight: 400;
    font-style: normal;
    line-height: normal;
  }
`;
export const SearchSection = styled.div`
  display: flex;
  width: 330px;
  height: 35px;
  border: 1px solid #bebebe;
  select {
    width: 100px;
    border: none;
    border-right: 1px solid #bebebe;
  }
`;
export const FreeSearchForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 230px;
  height: 35px;
  padding: 0 10px;
  /* border: 1px solid #BEBEBE; */
  input {
    border: none;
    width: 180px;
    height: 30px;
    font-size: 16px;
    font-weight: 400;
  }
  button {
    width: 16px;
    height: 16px;
    background-image: url("/images/free/bt_search.svg");
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export const FreeMain = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    height: 50px;
    border-bottom: 1px solid #bebebe;
    text-align: center;
    background: #e4e7ff;
    font-size: 16px;
    font-weight: normal;
  }
  td {
    height: 60px;
    padding: 10px;
    border-bottom: 1px solid #bebebe;
    text-align: center;
    font-size: 14px;
    background: #fff;
    cursor: pointer;
  }
`;

export const SortWrap = styled.div`
  margin-top: 25px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  button {
    border: none;
    background: transparent;
    font-size: 15px;
    color: #777;
    cursor: pointer;
  }
  img {
    width: 2px;
    height: 15px;
  }
`;

export const BtSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  button {
    width: 150px;
    height: 40px;
    background: #2c39b5;
    border: none;

    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
`;

export const PaginationBlue = styled(Pagination)`
  .ant-pagination-item-active {
    border-color: #2c39b5;
    background-color: #2c39b5;
  }
  .ant-pagination-item-active a {
    color: #fff;
  }
  .ant-pagination-item-active:hover {
    border-color: #2c39b5;
    background-color: #2c39b5;
  }
  .ant-pagination-item-active a:hover {
    color: #fff;
  }
  .ant-pagination-options {
    display: none;
  }
`;
