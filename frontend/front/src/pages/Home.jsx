import React, { useEffect } from "react";
import HotBroadcastList from "../component/home/HotBroadcastList";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { SearchItemAsync } from "../reducers/itemSlice"
import ItemListItem from "../component/item/ItemListItem";
import BroadcastListItem from "../component/broadcast/BroadcastListitem";
import { SearchLiveBroadcastAsync, initBroadcastState } from "../reducers/broadcastSlice"
import HotItemList from "../component/home/HotItemList";


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
          <h2>라이브 방송</h2>
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
        <HotItemList>
          {items ? items.map((item, index) => (
        <ItemListItem
          posts={item}
        />
      )
        ) : <label>no data</label>}
          </HotItemList>
        </div>
      </Container>
    </Wrapper>
  )
}

export default Home;