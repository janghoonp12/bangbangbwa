import React from "react";
import BroadcastList from "./BroadcastList";
import data from "../../data.json";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Filter from "../common/Filter";
import styled from "styled-components";

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


function BroadcastAll() {
  const navigate = useNavigate();
  const broadcastItem = () => {
    navigate("/broadcasts/new")
  }

  const liveBroadcast = () => {
    navigate("/broadcasts/live")
  }

  const NonLiveBroadcast = () => {
    navigate("/broadcasts/nonlive")
  }

  return (
    <div>
        <Button variant="info" onClick={broadcastItem} style={{marginBottom: '10px'}}>방송 등록</Button>
        <Filter />
        <div style={{height: '50px', marginTop: '10px'}}>
          <SH2>실시간 방송</SH2>
          <SButton onClick={liveBroadcast}>더보기</SButton>
        </div>
        <div>
          <BroadcastList
            posts = {data}
            onClickItem = {(item) => {
                navigate(`/broadcasts/${item.id}`)
            }}
          />
        </div>
      <hr />
      <div style={{height: '50px'}}>
        <SH2>지난 방송</SH2>
        <SButton onClick={NonLiveBroadcast}>더보기</SButton>
      </div>
      <BroadcastList
        posts = {data}
        onClickItem = {(item) => {
            navigate(`/broadcasts/${item.id}`)
        }}
      />
    </div>
  )
}

export default BroadcastAll;