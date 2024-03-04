import styled from "@emotion/styled";
export const BoardWrap = styled.div`
  text-align: center;
  .move,
  .delete {
    width: 60px;
    height: 30px;
    font-weight: bold;
    color: #79747e;
    background: #fff;
    border: 1px solid #79747e;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #b6000b;
      border: 2px solid #b6000b;
    }
  }
  .board-data {
    > td {
      padding: 15px 0;
    }
  }
`;

export const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  top: 50px;
  padding-top: 20px;
  padding-bottom: 30px;

  .header-title {
    display: flex;
  }
  .title {
    font-size: 24px;
  }
  .total {
    font-size: 19px;
    padding-top: 5px;
    padding-left: 10px;
  }
  .search-wrap {
    margin-left: 350px;
      position: relative;
      display: flex;
      select {
        width: 100px;
        height: 40px;
        border: 1px solid #bebebe;
        border-radius: 5px;
      }
      input {
        width: 300px;
        height: 40px;
        border: 1px solid #bebebe;
        border-radius: 5px;
        padding-left: 15px;
        color: #000;
        font-size: 16px;
        ::placeholder {
          color: #bebebe;
          letter-spacing: 1.5px;
        }
      }
      button {
        position: absolute;
        padding-right: 10px;
        top: 10px;
        right: 0;
        background: transparent;
        border: none;
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
        }
      }
      select {
        font-size: 16px;
        color: #777;
        padding-left: 10px;
      }
    }
  .bt-wrap {
    display: flex;
    margin-top: 8px;
    > div {
      display: flex;
      width: 120px;
      justify-content: space-evenly;
    }
    button {
      border: none;
      background: transparent;
      font-size: 15px;
      color: #777;
      cursor: pointer;
    }
    img {
      width: 10px;
      height: 20px;
      margin-top: 5px;
    }
  }
`;

export const Modal = styled.div`
  top: 0;
  display: flex;
  justify-content: center;
  text-align: center;
  border: 2px solid #777;
  border-radius: 20px;
  width: 500px;
  height: 600px;
  .close-modal {
    width: 60px;
    height: 30px;
    font-size: 15px;
    border-radius: 5px;
    background-color: #c14b45;
    display: flex;
    justify-content: center;
  }
`;
