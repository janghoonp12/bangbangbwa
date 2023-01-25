import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "./ui/TextInput";
import Button from "./ui/Button";

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

function WriteItem() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("매물이름");
  const [type, setType] = useState("매물종류");
  const [building_type, setBuildingType] = useState("건물유형");
  const [manage_fee, setManageFee] = useState("관리비용");

  return (
      <Wrapper>
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
                  value={type}
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
              />
              <TextInput
                  height={20}
                  value={building_type}
                  onChange={(event) => {
                    setBuildingType(event.target.value);
                  }}
              />
              <TextInput
                  height={20}
                  value={manage_fee}
                  onChange={(event) => {
                    setManageFee(event.target.value);
                  }}
              />

              <Button
                  title="등록하기"
                  onClick={() => {
                      navigate("/");
                  }}
              />
          </Container>
      </Wrapper>
  )
}

export default WriteItem;