import React from "react";
import AlarmList from "./AlarmList";
import styled from "styled-components";



const SDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SInnerDiv = styled.div`
  background-color: rgba(133, 88, 111, 0.1);
  border-radius: 8px;
  width: 70%;
  min-height: 500px;
`;


function Alarm() {
  return (
    <SDiv>
      <SInnerDiv>
        <AlarmList />
      </SInnerDiv>
    </SDiv>
  )
}

export default Alarm;