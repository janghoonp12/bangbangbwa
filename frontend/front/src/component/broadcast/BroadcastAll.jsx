import React, { useEffect } from "react";
import BroadcastList from "./BroadcastList";
import data from "../../data.json";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Filter from "../common/Filter";
import styled from "styled-components";
import FilterButton from "../common/FilterButton";
import { useDispatch, useSelector } from 'react-redux';
import { SearchLiveBroadcastAsync, SearchEndBroadcastAsync } from "../../reducers/broadcastSlice"
import BroadcastListItem from "./BroadcastListitem";

const SH2 = styled.h2`
  float: left;
`;

const SButton = styled.button`
  float: left;
  margin: 5px;
  border-radius: 5px;
  border: 0.5px solid lightgrey;
  background-color: rgba(251, 255, 0, 0.2);
  :hover {
    background-color: rgba(251, 255, 0, 0.4);
    border: 1px solid black;
  }
`;

const SButtonLineDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr 2fr;
`;

function BroadcastAll() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const broadcastItem = () => {
    navigate("/broadcasts/new")
  }

  const liveBroadcastNavigation = () => {
    navigate("/broadcasts/live")
  }

  const NonLiveBroadcastNavigation = () => {
    navigate("/broadcasts/nonlive")
  }

  const { liveBroadcast } = useSelector((state) => state.broadcastSlice);
  const { endBroadcast } = useSelector((state) => state.broadcastSlice);
  
  useEffect(() => {
    dispatch(SearchLiveBroadcastAsync(
      {
        page: 0,
        size: 12,
      }
    ))
    dispatch(SearchEndBroadcastAsync(
      {
        page: 0,
        size: 12,
      }
    ))
  },[])

  return (
  <div>
    <SButtonLineDiv>
      <Button variant="info" onClick={broadcastItem} style={{marginBottom: '10px'}}>방송 등록</Button>
      <div />
      <FilterButton />
    </SButtonLineDiv>
    <div id="filterDiv" style={{ display: "none" }}>
      <Filter />
    </div>
    <div style={{height: '50px', marginTop: '10px'}}>
      <SH2>라이브 방송</SH2>
      <SButton onClick={liveBroadcastNavigation}>더보기</SButton>
    </div>
    <BroadcastList>
      {liveBroadcast ? liveBroadcast.map((item, index) => (
        <BroadcastListItem
          posts={item}
        />
      )) : <label>no data</label>}
    </BroadcastList>
    <hr />
    <div style={{height: '50px'}}>
      <SH2>지난 방송</SH2>
      <SButton onClick={NonLiveBroadcastNavigation}>더보기</SButton>
    </div>

    <BroadcastList>
      {endBroadcast ? endBroadcast.map((item, index) => (
        <BroadcastListItem
          posts={item}
        />
      )) : <label>no data</label>}
    </BroadcastList>

  </div>
  )
}

export default BroadcastAll;