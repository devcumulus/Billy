import styled from "@emotion/styled";
// 헤더
export const HeaderStyle = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  width: 100vw;
  text-align: center;
  padding-bottom: 15px;
  height: 155px;
`;
export const HeaderTop = styled.div`
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1300px;
`;
export const HeaderLogo = styled.img`
  width: 90px;
  height: 60px;
  background-color: transparent;
  cursor: pointer;
`;
export const SearchForm = styled.div`
  display: flex;
  position: relative;
  width: 640px;
  height: 60px;
  align-items: center;
  border-radius: 80px;
  border: 1px solid #2c39b5;
  input {
    width: 350px;
    height: 58px;
    padding-left: 20px;
  }
  input:hover {
    width: 350px;
    background-color: #eee;
    border-radius: 45px;
  }
  select {
    width: 120px;
    height: 22px;
    font-size: 12px;
    border: 1px solid #2c39b5;
  }
`;

export const SearchDiv = styled.div`
    width: 290px;
    height: 58px;
    :hover {
      background-color: #eee;
      border-radius: 45px;
    }
    b {
    display: flex;
    height: 50%;
    font-size: 16px;
    color: #777;
    font-weight: 400;
    padding-top: 10px;
    padding-left: 25px;
    }
    >div {
      display: flex;
      align-items: center;
      gap: 5px;
      height: 50%;
      padding-left: 25px;
      p {
        display: block;
        content: "";
        width: 1px;
        height: 10px;
        background: #2c39b5;
      }
      span {
        line-height: 1.6;
        font-size: 12px;
        cursor: pointer;
      }
    }
`

export const SearchWord = styled.input`
  display: flex;
  width: 350px;
  height: 60px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  border: none;
  background-color: transparent;
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-style: normal;
  line-height: 24px; /* 80% */
  letter-spacing: 0.5px;
`;
export const SearchDivisionLine = styled.div`
width: 1px;
height: 26px;
background: #eee;
`;
export const SearchBt = styled.button`
  position: absolute;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  flex-shrink: 0;
  border: none;
  background-image: url("/images/header/bt_search.svg");
  cursor: pointer;
`;
export const LoginState = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  height: 20px;
  justify-content: space-between;
  button {
    width: 80px;
    background: transparent;
    border: none;
    color: #777;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    cursor: pointer;
  }
`;
export const HeaderMenu = styled.div`
  margin: 0 auto;
  width: 1300px;
  display: flex;
  gap: 40px;
  ul {
    gap: 40px;
    display: flex;
    list-style: none;
  }
  li {
    color: #4b4b4b;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
`;
export const HeaderMainMenu = styled.div`
  display: block;
  width: 35px;
  height: 35px;
  img {
    padding: 7px;
    cursor: pointer;
  }
`;

// 카테고리 메뉴창
export const CategoryTab = styled.div`
  display: flex;
  gap: 5px;
`;
export const MainCate = styled.div`
  width: 100px;
`;
export const MainCateTitle = styled.li`
  height: 30px;
  width: 85px;
  margin: 0 auto 5px;
  padding-top: 6px;
  cursor: pointer;
`;
export const SubCate = styled.div`
  display: block;
  border: 1px solid #2c39b5;
  width: 100px;
  padding-top: 10px;
  background: #fff;
  li {
    margin-bottom: 10px;
    padding: 7px 0;
    color: #777;
    cursor: pointer;
  }
`;

export const CateHover = styled.div`
  display: block;
  position: absolute;
  top: 70px;
  right: 20px;
  border: 1px solid #2c39b5;
  width: 245px;
  height: 90px; 
  padding: 15px;
  background: #fff;
  div {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    h1 {
      font-size: 12px;
      font-weight: 400;
      color: #777;
    }
  }
`
