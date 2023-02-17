import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./ui/Button";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 70%;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const SGridDiv = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 0.75fr;
`;

const SGridListDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const SP = styled.p`
  margin-bottom: 0px;
`;

const STitleP = styled.p`
  margin-bottom: 0px;
  display: flex;
  align-items: center;
`;

function FilterDetail() {
  
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <h1>상세 필터</h1>
        <SGridDiv style={{marginTop: "5%"}}>
          <STitleP>매물 종류</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox"/> 원룸</SP>
            <SP><input type="checkbox"/> 투,쓰리룸</SP>
            <SP><input type="checkbox"/> 오피스텔</SP>
            <SP><input type="checkbox"/> 아파트</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>거래 종류</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox"/> 월세</SP>
            <SP><input type="checkbox"/> 전세</SP>
            <SP><input type="checkbox"/> 매매</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>방크기</STitleP>
          <input type="range" />
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>보증금/전세가</STitleP>
          <input type="range" />
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>월세</STitleP>
          <input type="range" />
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>매매가</STitleP>
          <input type="range" />
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>층수</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox"/> 전체</SP>
            <SP><input type="checkbox"/> 반지하</SP>
            <SP><input type="checkbox"/> 1층</SP>
            <SP><input type="checkbox"/> 2층</SP>
            <SP><input type="checkbox"/> 3층</SP>
            <SP><input type="checkbox"/> 3층이상</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>사용 승인일</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox"/> 전체</SP>
            <SP><input type="checkbox"/> 1년 이내</SP>
            <SP><input type="checkbox"/> 5년 이내</SP>
            <SP><input type="checkbox"/> 10년 이내</SP>
            <SP><input type="checkbox"/> 15년 이내</SP>
            <SP><input type="checkbox"/> 15년 이상</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>추가 옵션</STitleP>
          <SGridListDiv>
            <SP><input type="checkbox"/> 엘리베이터</SP>
            <SP><input type="checkbox"/> 주차</SP>
            <SP><input type="checkbox"/> 복층</SP>
            <SP><input type="checkbox"/> 주방분리형</SP>
            <SP><input type="checkbox"/> 인덕션</SP>
            <SP><input type="checkbox"/> 전자레인지</SP>
            <SP><input type="checkbox"/> 에어컨</SP>
            <SP><input type="checkbox"/> 세탁기</SP>
            <SP><input type="checkbox"/> TV</SP>
            <SP><input type="checkbox"/> 옷장</SP>
            <SP><input type="checkbox"/> 침대</SP>
            <SP><input type="checkbox"/> 책상</SP>
            <SP><input type="checkbox"/> 신발장</SP>
            <SP><input type="checkbox"/> 비데</SP>
            <SP><input type="checkbox"/> 가스레인지</SP>
            <SP><input type="checkbox"/> 냉장고</SP>
            <SP><input type="checkbox"/> 전자도어락</SP>
            <SP><input type="checkbox"/> 베란다/발코니</SP>
          </SGridListDiv>
        </SGridDiv>
        <hr />
        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <Button
            title="적용하기"
            onClick={() => {
              navigate("/items");
            }}
          />
        </div>
      </Container>
    </Wrapper>
  )
}

export default FilterDetail;