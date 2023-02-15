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

function BroadcastWrite() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const [title, setTitle] = useState("방송 제목");
  const [outlook, setOutlook] = useState("방송 개요");
  const [reservationStartDate, setReservationstartDate] = useState("");
  const [reservationStartTime, setReservationstartTime] = useState("");
  const [thumbnail, setThumbnail] = useState("썸네일");
  const { myItem } = useSelector((state) => state.itemSlice);
  const { writeBroadcastDone } = useSelector((state) => state.broadcastSlice);

  useEffect(() => {
    dispatch(findMyItemAsync())
  }, [])

  useEffect(() => {
    if (writeBroadcastDone) {
      clearWriteBroadcastDone()
      navigate('/broadcasts');
    }
  })

  const itemChange = (e) => {
    setItem(e.target.value)
  }

  const createBroadcast = () => {
    dispatch(writeBroadcastAsync(
      {
        "broadcastDescription": outlook,
        "broadcastReservationTime" : reservationStartDate + "T" + reservationStartTime + ":00",
        "broadcastTitle": title,
        "itemId": item,
        "imageId": 1
      }
    ))
    navigate()
  }
  
  return (
    <Wrapper>
      <select onChange={itemChange} required>
        <option value="" disabled selected style={{ display: "none" }}>매물을 선택하세요</option>
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
        <input
          height={20}
          type='date'
          value={reservationStartDate}
          onChange={(event) => {
            setReservationstartDate(event.target.value);
          }}
        />
        <input
          height={20}
          type='time'
          value={reservationStartTime}
          onChange={(event) => {
            setReservationstartTime(event.target.value);
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