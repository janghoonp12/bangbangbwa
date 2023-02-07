import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyBroadcastList from "./MyBroadcastList";
import data from "../../broadcastdata.json";
import logosample from "../../assets/logosample.png"
import Pagination from "../common/ui/Pagination";

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
  height: 700px;
  border: 1px solid grey;
  border-radius: 8px;
`;

const SItemDiv = styled.div`
  width: 100%;
  max-width: 70%;
  // height: 700px;
  // border: 1px solid grey;
  border-radius: 8px;
  margin-left: 10px;
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

const SSearchInput = styled.input`
  width: 90%;
  margin-top: 30px;
`;

function MyBroadcast(props) {

  const navigate = useNavigate();

  // Pagination을 위한 작업
  // const [data, setData] = useState([]); // 총 매물 수
  const limit = 5 // 한 페이지에 나올 매물 수
  const [page, setPage] = useState(1); // 페이지
  const offset = (page - 1) * limit; // 페이지별 매물들을 받아오기 위한 index offset

  // useEffect로 BE에 data를 요청해야 하는 것 같음. 일단은 더미데이터로

  return (
    <Wrapper>
      <Container>
        <SProfileDiv>   
          <SImg alt="이미지" src={logosample} />
          <SNameP>UserName</SNameP>
          <SEmailP>abcde@gmail.com</SEmailP>
          <SMenuP
            style={{ marginTop: "10rem" }}
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
          <SSearchInput placeholder="제목을 검색하세요."/>
        </SProfileDiv>
        <SItemDiv>
          <MyBroadcastList
            myBroadcasts={data.slice(offset, offset+limit)}
            onClickItem={(item) => {
              navigate(`/broadcasts/${item.id}`);
            }}
          />
          <Pagination
            total={data.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </SItemDiv>
      </Container>
    </Wrapper>
  )
}

export default MyBroadcast;