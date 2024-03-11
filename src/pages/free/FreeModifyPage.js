// 담당자: 사공은진
import React, { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import {
  FreeRegisterMain,
  FreeRegisterPageStyle,
  GoToListBt,
  ImageMap,
  PhotoBt,
} from "../../styles/free/FreeRegisterPageStyle";
import { FreeHeader } from "../../styles/free/FreePageStyle";
import "react-quill/dist/quill.snow.css";
import { BtSection, CancelBt, SaveBt } from "../../styles/join/JoinPageStyle";
import { useNavigate } from "react-router-dom";
import { getFreeData, putFreeData } from "../../api/free/free_api";

const FreeModifyPage = () => {
  // 페이지 이동
  const navigate = useNavigate();
  const MoveToList = () => {
    navigate(`/free`);
  };
  const handleCancel = () => {
    navigate(`/free`);
  };

  // 이미지
  const [image, setImage] = useState([]);
  const [uploadImgFile, setUploadImgFile] = useState(null);

  const handleChangeFile = e => {
    const file = e.target.files[0];
    if (file && image.length < 3) {
      // 미리보기
      const tempUrl = URL.createObjectURL(file);
      // FB 파일을 보관
      setUploadImgFile(file); // 파일 1개 추가 끝
      setImage(prevImages => [...prevImages, tempUrl]);
    }
  };

  // 삭제할 이미지 pk값 저장
  const [ipics, setIpics] = useState([]);

  const removeImgList = _index => {
    const removedImg = image[_index];
    const arr = image.filter((item, index) => index !== _index);

    const match = freeData.pic.find(
      pic => pic.boardPic === removedImg.boardPic,
    );
    if (match) {
      setIpics(prevIpics => [...prevIpics, match.ipics]);
    }

    setImage(arr);
  };
  console.log(ipics);

  // 데이터 연동(게시글 불러오기)
  const searchParams = new URLSearchParams(location.search);
  const iboard = parseInt(searchParams.get("iboard"));
  const [freeData, setFreeData] = useState(null);

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };
  const handleClearTitle = e => {
    setTitle("");
  };
  const handleChangeContents = e => {
    setContents(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFreeData(iboard);
        setFreeData(res.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [iboard]);

  useEffect(() => {
    if (freeData) {
      setTitle(freeData.title);
      setContents(freeData.contents);
      setImage([...freeData.pic]);
    }
  }, [freeData]);

  // 데이터 연동(게시글 수정)
  const handleModifyBoard = async () => {
    const formData = new FormData();
    const ipicsToUse = ipics.length === 0 ? [0] : ipics;
    const dto = {
      iboard: iboard,
      title: title,
      contents: contents,
      ipics: ipicsToUse,
    };

    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" }),
    );
    formData.append("dto", dto);

    const sendImagData = image.filter(item => typeof item === "string");

    if (image) {
      const imagePromises = sendImagData.map(async image => {
        const response = await fetch(image);
        const blob = await response.blob();
        const currentDate = new Date();
        const seconds = Math.floor(currentDate.getTime() / 1000);
        const file = new File([blob], `image${seconds}.jpg`, {
          type: "image/jpeg",
        });

        formData.append("storedPic", file);
      });
      await Promise.all(imagePromises);
      await putFreeData({ obj: formData });
      navigate(`/free/details?iboard=${iboard}`);
    }
  };

  return (
    <Layout>
      <FreeRegisterPageStyle>
        <FreeHeader>
          <p>자유게시판</p>
          <GoToListBt onClick={MoveToList}></GoToListBt>
        </FreeHeader>

        <FreeRegisterMain>
          <form>
            <input
              type="text"
              maxLength={50}
              placeholder="제목을 입력해 주세요"
              value={title}
              onChange={handleChangeTitle}
            />
            <button type="button" onClick={handleClearTitle} />
          </form>
          <div>
            <textarea
              type="text"
              maxLength={2000}
              value={contents}
              onChange={handleChangeContents}
              placeholder="내용을 입력해 주세요."
            />
          </div>
          <div>
            <PhotoBt>
              <p>사진</p>
              {image.length < 3 && (
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("img").click();
                  }}
                >
                  사진 추가
                </button>
              )}

              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onClick={() => {
                  document.getElementById("img").click();
                }}
                onChange={event => {
                  handleChangeFile(event, "before");
                }}
                id="img"
                style={{ display: "none" }}
              />
            </PhotoBt>
            <ImageMap>
              {image.map((item, index) => (
                <div key={index} onClick={() => removeImgList(index)}>
                  {item.boardPic ? (
                    <img src={`/pic/${item.boardPic}`} alt="" />
                  ) : (
                    <img src={item} alt="" />
                  )}
                </div>
              ))}
            </ImageMap>
          </div>
        </FreeRegisterMain>

        <BtSection mgbtm="40px">
          <CancelBt onClick={handleCancel}>취소</CancelBt>
          <SaveBt onClick={handleModifyBoard}>저장</SaveBt>
        </BtSection>
      </FreeRegisterPageStyle>
    </Layout>
  );
};

export default FreeModifyPage;
