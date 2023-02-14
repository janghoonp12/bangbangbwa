import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import Filter from "../common/Filter";
import FilterButton from "../common/FilterButton";
import styled from "styled-components";
import LoadMore from "../common/ui/LoadMore";
import SearchItem from "./SearchItem";
import SearchBroadcast from "./SearchBroadcast";
import axios from "axios";


const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 30px;
    align-items: flex-start;
    justify-content: center;
    white-space: nowrap;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
    &::-webkit-scrollbar {
      display: none;
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

function ItemSearchAll() {

  const limit = 12; // 한 페이지에 나올 방송 수
  const [loads, setLoads] = useState(1); // 더보기 클릭 횟수
//   const offset = limit * loads; // 더보기 클릭할 때 마다 limit개의 방송이 추가됨


  // 검색 axios 요청
  const [broadcasts, setBroadcasts] = useState('');
  const [items, setItems] = useState('');
  const { searchWord } = useParams();
  const [keyword, dongCode] = searchWord.split('&');
  useEffect(() => {
    const baseURL = '/search?'

    if (keyword && dongCode) {
      axios.get(`${baseURL}dongCode=${dongCode}&keyword=${keyword}`)
      .then(res => {
        setItems(res.data.dataB)
        setBroadcasts(res.data.dataD)
      })
      .catch(err => console.log(err))
      
    } else if (keyword) {
      axios.get(`${baseURL}keyword=${keyword}`)
      .then(res => {
        setItems(res.data.dataB)
        setBroadcasts(res.data.dataD)
        console.log(res.data.dataD)
      })
      .catch(err => console.log(err))
    } else if (dongCode) {
      axios.get(`${baseURL}dongCode=${dongCode}`)
      .then(res => {
        setItems(res.data.dataB)
        setBroadcasts(res.data.dataD)
      })
      .catch(err => console.log(err))  
    }

    console.log(items)
  }, [keyword, dongCode])

  return (
    <div>
      <SButtonLineDiv>
        <div />
        <FilterButton />
      </SButtonLineDiv>
      <div id="filterDiv" style={{ display: "none" }}>
        <Filter />
      </div>
      <Wrapper>
        <h2>방송 검색 결과</h2>
      </Wrapper>
      <ItemList>
      {broadcasts && broadcasts.length ? broadcasts.map((broadcast, index) => (
        <SearchBroadcast
        broadcast={broadcast}
        />
      )
        ) : <h3>검색 결과가 없습니다...</h3>}
      </ItemList>
      
      <SButtonDiv>
        {broadcasts ?
        <LoadMore 
          total={broadcasts.length}
          limit={limit}
          loads={loads}
          setLoads={setLoads}
        /> : null}
      </SButtonDiv>
      <hr />
      <br />
      <Wrapper>
        <h2>매물 검색 결과</h2>
      </Wrapper>
      <ItemList>
      {items && items.length ? items.map((item, index) => (
        <SearchItem
          item={item}
        />
      )
        ) : <h3>검색 결과가 없습니다...</h3>}
      </ItemList>
      
      <SButtonDiv>
        {items ?
        <LoadMore 
          total={items.length}
          limit={limit}
          loads={loads}
          setLoads={setLoads}
        /> : null}
      </SButtonDiv> 
    </div>
  )
}

export default ItemSearchAll;