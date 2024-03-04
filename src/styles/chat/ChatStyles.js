import styled from "@emotion/styled";

export const PageWrapper = styled.div`
  max-width: 1280px;
  height: 630px;
  margin: 0 auto;

  display: flex;
  /* margin-top: 20px; */
`;

export const ChatBox = styled.div`
  width: 630px;

  height: auto;
  max-height: 615px;
  flex-shrink: 0;
  padding-left: 10px;
  padding-right: 5px;
  padding-top: 15px;
  margin-right: 20px;
  border: 1px solid #777;
  overflow: hidden; /* 넘치는 내용 숨김 */
  overflow-y: auto; /* 내용이 넘칠 때 수직 스크롤 표시 */
  position: relative;
`;

export const ChatProfileBox = styled.div`
  width: 600px;
  height: 90px;
  flex-shrink: 0;
  justify-content: flex-end;
  cursor: pointer; /* 클릭 가능하도록 커서 스타일 지정 */
  pointer-events: auto; /* 클릭 이벤트 활성화 */
`;

export const ChatBtn = styled.img`
  font-size: 14px;
  position: absolute;
  cursor: pointer; /* 클릭 가능하도록 커서 스타일 지정 */
  pointer-events: auto; /* 클릭 이벤트 활성화 */
  right: 0; /* 오른쪽 끝으로 이동 */
  width: 5%;
  top: 10px;
  margin-right: 20px;
`;

export const ChatList = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 45px;
`;

export const ProductContentWrapper = styled.div`
  display: flex;
  align-items: baseline; /* 제품명과 날짜를 수평 정렬하기 위해 추가 */
`;

export const ProductContent = styled.div`
  width: 380px;

  overflow: hidden;
  text-overflow: ellipsis;
  color: #777;
  font-size: 13px;
  font-weight: 400;
  margin-left: 82px;
  margin-top: 20px;
  line-height: 15px; /* Match with height for accurate calculation */
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Show up to 3 lines */
  -webkit-box-orient: vertical;
`;

export const CurrentDate = styled.div`
  width: 80px;
  height: 15px;
  color: #777;
  font-size: 13px;
  font-weight: 400;
  margin-left: 40px;
`;

export const ChatBoxWrapper = styled.div``;

export const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end; // 새로운 메시지가 항상 하단에 위치하도록 설정합니다.

  flex: 1;
  overflow-y: auto; // 세로 스크롤이 필요할 경우 스크롤이 표시됩니다.
`;

export const ChatBoxContent = styled.div`

  /* width: 600px; */

  max-width: 100%;
  max-height: 550px;
  height: auto;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 5;
  min-height: 0; /* 컨테이너의 최소 높이를 0으로 설정합니다. */
`;

export const NoChatSelectedMessage = styled.p`
  font-size: 16px;
  text-align: center;
  width: 600px;
`;

export const ChatInput = styled.input`
  width: 600px;
  max-width: 100%; /* 최대 너비 설정 */
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  background: #f2f2ff;
  padding-left: 10px;


`;

export const ProfileInfoContainer = styled.div`
  display: inline-block;
  margin-left: 10px;

`;

export const ChatText = styled.div`
  max-height: 450px;
  min-height: 455px;

  margin-bottom: 5px;
  overflow-y: auto;
  overflow-x: hidden;

  padding-right: 10px;

`;

export const ProfileName = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
`;

export const ChatMessage = styled.div`
  background-color: #e5e5fe;
  display: inline-block;
  border-radius: 10px;

  padding: 10px;
  margin-bottom: 10px;
  font-size: 13px;
  text-align: right;
`;

export const ChatMessageWrapper = styled.div`
  clear: both; /* 새로운 줄로 메시지를 배치합니다. */
  overflow: hidden; /* 부모 요소의 높이를 계산하기 위해 사용됩니다. */
  text-align: right;
  padding-right: 5px;
`;
