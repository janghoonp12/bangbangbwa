import React from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { searchDetailItemAsync } from "../../reducers/itemSlice"
import useKakaoMap from "../../hooks/useKakaoMap"


const SCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 400px;
  margin-left: 25px;
  margin-right: 5px;
  margin-bottom: 0px;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  :hover {
    background: lightgrey;
  }
  text-align: center;
`;


const SImgDiv = styled.div`
  width: 248px;
  height: 250px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const SCardBodyDiv = styled.div`
  // width: 100%;
`;

const SCardTitleP = styled.p`
  margin-top: 10px;
  font-size: 1.5rem;
`;

const SCardContentP = styled.p`
  font-size: 1.2rem;
`;


function ItemListItem(props) {
  const dispatch = useDispatch();
  const item = props.posts
  const itemType = (item.item.item_type === 0) ? '원룸' : (item.item.item_type === 1) ? '투,쓰리룸' : (item.item.item_type === 2) ? '오피스텔' : '아파트'
  const dealType = (item.item.item_deal_type === 0) ? '월세' : (item.item.item_deal_type === 0) ? '전세' : '매매'
  const price = (dealType === '월세') ? `${item.itemPrice.item_price_month_deposit}/${item.itemPrice.item_price_month_rent}` : (dealType === '전세') ? item.itemPrice.item_price_house_deposit : item.itemPrice.item_price_buy_house

  useKakaoMap(item);

  const imgClick = (e) => {
    e.preventDefault();
  }

  const onClick = () => {
    dispatch(searchDetailItemAsync(props.posts.item.item_id))
  }
  
  return (
      <SCardDiv onDoubleClick={onClick}>
        <SImgDiv onClick={imgClick} id={item.item.item_id}> </SImgDiv>
        <SCardBodyDiv>
          <SCardTitleP>{props.posts.item.item_title}</SCardTitleP>
          <SCardContentP>
            {itemType} |&nbsp;
            {dealType} |&nbsp;
            {price}
          </SCardContentP>
        </SCardBodyDiv>
      </SCardDiv>
    )
}

export default ItemListItem