import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MoreBt, MoreBtWrap } from '../../styles/main/mainStyle';
import { getMoreProduct } from '../../api/main/mainMore_api';


const MoreButton = ({categoryId}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
  navigate(`/main/more/${categoryId}`)
}
console.log(categoryId)
const [moreProductData, setMoreProductData] = useState([]); // 상품 데이터 상태 추가


  return (
    
    <MoreBtWrap>
        <MoreBt onClick={handleClick}>MORE
            <img src='/images/main/arrow.svg' alt=''/>
        </MoreBt>
    </MoreBtWrap>
  )
}

export default MoreButton