import React from "react";
import styled from "styled-components";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";


const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  // display: grid;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 8px;
  background: #F8EDE3
`;

const Container = styled.div`
  width: 100%;
  // max-width: 80%;
`;

const SElemDiv = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  
  :hover {
    background: lightgrey;
  }
`;

// 주거형태type 거래방식deal_type 면적supply_area 사용승인일move_in_data 거래금액price
const STypeDiv = styled.div`
  display: grid;
  grid-template-columns: 0.125fr 0.175fr 0.175fr 0.175fr 0.175fr 0.175fr;
  grid-gap: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  text-align: center;
`;

const SDealTypeDiv = styled.div`
  display: grid;
  grid-template-columns: 0.125fr 0.175fr 0.175fr 0.175fr 0.175fr 0.175fr;
  grid-gap: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  text-align: center;
`;

const SSupplyAreaDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  text-align: center;
`;

const SMoveInDataDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  text-align: center;
`;

const SPriceDiv = styled.div`
  display: grid;
  grid-template-columns: 0.125fr 0.875fr;
  grid-gap: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  text-align: center;
`;

const SFilterDiv = styled.div`
  display: grid;
  grid-template-columns: 10fr 2fr;
`;

const SP = styled.p`
 margin-bottom: 0px;
`;

function Filter() {

  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <STypeDiv>
          <SP>주거형태</SP>
          <SElemDiv>
            <SP>전체</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>아파트</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>오피스텔</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>빌라</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>주택</SP>
          </SElemDiv>
        </STypeDiv>

        <SDealTypeDiv>
          <SP>거래방식</SP>
          <SElemDiv>
            <SP>전체</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>매매</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>전세</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>월세</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>단기임대</SP>
          </SElemDiv>
        </SDealTypeDiv>

        <SSupplyAreaDiv>
          <SP>면적</SP>
          <SElemDiv>
            <SP>전체</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>10평 이하</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>10평</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>20평</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>30평</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>40평</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>50평 이상</SP>
          </SElemDiv>
        </SSupplyAreaDiv>

        <SMoveInDataDiv>
          <SP>사용 승인일</SP>
          <SElemDiv>
            <SP>전체</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>입주 예정</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>5년</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>10년</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>15년</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>20년</SP>
          </SElemDiv>
          <SElemDiv>
            <SP>25년 이상</SP>
          </SElemDiv>
        </SMoveInDataDiv>

        <SPriceDiv>
          <SP>가격</SP>
          <SElemDiv>
            <SP>bar</SP>
          </SElemDiv>
        </SPriceDiv>
        <SFilterDiv>
          <div></div>
          <Button
          style={{right: 0}}
          title="상세 필터"
          onClick={() => {
            navigate("/filterdetail");
          }}
          />
        </SFilterDiv>
      </Container>
    </Wrapper>
  );
};

export default Filter