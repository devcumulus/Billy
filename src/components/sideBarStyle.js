import styled from "@emotion/styled";
import { Common } from "../styles/CommonStyles";

export const Wrap = styled.div`
  z-index: 99;
  position: fixed;
  top: 300px;
  right: 50px;
`;

export const SideBarWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70px;
  height: 500px;
  background-color: #eeeef1;
  border-radius: 30px;
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  padding: 10px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p {
      padding-top: 3px;
      font-size: 1.4rem;
      color: ${Common.color.p300};
    }
  }
`;
export const Write = styled.button`
  width: 40px;
  height: 40px;

  background: url("/images/main/plus.svg");

  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`;
export const Chat = styled.button`
  width: 40px;
  height: 40px;

  background: url("/images/main/chat.svg") center;

  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`;

export const Like = styled.button`
  width: 40px;
  height: 40px;

  background: url("/images/main/heart.svg");

  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`;
export const Profile = styled.button`
  width: 40px;
  height: 40px;

  background: url("/images/main/profile.svg");

  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`;
export const Call = styled.button`
  width: 40px;
  height: 40px;

  background: url("/images/main/phone.svg");

  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`;
