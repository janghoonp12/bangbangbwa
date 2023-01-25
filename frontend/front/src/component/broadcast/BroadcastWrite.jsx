import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../common/ui/TextInput";
import Button from "../common/ui/Button";

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
  const navigate = useNavigate();
  const [item] = useState("방송 등록할 매물을 선택하세요");
  const [title, setTitle] = useState("방송 제목");
  const [outlook, setOutlook] = useState("방송 개요");
  const [startTime, setstartTime] = useState("방송 시작시간");
  const [thumbnail, setThumbnail] = useState("썸네일");
  return (
    <Wrapper>
      <TextInput
        value={item}
        height={100}
      />
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
          onClick={() => {
              navigate("/broadcasts");
          }}
        />
      </Container>
    </Wrapper>
  )
}

export default BroadcastWrite;