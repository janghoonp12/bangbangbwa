import React from "react";
import { Routes, Route } from "react-router-dom";
import InterestNav from "../component/interest/InterestNav";
import RecentView from "../component/interest/RecentView";
import InterestItem from "../component/interest/InterestItem";
import InterestArea from "../component/interest/InterestArea";
import BookmarkAll from "../component/bookmark/BookmarkAll";
import BookmarkNew from "../component/bookmark/BookmarkNew";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 70%;
`;

function Interests() {
  
  return (
    <Wrapper>
      <Container>
        <h1 align="center">관심 페이지</h1>
        <hr />
        <InterestNav />
        <br />
        <Routes>
          <Route path="/" element= {<RecentView />} />
          <Route path="items" element={<InterestItem />} />
          <Route path="areas" element={<InterestArea />} />
          <Route path="bookmarks" element={<BookmarkAll />}/>
          <Route path="bookmarks/new" element={<BookmarkNew />}/>
        </Routes>
      </Container>
    </Wrapper>
  )
}

export default Interests;