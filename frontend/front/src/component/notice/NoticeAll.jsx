import React from "react";
import noticeData from "../../noticeData.json";
import NoticeItem from "./NoticeItem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const STh = styled.td`
  text-align: center;
`
const STable = styled.table`
  border: 1px solid black;
  width: 50%;
  margin: auto;
  border-collapse: separate;
  border-spacing: 0 10px;
`

const SButton = styled.button`
  float: right;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  background-color: rgba(180, 191, 240, 0.3);
`;

const SH1 = styled.h1`
  text-align: center;
  margin-top: 10px;
`

const SDiv = styled.div`
  padding: 20px;
  margin-right: 365px;
  margin-bottom: 20px;
  text-align: center;
`


function Notice() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/notices/new')
  }

  return (
    <div>
      <SH1 align="center">공지사항</SH1>
      <SDiv>
        <SButton
          onClick={onClick}
        >공지 작성</SButton>
      </SDiv>
      <br />
      <STable>
        <thead>
          <tr>
            <STh>번호</STh>
            <STh>제목</STh>
            <STh>등록일</STh>
          </tr>
        </thead>
        <tbody>
          {noticeData.map((post, index) => {
            return (
              <NoticeItem
              key={post.id}
              post={post}
              onClick={() => {
                navigate(`/notices/${post.id}`);
              }}
              />
            );
          })} 
        </tbody>
      </STable>
    </div>
  )
}

export default Notice;