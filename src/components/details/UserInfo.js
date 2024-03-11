// 담당자: 박준서
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMyUser } from "../../api/my/my_api";

const UserInfoRetrieval = ({ iuser, setData, setNickname, setAddress }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMyUser(iuser);
        setData(result);
        setNickname(result.nick);
        setAddress(result.addr);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [iuser, setData, setNickname, setAddress]);

  return null;
};

const UserInfo = () => {
  const [data, setData] = useState([]);
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const iuser = useSelector(state => state.loginSlice.iuser);

  return (
    <>
      <UserInfoRetrieval
        iuser={iuser}
        setData={setData}
        setNickname={setNickname}
        setAddress={setAddress}
      />
    </>
  );
};

export default UserInfo;
