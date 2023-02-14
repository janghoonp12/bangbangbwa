import React from "react";
import { Routes, Route } from "react-router-dom";
import BroadcastAll from "../component/broadcast/BroadcastAll";
import Openvidu from "./Openvidu";
import BroadcastWrite from "../component/broadcast/BroadcastWrite";
import LiveBroadcastList from "../component/broadcast/LiveBroadcastList";
import NonLiveBroadcastList from "../component/broadcast/NonLiveBroadcastList";
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

function Broadcasts() {
  return (
    <Wrapper>
      <Container>
        <h1>Broadcast</h1>
        <hr/>
        <Routes>
          <Route index element={<BroadcastAll />} />
          <Route path=":postId" element={<Openvidu />} />
          <Route path="new" element={<BroadcastWrite />} />
          <Route path="live" element={<LiveBroadcastList />} />
          <Route path="nonlive" element={<NonLiveBroadcastList />} />
        </Routes>
      </Container>
    </Wrapper>
  )
}

export default Broadcasts;