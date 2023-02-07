import React, { useState } from "react";
import data from "../../data.json";
import InterestItemList from "./InterestItemList";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadMore from "../common/ui/LoadMore";


const SDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SH3 = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const SButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

function InterestItem() {
  const navigate = useNavigate();

  const limit = 12; // 한 페이지에 나올 방송 수
  const [loads, setLoads] = useState(1); // 더보기 클릭 횟수
  const offset = limit * loads; // 더보기 클릭할 때 마다 limit개의 방송이 추가됨

  return (
    <div>
      <SH3 align="center">관심 매물</SH3>
      <SDiv>
        <InterestItemList
            posts={data.slice(0, offset)}
            onClickItem={(item) => {
                navigate(`/items/${item.id}`);
            }}
          />
      </SDiv>
      <SButtonDiv>
        <LoadMore 
          total={data.length}
          limit={limit}
          loads={loads}
          setLoads={setLoads}
        />
      </SButtonDiv>
    </div>
  )
}

export default InterestItem;