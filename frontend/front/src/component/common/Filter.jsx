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
  cursor: pointer;
  background: #F8EDE3
  // :hover {
  //   background: lightgrey;
  // }
`;

const Container = styled.div`
  width: 100%;
  max-width: 80%;
`;

const SElemDiv = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 8px;
`;

// 주거형태type 거래방식deal_type 면적supply_area 사용승인일move_in_data 거래금액 없는디
const STypeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "div div div div div div";
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
      </Container>
    </Wrapper>
  );
};

export default Filter