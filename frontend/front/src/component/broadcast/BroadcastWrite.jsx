import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../common/ui/TextInput";
import Button from "../common/ui/Button";
import { useDispatch, useSelector } from 'react-redux';
import { writeBroadcastAsync, clearWriteBroadcastDone } from "../../reducers/broadcastSlice";
import { searchMyItemAsync } from "../../reducers/itemSlice";
import BroadcastFileData from "../common/BroadcastFileData"
import Swal from "sweetalert2";

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
const SGridDiv = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 0.75fr;
`;
const STitleP = styled.p`
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  font-size: 20px;
`;

function BroadcastWrite() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const [title, setTitle] = useState("방송 제목");
  const [outlook, setOutlook] = useState("방송 개요");
  const [reservationStartDate, setReservationstartDate] = useState("");
  const [reservationStartTime, setReservationstartTime] = useState("");
  const { myItem } = useSelector((state) => state.itemSlice);
  const { images } = useSelector((state) => state.fileSlice);
  const { writeBroadcastDone } = useSelector((state) => state.broadcastSlice);

  useEffect(() => {
    dispatch(searchMyItemAsync())
  }, [])

  useEffect(() => {
    if (writeBroadcastDone) {
      dispatch(clearWriteBroadcastDone())
      Swal.fire({
        icon: 'success',
        title: '방송 등록!',
        showConfirmButton: false,
        timer: 500
      })
      navigate('/broadcasts');
    }
  }, [writeBroadcastDone])

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
        "imagePath" : images
      }
    ))
  }
  
  return (
    <Wrapper>
      <select onChange={itemChange} required>
        <option value="" disabled selected style={{ display: "none" }}>매물을 선택하세요</option>
        {myItem ? myItem.map((item, index) => (
          <option value={item.item.item_id}>{item.item.item_title}</option>
        )): <option value="">등록된 매물이 없습니다</option>}
      </select>
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
        <SGridDiv>
          <STitleP>썸네일</STitleP>
          <BroadcastFileData></BroadcastFileData>
        </SGridDiv>
        <Button
          title="등록하기"
          onClick={createBroadcast}
        />
      </Container>
    </Wrapper>
  )
}

export default BroadcastWrite;