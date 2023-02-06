import React from "react";
import HotItemList from "../component/home/HotItemList";
import HotBroadcastList from "../component/home/HotBroadcastList";
import data from "../data.json";
import { useNavigate } from "react-router-dom";
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

function Home() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <div>
          <h2>지금 핫한 방송</h2>
          <hr />
          <HotBroadcastList
            posts={data}
            onClickItem={(item) => {
              navigate(`/broadcasts/${item.id}`);
            }}
            />
        </div>
        <hr/>
        <h2>인기 매물</h2>
        <div>
          <HotItemList
              posts={data}
              onClickItem={(item) => {
                navigate(`/items/${item.id}`);
              }}
          />
        </div>
      </Container>
    </Wrapper>
  )
}

export default Home;