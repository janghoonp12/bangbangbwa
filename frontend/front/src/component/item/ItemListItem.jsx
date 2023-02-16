import React, { useEffect } from "react";
// import Card from 'react-bootstrap/Card';
import styled from "styled-components";
import throttle from "../../utils/Throttle"
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
  font-size: 30px;
`;

const SCardContentP = styled.p`
  font-size: 20px;
`;

// TitleText를 이용해서 props로 받은 post객체내의 title문자열을 표시해준다
function ItemListItem(props) {
  const dispatch = useDispatch();
  const item = props.posts
  const itemType = (item.item.item_type === 0) ? '원룸' : (item.item.item_type === 1) ? '투,쓰리룸' : (item.item.item_type === 2) ? '오피스텔' : '아파트'
  const dealType = (item.item.item_deal_type === 0) ? '월세' : (item.item.item_deal_type === 0) ? '전세' : '매매'
  const price = (dealType === '월세') ? `${item.itemPrice.item_price_month_deposit}/${item.itemPrice.item_price_month_rent}` : (dealType === '전세') ? item.itemPrice.item_price_house_deposit : item.itemPrice.item_price_buy_house
   

  // useEffect(() => {
  //   var marker = [
  //     {
  //         position: new window.kakao.maps.LatLng(item.item.item_lng, item.item.item_lat), 
  //         text: item.item.item_title
  //     }
  //   ];
  //   console.log(item.item.item_lat, item.item.item_lng)
  //   // 카카오 지도
  //   var mapContainer  = document.getElementById('map')

  //   var options = {
  //     center: new window.kakao.maps.LatLng(item.item.item_lng, item.item.item_lat), 
  //     level: 5,
  //     marker: marker
  //   };
  //   var map = new window.kakao.maps.StaticMap(mapContainer, options)
  // }, [item])


  useKakaoMap(item);

  const imgClick = (e) => {
    e.preventDefault();
  }

  const onClick = () => {
    dispatch(searchDetailItemAsync(props.posts.item.item_id))
  }
  
  return (
      <SCardDiv onDoubleClick={onClick}>
        <SImgDiv onDoubleClick={onClick} onClick={imgClick} id={item.item.item_id}> </SImgDiv>
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