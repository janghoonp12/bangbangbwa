import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logosample from "../../assets/logosample.png";
import { useSelector, useDispatch } from 'react-redux';
import { changeMyPageStatus } from "../../reducers/commonSlice"
import useInput from '../../hooks/useInput';
import MyPageLogo from "../../assets/mypagelogo.png";

const SProfileDiv = styled.div`
  width: 100%;
  max-width: 30%;
  height: 700px;
  border: 1px solid grey;
  border-radius: 8px;
`;

const SImg1 = styled.img`
  width: 50%;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const SNameP = styled.p`
  font-size: 20px;
`;

const SEmailP = styled.p`
  margin-bottom: 5rem;
  font-size: 10px;
`;

const SMenuP = styled.p`
  font-size: 15px;
  cursor: pointer;
`;

const SNowMenuP = styled.p`
  font-size: 15px;
  text-decoration-line: underline;
  cursor: pointer;
`;

function MyPageSide() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userSlice);
  const [status, setStatus] = useState();
  const changeStatus = (data) => {
    dispatch(changeMyPageStatus(data))
  }

  useEffect(() => {
    if (me.role === 'ROLE_ADMIN' || me.role === "ROLE_BROKER") {
      setStatus(true)
    }
  },[])

  return (
    <SProfileDiv>
      <SImg1 alt="이미지" src={MyPageLogo} />
      <SNameP>{ me.nickname }</SNameP>
      <SEmailP>{ me.email}</SEmailP>
      <SMenuP
        style={{ marginTop: "10rem" }}
        onClick={() => {
          changeStatus(1)
        }}
      >내 프로필</SMenuP>
      <SMenuP
        onClick={() => {
          changeStatus(2)
        }}
      >중개사 등록</SMenuP>
      {me.level > 1 && <SMenuP
        onClick={() => {
          changeStatus(3)
        }}
      >나의 매물정보</SMenuP>}
      {me.level > 1 && <SMenuP
        onClick={() => {
          changeStatus(4)
        }}
      >나의 방송정보</SMenuP>}
    </SProfileDiv>
    )
}

export default MyPageSide;