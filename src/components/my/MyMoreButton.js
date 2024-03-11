// 담당자: 최배근
import styled from '@emotion/styled'
import React from 'react'
import { Common } from '../../styles/CommonStyles'

const MyMoreBtWrap = styled.div`
    display: flex;
    justify-content: center;
`

const MyMoreBtn = styled.button`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 18px;
    background: none;
    border-radius: 3.5rem;
    width: 130px;
    height: 50px;
    color: ${Common.color.primary};
    border: 2px solid ${Common.color.primary};
    img {
        width: 14px;
        height: 20px;
    }
    &:hover {
        color: #fff;
        background-color: ${Common.color.primary};
        img {
            content: url("/images/main/arrow1.svg");
        }
    }
`

const MyMoreButton = ({handleLoadMore}) => {
  return (
    <MyMoreBtWrap>
        <MyMoreBtn onClick={handleLoadMore}>MORE
            <img src='/images/main/arrow.svg' alt=''/>
        </MyMoreBtn>
    </MyMoreBtWrap>
  )
}

export default MyMoreButton