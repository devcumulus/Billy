// 담당자: 최배근
import React from "react";
import MyProfile from "../../components/my/MyProfile";
import MyListBtn from "../../components/my/MyListBtn";
import MyList from "../../components/my/MyList";

const MyRentalPage = ({activeBtn, setActiveBtn, handleSubItemClick}) => {
  
  return (
    <>
      <MyProfile />
      <MyListBtn 
      activeBtn={activeBtn} 
      setActiveBtn={setActiveBtn} 
      onButtonClick={handleSubItemClick} />
      <MyList activeBtn={activeBtn} setActiveBtn={setActiveBtn}/>
    </>
  );
};

export default MyRentalPage;
