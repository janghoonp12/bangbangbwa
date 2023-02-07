import React, { useState } from "react";
import bookmarkData from "../../bookmarkData.json";
import BookmarkListItem from "./BookmarkListItem";
import styled from "styled-components";
import LoadMore from "../common/ui/LoadMore";

const Wrapper = styled.div`
  max-width: 80%;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;

    & > * {
        :not(:last-child) {
            margin-bottom: 50px;
        }
    }
`;

const SButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

function BookmarkList() {

  const limit = 12; // 한 페이지에 나올 방송 수
  const [loads, setLoads] = useState(1); // 더보기 클릭 횟수
  const offset = limit * loads; // 더보기 클릭할 때 마다 limit개의 방송이 추가됨

  return (
    <Wrapper>
      <Container>
        {bookmarkData.slice(0, offset).map((post, index) => {
          return (
            <BookmarkListItem
            key={post.id}
            post={post}
            />
            );
          })}
      </Container>
      <SButtonDiv>
        <LoadMore 
          total={bookmarkData.length}
          limit={limit}
          loads={loads}
          setLoads={setLoads}
        />
      </SButtonDiv>
    </Wrapper>
  )
}

export default BookmarkList;