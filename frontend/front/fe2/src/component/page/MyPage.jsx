import React from "react";
import {
    Routes,
    Route
  } from "react-router-dom";
import styled from "styled-components";
import Container from './Container';
import PostViewPage from '../page/PostViewPage';
import PostWritePage from '../page/PostWritePage';

const Wrapper = styled.div`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

function MyPage() {

    return (
        <Wrapper>
          <h1>MyPage</h1>
          <Routes>
            <Route index element={<Container />} />
            <Route path=":postId" element={<PostViewPage />} />
            <Route path=":postId/post-write" element={<PostWritePage />}/>
          </Routes>
        </Wrapper>
    )
}

export default MyPage;