import React from 'react'
import { MoreBt, MoreBtWrap } from './mainStyle'
import MainMore from './MainMore'



const MoreButton = (e) => {
  const handleClick = e => { MainMore }
  return (
    <MoreBtWrap>
        <MoreBt onClick={() => handleClick(e)}>MORE
            <img src='../images/arrow.svg' alt=''/>
        </MoreBt>
    </MoreBtWrap>
  )
}

export default MoreButton