import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyBroadcastList from "./MyBroadcastList";
import Button from "../common/ui/Button";
import data from "../../broadcastdata.json";
import logosample from "../../assets/logosample.png"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;    
  width: 100%;
  max-width: 70%;
`;

const SProfileDiv = styled.div`
  width: 100%;
  max-width: 30%;
  border: 1px solid grey;
  border-radius: 8px;
`;

const SItemDiv = styled.div`
  width: 100%;
  max-width: 70%;
  border: 1px solid grey;
  border-radius: 8px;
  // overflow: auto;
`;

const SImg = styled.img`
  width: 80%;
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

function MyBroadcast(props) {

  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <SProfileDiv>   
          <SImg alt="이미지" src={logosample} />
          <SNameP>UserName</SNameP>
          <SEmailP>abcde@gmail.com</SEmailP>
          <SMenuP
            onClick={() => {
              navigate("/mypage")
            }}
          >내 프로필</SMenuP>
          <SMenuP
            onClick={() => {
              navigate("/mypage/newbroker")
            }}
          >중개사 등록</SMenuP>
          <SMenuP
            onClick={() => {
              navigate("/mypage/myitem")
            }}
          >나의 매물정보</SMenuP>
          <SNowMenuP
            onClick={() => {
              navigate("/mypage/mybroadcast")
            }}
          >나의 방송정보</SNowMenuP>
        </SProfileDiv>
        <SItemDiv>
          <Button
            style={{position: 'absolute', right: 0, marginRight: "30px"}}
            title="필터"
            onClick={() => {
            navigate("/");
            }}
          />
          <MyBroadcastList
            myBroadcasts={data}
            onClickItem={(item) => {
              navigate(`/broadcasts/${item.id}`);
            }}
          />
        </SItemDiv>
      </Container>
    </Wrapper>
  )
}

export default MyBroadcast;