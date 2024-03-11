import styled from "@emotion/styled";

export const MoreWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;

  .header-wrap {
    width: 1260px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 30px;

    .header-cate-wrap {
      display: flex;
      justify-content: space-between;
      max-width: 100%;
      gap: 10px;
      height: 30px;
      font-size: 20px;
    }
    .bt-wrap {
      display: flex;
      justify-content: flex-end;
      padding-bottom: 20px;
      > div {
        display: flex;
        width: 150px;
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
        width: 2px;
        height: 15px;
      }
      option {
        background-color: #fff;
      }
    }
    .region-wrap {
      width: 310px;
      display: flex;
      justify-content: space-between;
      select {
        width: 150px;
        height: 30px;
        border: 2px solid #2c39b5;
      }
    }
  }

  .main-wrap {
    max-width: 1260px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;

    .desc-wrap {
      line-height: 33px;
      text-align: left;
      .desc-title {
        width: 300px;
        font-size: 15px;
        color: #777;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      hr {
        width: 300px;
        border: 1px solid #2c39b5;
        margin: 0;
      }
      .desc-price {
        font-weight: 500;
        font-size: 20px;
      }
      .ad-view-wrap {
        display: flex;
        justify-content: space-between;
        .desc-ad {
        color: #777;
        font-size: 14px;
      }
      .view {
        color: #777;
        font-size: 12px;
      }
      }
      .hash-tag {
        right: 0;
        color: #2c39b5;
        font-size: 15px;
        font-weight: 400;
      }
    }
  }
  .item-wrap {
    position: relative;
    cursor: pointer;
    .item-image {
      width: 300px;
      height: 300px;
      border: none;
      border-radius: 4px;
    }
    .like-wrap {
      position: absolute;
      margin: 0 auto;
      right: 15px;
      top: 15px;
      button {
        margin: auto;
      }
    }
  }
  .ant-select-show-search {
    display: none;
  }

  .pagination {
    padding-top: 80px;
    padding-bottom: 80px;
  }
`;
