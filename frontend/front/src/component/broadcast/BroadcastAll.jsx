import React from "react";
import BroadcastList from "./BroadcastList";
import data from "../../data.json";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function BroadcastAll() {
  const navigate = useNavigate();
  const broadcastItem = () => {
    navigate("/broadcasts/new")
  }
  return (
    <div>
      <Button variant="info" onClick={broadcastItem}>방송 등록</Button>
      <h2>실시간 방송</h2>
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