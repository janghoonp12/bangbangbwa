import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import styled from "styled-components";
//Pages
import MyPage from "./component/page/MyPage";
import PostViewPage from "./component/page/PostViewPage";
import PostWritePage from "./component/page/PostWritePage";


const MainTitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

function App(props) {
  return (
    <BrowserRouter>
      <MainTitleText>My Page</MainTitleText>
      <Routes>
        <Route index element={<MyPage />}/>
        <Route path="post-write" element={<PostWritePage />}/>
        <Route path="post/:postId" element={<PostViewPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
