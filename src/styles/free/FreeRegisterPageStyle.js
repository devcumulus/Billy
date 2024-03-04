import styled from "@emotion/styled";

export const FreeRegisterPageStyle = styled.div`
  width: 1260px;
  margin: 0 auto;
`;
export const GoToListBt = styled.button`
  width: 94px;
  height: 30px;
  background-image: url("/images/free/goToList.svg");
  border: none;
  cursor: pointer;
`;
export const FreeRegisterMain = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1260px;
    height: 50px;
    border: 1px solid #d9d9d9;
    margin-bottom: 30px;
    padding-left: 10px;
    padding-right: 10px;
    input {
      display: flex;
      width: 1200px;
      height: 40px;
      border: none;

      color: #000;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    button {
      width: 28px;
      height: 28px;
      border-radius: 100%;
      background-color: transparent;
      flex-shrink: 0;
      border: none;
      background-image: url("/images/free/bt_cancel.svg");
      cursor: pointer;
    }
  }

  textarea {
    resize: none;
    width: 1260px;
    height: 500px;
    border: 1px solid #d9d9d9;
    padding: 10px;
    margin-bottom: 40px;

    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
export const PhotoBt = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  margin-bottom: 20px;
  border-bottom: 1px solid #d9d9d9;
  p {
    color: #777;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  button {
    padding: 5px;
    background: transparent;
    border: 1px solid #000;
    border-radius: 5px;
    font-size: 15px;
    cursor: pointer;
  }
`;
export const ImageMap = styled.div`
  display: flex;
  justify-content: start;
  gap: 30px;
  img {
    width: 400px;
    height: 400px;
    cursor: pointer;
  }
`;
