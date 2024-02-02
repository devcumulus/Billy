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
  gap: 130px;
  width: 1300px;
`;
export const HeaderLogo = styled.div`
  width: 200px;
  height: 40px;
  background-color: #d9d9d9;
  cursor: pointer;
`;
export const SearchForm = styled.form`
  display: flex;
  width: 640px;
  height: 60px;
  flex-shrink: 0;
  padding-left: 30px;
  padding-right: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 80px;
  border: 1px solid #2c39b5;
`;
export const SearchWord = styled.input`
  display: flex;
  width: 500px;
  height: 50px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  border: none;
  color: rgb(0, 0, 0);
  font-family: Roboto;
  font-size: 30px;
  font-style: normal;
  line-height: 24px; /* 80% */
  letter-spacing: 0.5px;
`;
export const SearchBt = styled.input`
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
  width: 200px;
  height: 20px;
  button {
    width: 100%;
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
