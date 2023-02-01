import React from "react";
import BookmarkList from "./BookmarkList";
import styled from "styled-components";

const SDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SH3 = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

function BookmarkAll() {
  
  return (
    <div>
      <SH3>즐겨찾기</SH3>
      <SDiv>
        <br />
        <BookmarkList />
      </SDiv>
    </div>
  )
}

export default BookmarkAll;