import React, { useState, useEffect } from "react";
import data from "../../data.json";
import ItemList from "./ItemList";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Filter from "../common/Filter";
import FilterButton from "../common/FilterButton";
import styled from "styled-components";
import LoadMore from "../common/ui/LoadMore";
import { useDispatch, useSelector } from 'react-redux';
import { firstSearchItemAsync } from "../../reducers/itemSlice"
import ItemListItem from "./ItemListItem";


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

function Items() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const writeItem = () => {
    navigate("/writeitems")
  }

  const limit = 12; // 한 페이지에 나올 방송 수
  const [loads, setLoads] = useState(1); // 더보기 클릭 횟수
  const offset = limit * loads; // 더보기 클릭할 때 마다 limit개의 방송이 추가됨

  const { items } = useSelector((state) => state.itemSlice);

  useEffect(() => {
    dispatch(firstSearchItemAsync(
      {
        page: 0,
        size: 12,
      }
    ))
    console.log(items)
  },[])

  return (
    <div>
      <SButtonLineDiv>
        <Button variant="info" onClick={writeItem} style={{marginBottom: '10px'}}>매물 등록</Button>
        <div />
        <FilterButton />
      </SButtonLineDiv>
      <div id="filterDiv" style={{ display: "none" }}>
        <Filter />
      </div>
      <ItemList>
      {items ? items.map((item, index) => (
        <ItemListItem
          posts={item}
        />
      )
        ) : <label>no data</label>}
      </ItemList>
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

export default Items;