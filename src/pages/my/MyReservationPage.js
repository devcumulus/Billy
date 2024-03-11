// 담당자: 최배근
import React from "react";
import MyReservationList from "../../components/my/reservation/MyReservationList";

const MyReservationPage = ({activeBtn, setActiveBtn}) => {
  
  return (
    <>
      <MyReservationList activeBtn={activeBtn} setActiveBtn={setActiveBtn}/>
    </>
  );
};

export default MyReservationPage;