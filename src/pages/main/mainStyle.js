import styled from "@emotion/styled";

export const MainWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;  
    width: 1260px;
    margin: 0 auto;
    gap: 130px;
    .section-1 {
    }

    .title {
        font-size: 45px;
        text-align: center;
    }
    .desc {
        padding-top: 20px;
        font-size: 16px;
        text-align: center;
    }
    img {
        width: 300px;
        height: 300px;
        border: none;
        border-radius: 5px;
    }
    .mySwiper {
        top: 40px;
        width: 1260px;
    .desc-wrap {
        line-height: 30px;
        text-align: left;
        .desc-title{
            font-size: 15px;
            color: #777;
        }
        hr {
            width: 280px;
            /* background-color: #2C39B5; */
            border: 1px solid #2C39B5;
            margin: 0;
        }
        .desc-price {
            font-weight: 500;
            font-size: 20px;
        }
        .desc-ad {
            color: #777;
            font-size: 14px;
        }
        .view {
            color: #777;
            font-size: 12px ;
        }
    }
    }    
    .section-2, .section-3, .section-4{
        gap: 1000px;
        
    }
`
export const BtWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding-top: 40px;
    
    button {
        font-size: 16px;
        width: 110px;
        height: 50px;
        border: 1px solid #777;
        border-radius: 25px;
        background: #fff;
        &.focus {
            color: #fff;
            background-color: #2C39B5;
            border: #2C39B5;
        }
    }
`
export const MoreBtWrap = styled.div`
    padding-top: 100px;
    display: flex;
    justify-content: center;
`
export const MoreBt = styled.button`
    top: 100px;
    padding-top: 20px;
    display: flex;
    justify-content: space-evenly;
    border: 3px solid #2C39B5;
    border-radius: 35px;
    color: #2C39B5;
    background-color: #fff;
    font-size: 22px;
    width: 200px;
    height: 70px;
    cursor: pointer;

    img {
        width: 22px;
        height: 22px;
    }
    &:hover{
            color: #fff;
            background-color: #2C39B5;
            border: 3px solid #2C39B5;
            /* display: flex;
            justify-content: space-evenly;
            text-align: center; */
        }
        &:hover img {
            content: url("../images/arrow1.svg");
            
        }    
`
