import React, { useState, useEffect } from "react";
import BroadcastListItem from "./BroadcastListitem";
import styled from "styled-components";
import Filter from "../common/Filter";
import FilterButton from "../common/FilterButton";
import { useDispatch, useSelector } from 'react-redux';
import { SearchEndBroadcastAsync, initBroadcastState } from "../../reducers/broadcastSlice"

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;

    & > * {
        :not(:last-child) {
            margin-bottom: 15px;
        }
    }
`;

const SButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const SButtonLineDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr 2fr;
`;

const SButton = styled.button`
  border-radius: 8px;
  border: 0.5px solid lightgrey;
  background-color: lightgrey; 
  :hover {
    background: grey;
    border: 1px solid black;
  }
  margin-bottom: 30px;
`;

function NonLiveBroadcastList() {
  const dispatch = useDispatch();
  const limit = 12; // 한 페이지에 나올 방송 수
  const [loads, setLoads] = useState(1); // 더보기 클릭 횟수
  const offset = limit * loads; // 더보기 클릭할 때 마다 limit개의 방송이 추가됨

  const { endBroadcast, currentPage, last } = useSelector((state) => state.broadcastSlice);

  useEffect(() => {
    dispatch(initBroadcastState())
    dispatch(SearchEndBroadcastAsync(
      {
        page: 0,
        size: 12,
      }
    ))
  },[])

  const loadItem = () => {
    dispatch(SearchEndBroadcastAsync(
      {
        page: currentPage,
        size: 12,
      }
    ))
  }

  return (
    <div>
      <SButtonLineDiv>
        <div />
        <div />
        <FilterButton />
      </SButtonLineDiv>
      <div id="filterDiv" style={{ display: "none" }}>
        <Filter />
      </div>
      <h2 style={{marginTop : '10px'}}>방송 예정 목록</h2>
      <Wrapper>
      {endBroadcast ? endBroadcast.map((broadcast, index) => (
        <BroadcastListItem
          posts={broadcast}
        />
      )
        ) : <label>no data</label>}
      </Wrapper>
      <SButtonDiv>
        {!last ? <SButton onClick={loadItem}>예정 방송 더보기</SButton> : <></>}
      </SButtonDiv>
    </div>
  )
}

export default NonLiveBroadcastList;