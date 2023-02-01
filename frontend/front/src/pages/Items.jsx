import React from "react";
import { Routes, Route } from "react-router-dom";
import ItemAll from "../component/item/ItemAll";
import ItemDetail from "../component/item/ItemDetail";
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

function Items() {
  return (
    <Wrapper>
      <Container>
        <h1>Items</h1>
        <hr />
        <Routes>
          <Route index element={<ItemAll />} />
          <Route path=":postId" element={<ItemDetail />} />
        </Routes>
      </Container>
    </Wrapper>
  )
}

export default Items;