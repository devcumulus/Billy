import React, { useState } from "react";
import axios from "axios";

export const AddressSearch = () => {
  const [query, setQuery] = useState("");
  const [addresses, setAddresses] = useState([]);

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  const searchAddresses = async () => {
    try {
      // 카카오 주소 검색 API 호출
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${query}`,
        {
          headers: {
            Authorization: "ccecf8041c4357d0d19ff3fbbe2bef71", // 발급받은 API 키로 변경
          },
        },
      );

      // 결과를 상태에 저장
      setAddresses(response.data.documents);
    } catch (error) {
      console.error("주소 검색 에러:", error);
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} />
      <button onClick={searchAddresses}>주소 검색</button>

      <ul>
        {addresses.map(address => (
          <li key={address.address_name}>{address.address_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddressSearch;
