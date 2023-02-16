import React, { useEffect, useState } from "react";
import data from "../../data.json";
import InterestItemList from "./InterestItemList";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadMore from "../common/ui/LoadMore";
import { useDispatch, useSelector } from 'react-redux';
import { searchInterestAllAsync } from "../../reducers/itemSlice";
import RecentViewList from "./RecentViewList";
import RecentViewListItem from "./RecentViewListItem";


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
  const dispatch = useDispatch();

  const limit = 12; // 한 페이지에 나올 방송 수
  const [loads, setLoads] = useState(1); // 더보기 클릭 횟수
  const offset = limit * loads; // 더보기 클릭할 때 마다 limit개의 방송이 추가됨

  const { myInterests } = useSelector((state) => state.itemSlice);

  useEffect(() => {
    dispatch(searchInterestAllAsync())
    console.log(myInterests)
  },[])

  return (
    <div>
      <SH3 align="center">관심 매물</SH3>
      <SDiv>
      <RecentViewList>
        { myInterests ? myInterests.map((item, index) => (
        <RecentViewListItem
          item={item}
        />
      )
        ) : <label>no data</label>}
        </RecentViewList>
      </SDiv>
    </div>
  )
}

export default InterestItem;