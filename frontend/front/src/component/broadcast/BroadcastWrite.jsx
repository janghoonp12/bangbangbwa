import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../common/ui/TextInput";
import Button from "../common/ui/Button";
import { useDispatch, useSelector } from 'react-redux';
import { findMyItemAsync, writeBroadcastAsync, clearWriteBroadcastDone } from "../../reducers/broadcastSlice";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 70%;

`;

function BroadcastWrite(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const [title, setTitle] = useState("방송 제목");
  const [outlook, setOutlook] = useState("방송 개요");
  const [startTime, setstartTime] = useState("방송 시작시간");
  const [thumbnail, setThumbnail] = useState("썸네일");

  const { myItem, writeBroadcastDone } = useSelector((state) => state.broadcastSlice);

  useEffect(() => {
    dispatch(findMyItemAsync())
  }, [])

  useEffect(() => {
    if (writeBroadcastDone) {
      clearWriteBroadcastDone()
      navigate('/broadcasts');
    }
  })

  const createBroadcast = () => {
    dispatch(writeBroadcastAsync(
      {
        "broadcastDescription": outlook,
        "broadcastReservationTime" : startTime,
        "broadcastTitle": title,
        "itemId": item
      }
    ))
  }
  
  return (
    <Wrapper>
      <select required>
        <option value="" onChange={setItem} disabled selected style={{ display: "none" }}>매물을 선택하세요</option>
        {myItem ? myItem.map((item, index) => (
          <option value={item.item.item_id}>{item.item.item_title}</option>
        )): <option value="">등록된 매물이 없습니다</option>}
      </select>
      {/* <TextInput
        value={item}
        height={100}
        onChange={(event) => {
          setItem(event.target.value);
      }}
      /> */}
      <br />
      <Container>
        <TextInput
          height={20}
          value={title}
          onChange={(event) => {
              setTitle(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={outlook}
          onChange={(event) => {
              setOutlook(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={startTime}
          onChange={(event) => {
              setstartTime(event.target.value);
          }}
        />
        <TextInput
          height={20}
          value={thumbnail}
          onChange={(event) => {
              setThumbnail(event.target.value);
          }}
        />
        <Button
          title="등록하기"
          onClick={createBroadcast}
        />
      </Container>
    </Wrapper>
  )
}

export default BroadcastWrite;