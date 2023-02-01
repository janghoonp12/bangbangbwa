import React from "react";
import ItemList from "../component/item/ItemList";
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
          <ItemList
            posts={data}
            onClickItem={(item) => {
              navigate(`/broadcasts/${item.id}`);
            }}
            />
        </div>
        <hr/>
        <h2>인기 급상승 매물</h2>
        <div>
          <ItemList
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