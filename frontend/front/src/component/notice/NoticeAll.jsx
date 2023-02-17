import React from "react";
import NoticeList from "./NoticeList";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from 'react-redux';

const SButton = styled.button`
  float: right;
  width: 120px;
  height: 50px;
  border-radius: 5px;
  background-color: rgba(180, 191, 240, 0.3);
  font-size: 20px;
  border: 0.5px solid lightgrey;

  :hover {
    border: 1px solid black;
  }
  
`;

const SH1 = styled.h1`
  text-align: center;
  margin-top: 10px;
`

const SDiv = styled.div`
  padding: 20px;
  margin-right: 50px;
  margin-bottom: 30px;
  text-align: center;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SSDiv = styled.div`
  width: 70%;
`;



function Notice() {
  const navigate = useNavigate();
  const { me } = useSelector((state) => state.userSlice);
  const onClick = () => {
    navigate('/notices/new')
  }


  return (
    <Wrapper>
      <SSDiv>
        <SH1 align="center">공지사항</SH1>
        <SDiv>
        { me ? me.level > 2 ? <SButton onClick={onClick}>공지 작성</SButton> : <></> : <></>}
        </SDiv>
        <NoticeList />
        <br />
      </SSDiv>
    </Wrapper>
  )
}

export default Notice;