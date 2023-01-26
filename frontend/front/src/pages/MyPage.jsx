import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import styled from "styled-components";
import MyProfile from "../component/mypage/MyProfile";
import NewBroker from "../component/mypage/NewBroker";
import MyItem from '../component/mypage/MyItem';
import PostViewPage from '../component/mypage/PostViewPage';
import PostWritePage from '../component/mypage/PostWritePage';
import MyBroadcast from "../component/mypage/MyBroadcast";

const Wrapper = styled.div`
  margin-top: 3rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

function MyPage() {

  return (
    <Wrapper>
    {/* <h1>MyPage</h1> */}
    <Routes>
      <Route index element={<MyProfile />} />
      <Route path="newBroker" element={<NewBroker />}/>
      <Route path="myItem" element={<MyItem />} />
      <Route path="myItem/:postId" element={<PostViewPage />} />
      <Route path="myItem/:postId/post-write" element={<PostWritePage />}/>
      <Route path="myBroadcast" element={<MyBroadcast />}/>
      {/* <Route path="myBroadcast/:myBroadcastId" element={<PostViewPage />} /> */}
      {/* <Route path="myBroadcast/:myBroadcastId/broadcast-write" element={<PostWritePage />}/> */}
    </Routes>
    </Wrapper>
  )
}

export default MyPage;