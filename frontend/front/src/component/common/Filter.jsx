import React from "react";
import styled from "styled-components";


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

function Filter() {
  return (
    <Wrapper>
      <Container>
        <STypeDiv>
          <p>주거형태</p>
          <SElemDiv>
            <p>전체</p>
          </SElemDiv>
          <SElemDiv>
            <p>아파트</p>
          </SElemDiv>
          <SElemDiv>
            <p>오피스텔</p>
          </SElemDiv>
          <SElemDiv>
            <p>빌라</p>
          </SElemDiv>
          <SElemDiv>
            <p>주택</p>
          </SElemDiv>
        </STypeDiv>

        <SDealTypeDiv>
          <p>거래방식</p>
          <SElemDiv>
            <p>전체</p>
          </SElemDiv>
          <SElemDiv>
            <p>매매</p>
          </SElemDiv>
          <SElemDiv>
            <p>전세</p>
          </SElemDiv>
          <SElemDiv>
            <p>월세</p>
          </SElemDiv>
          <SElemDiv>
            <p>단기임대</p>
          </SElemDiv>
        </SDealTypeDiv>

        <SSupplyAreaDiv>
          <p>면적</p>
          <SElemDiv>
            <p>전체</p>
          </SElemDiv>
          <SElemDiv>
            <p>10평 이하</p>
          </SElemDiv>
          <SElemDiv>
            <p>10평</p>
          </SElemDiv>
          <SElemDiv>
            <p>20평</p>
          </SElemDiv>
          <SElemDiv>
            <p>30평</p>
          </SElemDiv>
          <SElemDiv>
            <p>40평</p>
          </SElemDiv>
          <SElemDiv>
            <p>50평 이상</p>
          </SElemDiv>
        </SSupplyAreaDiv>

        <SMoveInDataDiv>
          <p>사용 승인일</p>
          <SElemDiv>
            <p>전체</p>
          </SElemDiv>
          <SElemDiv>
            <p>입주 예정</p>
          </SElemDiv>
          <SElemDiv>
            <p>5년</p>
          </SElemDiv>
          <SElemDiv>
            <p>10년</p>
          </SElemDiv>
          <SElemDiv>
            <p>15년</p>
          </SElemDiv>
          <SElemDiv>
            <p>20년</p>
          </SElemDiv>
          <SElemDiv>
            <p>25년 이상</p>
          </SElemDiv>
        </SMoveInDataDiv>

        <SPriceDiv>
          <p>가격</p>
          <SElemDiv>
            <p>bar</p>
          </SElemDiv>
        </SPriceDiv>
      </Container>
    </Wrapper>
  );
};

export default Filter