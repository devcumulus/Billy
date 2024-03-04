import styled from '@emotion/styled'
import { Common } from '../CommonStyles';

export const PaginationContainer = styled.div`
    text-align: center;
    margin-top: 20px;
  `;

export const PaginationButton = styled.button`
    padding: 5px 10px;
    font-size: 16px;
    margin-right: 20px;
    border-radius: 3px;
    border: 1px solid #2C39B5;
    background-color: #F2F2FF;
    color: #2C39B5;

    :hover {
      background-color: #E4E7FF;
    }
    &.active {
      font-weight: bold;
      background-color: #2C39B5;
      color: #fff;
    }
  `;
export const TrContaineer = styled.tr`
    :hover {
      background-color: #E4E7FF;
    }
  `

export const DetailsContainer = styled.div`
  display: flex;
  justify-content: ${props => props.content ? props.content : "space-between"};
  gap: 20px;
  height: ${(props) => (props.show ? 'auto' : '0')}; 
  overflow: hidden;
  padding: ${(props) => (props.show ? '10px' : '0 10px')};
  transition: .3s ease-in-out;
  background-color: #F2F2FF;
  color: #2C39B5;
  border-bottom: ${props => (props.show ? `1px solid ${Common.color.primary}` : '0')};
  p {
    width: 780px;
    font-size: 1.6rem;
  }
  button {
    cursor: pointer;
    background: transparent
  }
  div {
    display: flex;
    justify-content: end;
    flex-direction: column;
    span {
      cursor: pointer;
      padding: 0.8rem 2rem;
      background-color: #2C39B5;
      border-radius: 0.5rem;
      border: 0;
      color: #FFF;
      font-size: 1.4rem;
    }
  }
`;

export const EllipsisDiv = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`