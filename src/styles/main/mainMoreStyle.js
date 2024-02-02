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
    /* background-color: lightblue; */
    padding-bottom: 30px;
    

  .header-cate-wrap {
    display: flex;
    justify-content: space-between;
    width: 150px;
    height: 30px;
    /* max-width: 1260px; */
    /* padding-bottom: 80px; */
    font-size: 20px;
    /* background: lightgray; */
  }
  .bt-wrap {
    /* width: 200px; */
    display: flex;
    justify-content: flex-end;
    /* background: lightcoral; */
    padding-bottom: 20px;
    >div{
      display: flex;
      width: 150px;
      justify-content: space-evenly;
      /* background: gold; */
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
      /* background: lightgreen; */
      select {
        width: 150px;
        height: 30px;
        border: 2px solid #2c39b5;
        /* background: #2c39b5; */
      }
    }
}


  .main-wrap {
    max-width: 1260px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 30px;

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
      .desc-ad {
        color: #777;
        font-size: 14px;
      }
      .view {
        color: #777;
        font-size: 12px;
      }
    }
  }
  .item-wrap {
    position: relative;
    img {
      width: 100%;
      border: none;
      border-radius: 4px;
    }
    .like {
      position: absolute;
      border: none;
      top: 10px;
      right: 10px;
      z-index: 1;
      width: 30px;
      height: 30px;
      background-repeat: no-repeat;
      button {
        border: none;
        background: transparent;
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