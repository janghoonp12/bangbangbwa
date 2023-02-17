import React from "react";
import styled from "styled-components";

const SDiv = styled.div`
  background-color: rgba(252, 255, 102, 0.8);
  width: 650px;
  height: 50px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 13px 0;
  border-radius: 8px;
`;

const SButton = styled.button`
  width: 30px;
  float: right;
  margin-bottom: 20px;
  margin-right: 5px;
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


function checkName(name){

  const charCode = name.charCodeAt(name.length - 1);
  const consonantCode = (charCode - 44032) % 28;
  
  if(consonantCode === 0){
      return `${name}가`;
  }
  return `${name}이`;
}



function AlarmListItem(props) {
  const alarm = props.alarm
  const onClick = () => {
    const josa = checkName(alarm.comment)
    alert(`${josa} 삭제되었습니다.`)
  }


  
  return (
    <SDiv>
        <SleftP>{alarm.comment}</SleftP>
        <SButton onClick={onClick}>X</SButton>
        <SRightP>{alarm.start_time}</SRightP>
    </SDiv>
  )
}

export default AlarmListItem;