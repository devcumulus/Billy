import React, { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import {
  ContentSection,
  ContentState,
  FreeDetailsMain,
  FreeDetailsPageStyle,
  MoreBt,
  ReviewList,
  ReviewRegister,
  ReviewSection,
  SideSection,
  TitleSection,
  WriterBt,
  WriterSection,
} from "../../styles/free/FreeDetailsPageStyle";
import { FreeHeader } from "../../styles/free/FreePageStyle";
import { GoToListBt } from "../../styles/free/FreeRegisterPageStyle";
import { useNavigate, useParams } from "react-router-dom";
import { deleteFreeData, getFreeData, getLike } from "../../api/free/free_api";
import { postComment } from "../../api/free/comment_api";
import { useSelector } from "react-redux";

// 로그인 유저 == 게시글 작성자
const UserButton = ({ userId, currentUserId, onDelete, onModify }) => {
  const isCurrentUser = userId === currentUserId;

  return (
    <>
      {isCurrentUser && (
        <WriterBt>
          <button
            onClick={onModify}
            style={{ background: "#fff", color: "#2c39b5" }}
          >
            수정
          </button>
          <button
            onClick={onDelete}
            style={{ background: "#2c39b5", color: "#fff" }}
          >
            삭제
          </button>
        </WriterBt>
      )}
    </>
  );
};

const FreeDetailsPage = () => {
  const iuser = useSelector(state => state.loginSlice.iuser);
  // 데이터 연동(상세페이지)
  const [freeData, setFreeData] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const iboard = parseInt(searchParams.get("iboard"));

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

  // 페이지 이동(게시글 수정)
  const handleModifyFree = () => {
    navigate(`/free/modify?iboard=${iboard}`)
  }

  // 데이터 연동(게시글 삭제)
  const handleDeleteFree = async () => {
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await deleteFreeData(iboard);
        navigate(`/free`)
      } catch (error) {
        console.log("Error deleting product:", error);
      }
    }
  };

  // 데이터 연동(좋아요)
  // const [like,setLike] = useState(false)
  // const handleClickLike = () => {
  //   setLike(prev => !prev)
  // }

  // useEffect(() => {
  //   const likeData = async() => {
  //       await getLike(iboard)
  //   }
  //   likeData()
  // },[like])

  // 댓글 작성
  const [comment, setComment] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const commentData = async () => {
      await postComment(iboard, comment);
    };
    commentData();
  }, [comment]);

  // 날짜와 시간만 추출(댓글)
  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");

    return {
      date: `${year}-${month}-${day}`,
      time: `${hour}:${minute}:${second}`,
    };
  };

  let date;
  let time;
  if (freeData && freeData.createdAt) {
    const result = formatDate(freeData.createdAt);
    date = result.date;
    time = result.time;
  }

  // 페이지 이동
  const navigate = useNavigate();
  const MoveToList = () => {
    navigate(`/free`);
  };

  return (
    <Layout>
      <FreeDetailsPageStyle>
        <FreeHeader>
          <p>자유게시판</p>
          <GoToListBt onClick={MoveToList}></GoToListBt>
        </FreeHeader>
        {freeData && (
          <FreeDetailsMain>
            <div style={{ width: "1110px" }}>
              <TitleSection>
                <h1>{freeData.title}</h1>
                <h2>
                  {date} {time}
                </h2>
              </TitleSection>

              <ContentSection>
                <div>
                  {freeData.pic.map((item, index) => (
                    <img
                      key={index}
                      src={`/pic/${item.boardPic}`}
                      alt="업로드이미지"
                    />
                  ))}
                </div>

                <p>{freeData.contents}</p>
                <UserButton
                  // userId={freeData.iuser}
                  // currentUserId={iuser}
                  onModify={handleModifyFree}
                  onDelete={handleDeleteFree}
                />
              </ContentSection>

              <ReviewSection>
                <h1>댓글 {freeData.comments.length}</h1>
                <ReviewRegister>
                  <p>
                    저작권 등 다른 사람의 권리를 침해하거나 명예를 훼손하는
                    게시물은 이용약관 및 관련 법률에 의해 제재를 받을 수
                    있습니다.
                    <br />
                    건전한 토론 문화와 양질의 댓글 문화를 위해, 타인에게
                    불쾌감을 주는 욕설 또는 특정 계층/민족, 종교 등을 비하하는
                    단어들은 표시가 제한됩니다.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "end",
                    }}
                  >
                    <textarea
                      maxLength={200}
                      placeholder="댓글을 입력해주세요"
                      onChange={e => {
                        const inputText = e.target.value;
                        const inputLength = inputText.length;
                        const maxLength = 200;
                        const counterText = `${inputLength}/${maxLength}`;

                        // 입력된 글자수와 최대 글자수를 표시하는 부분
                        document.getElementById("counter").innerText =
                          counterText;

                        // textarea의 값이 변경될 때마다 comment 상태를 업데이트
                        setInputValue(inputText);
                      }}
                    />
                    <span id="counter">0/200</span>
                    <button onClick={() => setComment(inputValue)}>등록</button>
                  </div>
                </ReviewRegister>

                {freeData.comments.map(listItem => {
                  const { date, time } = formatDate(listItem.createdAt);
                  return (
                    <ReviewList key={listItem.text}>
                      <img src={`/pic/${listItem.userPic}`} alt="유저이미지" />
                      <div style={{ width: "900px" }}>
                        <h1>{listItem.nick}</h1>
                        <p>{listItem.comment}</p>
                      </div>
                      <div style={{ textAlign: "end" }}>
                        <h2>{date}</h2>
                        <h2>{time}</h2>
                      </div>
                    </ReviewList>
                  );
                })}
                <MoreBt>
                  <img src="/images/free/bt_more.svg" />
                </MoreBt>
              </ReviewSection>
            </div>

            <SideSection>
              <WriterSection>
                <img src={`/pic/${freeData.userPic}`} alt="작성자 이미지" />
                <h1>{freeData.nick}</h1>
              </WriterSection>
              <ContentState>
                <h1>댓글</h1>
                <h1>{freeData.comments.length}</h1>
              </ContentState>
              <ContentState>
                <h1>좋아요</h1>
                <div>
                  <img src="/images/free/like.svg" />
                  <h1>{freeData.isLiked}</h1>
                </div>
              </ContentState>
              <ContentState>
                <h1>조회수</h1>
                <h1>{freeData.view}</h1>
              </ContentState>
            </SideSection>
          </FreeDetailsMain>
        )}
      </FreeDetailsPageStyle>
    </Layout>
  );
};

export default FreeDetailsPage;
