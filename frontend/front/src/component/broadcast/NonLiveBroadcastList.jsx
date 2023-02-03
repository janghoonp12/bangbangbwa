import React, { useState } from "react";
import NonLiveBroadcastListItem from "./NonLiveBroadcastListItem";
import datas from "../../data.json";
import styled from "styled-components";
import Filter from "../common/Filter";
import LoadMore from "../common/ui/LoadMore";

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

function NonLiveBroadcastList() {

  const limit = 12; // 한 페이지에 나올 방송 수
  const [loads, setLoads] = useState(1); // 더보기 클릭 횟수
  const offset = limit * loads; // 더보기 클릭할 때 마다 limit개의 방송이 추가됨

  return (
    <div>
    <Filter />
    <h2 style={{marginTop : '10px'}}>지난 방송 목록</h2>
      <Wrapper>
        {datas.slice(0, offset).map((data, index) => {
          return (
            <NonLiveBroadcastListItem
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

export default NonLiveBroadcastList;