import React, { useState } from "react";
import LiveBroadcastListItem from "./LiveBroadcastListItem";
import datas from "../../data.json";
import styled from "styled-components";
import Filter from "../common/Filter";
import LoadMore from "../common/ui/LoadMore";
import FilterButton from "../common/FilterButton";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  & > * {
    :not(:last-child) {
      margin-bottom: 15px;
    }
  }
`;

const SButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const SButtonLineDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr 2fr;
`;

function LiveBroadcastList() {

  const limit = 12; // 한 페이지에 나올 방송 수
  const [loads, setLoads] = useState(1); // 더보기 클릭 횟수
  const offset = limit * loads; // 더보기 클릭할 때 마다 limit개의 방송이 추가됨

  return (
    <div>
      <SButtonLineDiv>
        <div />
        <div />
        <FilterButton />
      </SButtonLineDiv>
      <div id="filterDiv" style={{ display: "none" }}>
        <Filter />
      </div>
      <h2 style={{marginTop : '10px'}}>라이브 방송 목록</h2>
      <Wrapper>
        {datas.slice(0, offset).map((data, index) => {
          return (
            <LiveBroadcastListItem
              key={data.id}
              data={data}
            />
          );
        })}
      </Wrapper>
      <SButtonDiv>
        <LoadMore 
          total={datas.length}
          limit={limit}
          loads={loads}
          setLoads={setLoads}
        />
      </SButtonDiv>
    </div>
  )
}

export default LiveBroadcastList;