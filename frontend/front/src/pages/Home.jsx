import React, { useState, useEffect } from "react";
import HotItemList from "../component/home/HotItemList";
import HotBroadcastList from "../component/home/HotBroadcastList";
import data from "../data.json";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { SearchItemAsync } from "../reducers/itemSlice"
import ItemListItem from "../component/item/ItemListItem";
import BroadcastListItem from "../component/broadcast/BroadcastListitem";
import { SearchLiveBroadcastAsync, initBroadcastState } from "../reducers/broadcastSlice"


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
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.itemSlice);
  const { liveBroadcast } = useSelector((state) => state.broadcastSlice);

  useEffect(() => {
    dispatch(initBroadcastState())
    dispatch(SearchItemAsync(
      {
        page: 0,
        size: 12,
      }
    ))
    dispatch(SearchLiveBroadcastAsync(
      {
        page: 0,
        size: 12,
      }
    ))
  },[])

  return (
    <Wrapper>
      <Container>
        <div>
          <h2>최근 방송</h2>
          <hr />
          <HotBroadcastList>
          {liveBroadcast ? liveBroadcast.map((item, index) => (
        <BroadcastListItem
          posts={item}
        />
      )) : <label>no data</label>}
          </HotBroadcastList>
        </div>
        <hr/>
        <h2>최근 매물</h2>
        <div>
        <HotBroadcastList>
          {items ? items.map((item, index) => (
        <ItemListItem
          posts={item}
        />
      )
        ) : <label>no data</label>}
          </HotBroadcastList>
        </div>
      </Container>
    </Wrapper>
  )
}

export default Home;