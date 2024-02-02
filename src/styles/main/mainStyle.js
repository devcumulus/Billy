import styled from "@emotion/styled";

export const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 100px;
  width: 1260px;
  margin: 0 auto;
  gap: 130px;
  .title {
    font-size: 45px;
    text-align: center;
  }
  .desc {
    padding-top: 20px;
    font-size: 16px;
    text-align: center;
  }
  img {
    width: 300px;
    height: 300px;
    border: none;
    border-radius: 5px;
  }
  .mySwiper {
    top: 40px;
    width: 1260px;
    .like {
      position: absolute;
      border: none;
      right: 15px;
      top: 10px;
      z-index: 1;
      width: 30px;
      height: 30px;
      background-repeat: no-repeat;
    /* &:hover {
      background-image: url("../images/main/like_full.svg");
      cursor: pointer;
    } */
    button {
      width: 30px;
      height: 30px;
      border: none;
      background: transparent;
    }
    img {
      width: 30px;
      height: 30px;
    }
    }
    .desc-wrap {
      line-height: 30px;
      text-align: left;
      .desc-title {
        font-size: 15px;
        color: #777;
      }
      hr {
        width: 280px;
        /* background-color: #2C39B5; */
        border: 1px solid #2c39b5;
        margin: 0;
      }
      .desc-price {
        font-weight: 500;
        font-size: 20px;
      }
      .desc-address {
        color: #777;
        font-size: 14px;
      }
      .view {
        color: #777;
        font-size: 12px;
      }
    }
  }
  .section-2,
  .section-3,
  .section-4 {
    gap: 300px;
  }
`;
export const BtWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding-top: 40px;

  button {
    font-size: 16px;
    width: 110px;
    height: 50px;
    border: 1px solid #777;
    border-radius: 25px;
    background: #fff;
    cursor: pointer;
    /* &:hover {
      color: #fff;
    background-color: #2c39b5;
    border: 3px solid #2c39b5;
    } */
    &.focus {
      color: #fff;
      background-color: #2c39b5;
      border: #2c39b5;
    }
  }
`;
export const MoreBtWrap = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
`;
export const MoreBt = styled.button`
  top: 100px;
  padding-top: 20px;
  display: flex;
  justify-content: space-evenly;
  border: 3px solid #2c39b5;
  border-radius: 35px;
  color: #2c39b5;
  background-color: #fff;
  font-size: 22px;
  width: 200px;
  height: 70px;
  cursor: pointer;

  img {
    width: 22px;
    height: 22px;
  }
  &:hover {
    color: #fff;
    background-color: #2c39b5;
    border: 3px solid #2c39b5;
    /* display: flex;
            justify-content: space-evenly;
            text-align: center; */
  }
  &:hover img {
    content: url("../images/main/arrow1.svg");
  }

  `;

export const Pagination = styled.div`
  color: #2c39b5;
`