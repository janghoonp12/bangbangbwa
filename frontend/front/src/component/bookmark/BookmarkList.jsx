import React from "react";
import bookmarkData from "../../bookmarkData.json";
import BookmarkListItem from "./BookmarkListItem";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;


function BookmarkList() {

  return (
    <Wrapper>
      {bookmarkData.map((post, index) => {
          return (
            <BookmarkListItem
              key={post.id}
              post={post}
            />
          );
      })}
    </Wrapper>
  )
}

export default BookmarkList;