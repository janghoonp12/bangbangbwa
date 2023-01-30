import React from "react";
import styled from "styled-components";

const SDiv = styled.div`
  background-color: rgba(252, 255, 102, 0.4);
  width: 550px;
  height: 50px;
  margin: auto;
  margin-bottom: 15px;
  padding: 13px 0;
`;

const SButton = styled.button`
  width: 30px;
  float: right;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: red;
  color: white;
`;

const SleftP = styled.p`
  float: left;
  margin-left: 10px;
`;

const SRightP = styled.p`
  float: right;
  margin-right: 10px;
`;


function AlarmListItem(props) {
  const alarm = props.alarm
  
  return (
    <SDiv>
        <SleftP>{alarm.comment}</SleftP>
        <SButton>X</SButton>
        <SRightP>{alarm.start_time}</SRightP>
    </SDiv>
  )
}

export default AlarmListItem;