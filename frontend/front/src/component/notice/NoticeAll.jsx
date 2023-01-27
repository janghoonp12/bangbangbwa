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

function Notice() {
  const navigate = useNavigate();

  return (
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
  )
}

export default Notice;