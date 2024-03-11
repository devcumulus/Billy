// 담당자 : 최배근
import React from "react";
import MyProfile from "../../components/my/MyProfile";
import MyManagement from "../../components/my/MyManagement";

const MyManagementPage = ({ activeBtn, setActiveBtn }) => {
  return (
    <>
      <MyProfile />
      <MyManagement activeBtn={activeBtn} setActiveBtn={setActiveBtn} />
    </>
  );
};

export default MyManagementPage;
