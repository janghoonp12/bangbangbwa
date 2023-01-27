import React from "react";
import noticeData from "../../noticeData.json";
import NoticeItem from "./NoticeItem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledTh = styled.td`
  text-align: center;
`
const StyledTable = styled.table`
  border: 1px solid black;
  width: 50%;
  margin: auto;
  border-collapse: separate;
  border-spacing: 0 10px;
`

function Notice() {
  const navigate = useNavigate();

  return (
    <StyledTable>
      <thead>
        <tr>
          <StyledTh>번호</StyledTh>
          <StyledTh>제목</StyledTh>
          <StyledTh>등록일</StyledTh>
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
    </StyledTable>
  )
}

export default Notice;