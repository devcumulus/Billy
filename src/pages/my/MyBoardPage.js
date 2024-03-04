import React from "react";
import MyProfile from "../../components/my/MyProfile";
import MyBoardList from "../../components/my/MyBoardList";

const MyBoardPage = ({activeBtn, setActiveBtn}) => {
  
  return (
    <>
      <MyProfile />
      <MyBoardList activeBtn={activeBtn} setActiveBtn={setActiveBtn}/>
    </>
  );
};

export default MyBoardPage;
