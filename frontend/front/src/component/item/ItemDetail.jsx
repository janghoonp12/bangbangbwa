import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { searchInterestDetailAsync, changeInterest, addInterestAsync, deleteInterestAsync } from "../../reducers/itemSlice";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Swal from "sweetalert2";

// import logosample from "../../assets/logosample.png"

const Container = styled.div`    
  width: 100%;
  max-width: 100%;
  border: 1px solid grey;
  border-radius: 8px;
`;

const SGridDiv = styled.div`
  display: grid;
  // grid-template-columns: 0.6fr 0.4fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    "div";
`;

const SPicLeftDiv = styled.div`
  width: 100%;
  max-width: 100%;
  height: 50vh;
  max-height: 100%;
  overflow: hidden;
`;

const SPicRightDiv = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 0.7fr;
  width: 100%;
  max-width: 100%;
  height: 30vh;
  // max-height: 100%;
  overflow: hidden;
`;

const SPicDiv = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 85%;
  border: 1px solid grey;
  border-radius: 8px;
`;

const SPicsDiv = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 15%;
  border: 0px solid grey;
  border-radius: 8px;
`;

const SBroadcastDiv = styled.div`
  width: 100%;
  max-width: 100%;
  // height: 50%;
  // max-height: 50%;
  border: 1px solid grey;
  border-radius: 8px;
`;

const SMapDiv = styled.div`
  width: 100%;
  max-width: 100%;
  // height: 50%;
  // max-height: 50%;
  border: 1px solid grey;
  border-radius: 8px;
`;

const SInfoDiv = styled.div`
  // display: grid;
  // grid-template-areas:
  //   "div div div div"
  display: flex;
  flex-wrap: wrap;
`;

const SPTag = styled.p`
  border: 0px solid grey;
  // border-radius: 8px;
  margin-right: 1rem;
`;

const Sbutton = styled.button`
  float: right;
  margin-top: 5px;
  border-radius: 8px;
  border: 0.5px solid lightgrey;
  background-color: rgba(255, 17, 0, 0.2);

  :hover {
    border: 1px solid black;
  }
`;

// const ImgTag = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
// `;

function ItemDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [broadcastInfo, setBroadcastInfo] = useState('');

  const { interest } = useSelector((state) => state.itemSlice);
  const { me } = useSelector((state) => state.userSlice);

  const goBack = () => {
    navigate(-1);
  }
  const { itemDetail } = useSelector((state) => state.itemSlice);
  useEffect(() => {
    if (me !== null) {
      dispatch(searchInterestDetailAsync(itemDetail.item_id))
    }
    let recentItemData = JSON.parse(sessionStorage.getItem("recentItemData"))
    if (recentItemData === null) {
      sessionStorage.setItem("recentItemData", JSON.stringify([itemDetail]));
    } else {
      let status = true
      for (let i = 0; i < recentItemData.length; i++) {
        if (recentItemData[i].item_id === itemDetail.item_id) {
          status = false
          break
        }
      }
      if (status) {
        recentItemData.push(itemDetail)
        sessionStorage.setItem("recentItemData", JSON.stringify(recentItemData));
      }
    }
    // 마커
    var marker = [
      {
          position: new window.kakao.maps.LatLng(itemDetail.item_lng, itemDetail.item_lat), 
          text: itemDetail.item_title
      }
    ];

    // 카카오 지도
    var mapContainer  = document.getElementById('map')
    var options = {
      center: new window.kakao.maps.LatLng(itemDetail.item_lng, itemDetail.item_lat), 
      level: 5,
      marker: marker
    };
    var map = new window.kakao.maps.StaticMap(mapContainer, options)

    // 카카오 로드뷰
    var roadviewContainer = document.getElementById('roadview'); 
    var roadview = new window.kakao.maps.Roadview(roadviewContainer); 
    var roadviewClient = new window.kakao.maps.RoadviewClient(); 

    var position = new window.kakao.maps.LatLng(itemDetail.item_lng, itemDetail.item_lat);

    roadviewClient.getNearestPanoId(position, 50, function(panoId) {
      roadview.setPanoId(panoId, position); 
    });

    // 해당 매물의 방송 등록 여부
    axios.get(`/broadcasts/item/${itemDetail.item_id}`)
    .then(res => setBroadcastInfo(res.data))  // broadcastStatus === 1 일때만 방송정보에 띄우기
    .catch(err => console.log(err))

  }, [])

  const interestClick = () => {
    if (me) {
      if (interest) {
        dispatch(deleteInterestAsync(itemDetail.item_id))
      } else {
        dispatch(addInterestAsync(
          {
            itemId: itemDetail.item_id
          }
        ))
        console.log(interest)
      }
    }else {
      Swal.fire({
        icon: 'info',
        title: '회원만 사용하실수 있습니다.',
        showConfirmButton: false,
        timer: 500
      })
    }
    // dispatch(changeInterest())
  }

  return (
    <div style={{justifyContent: 'center', display: 'flex'}}>
      <Container>
        <SGridDiv>
          <SPicLeftDiv>FavoriteIcon
            <SPicsDiv>
              <h1 style={{display: 'inline-block'}}>{itemDetail.item_title}</h1>
              { !interest && <FavoriteBorderIcon style={{float: 'right', fontSize: '40px', color: 'red', cursor: 'pointer'}} onClick={interestClick}/>}
              { interest && <FavoriteIcon style={{float: 'right', fontSize: '40px', color: 'red', cursor: 'pointer'}} onClick={interestClick}/>}
            </SPicsDiv>
            <SPicDiv id="roadview">
            </SPicDiv>
          </SPicLeftDiv>
          <SPicRightDiv>
            <SBroadcastDiv>
              <h1>방송정보</h1>
              {/* <ImgTag src={logosample} alt="이미지" /> */}
            </SBroadcastDiv>
            <SMapDiv id="map">
            </SMapDiv>
          </SPicRightDiv>
        </SGridDiv>
        
        <h1>매물 상세 정보</h1>
        <SInfoDiv>
          <SPTag>#매물이름: {itemDetail.item_title}</SPTag>
          <SPTag>#매물종류: {itemDetail.item_deal_type === 0 ? '월세' : itemDetail.item_deal_type === 1 ? '전세' : '매매'}</SPTag>
          <SPTag>#건물유형: {itemDetail.item_building_type === 0 ? '원룸' : itemDetail.item_building_type === 1 ? '투,쓰리룸' : itemDetail.item_building_type === 2 ? '오피스텔' : '아파트'}</SPTag>
          <SPTag>#관리비용: {itemDetail.item_manage_fee}</SPTag>
          <SPTag>#위치: {itemDetail.item_dong}</SPTag>
          <SPTag>#공급면적: {itemDetail.item_supply_area}</SPTag>
          <SPTag>#전용면적: {itemDetail.item_exclusive_area}</SPTag>
          <SPTag>#방: {itemDetail.item_room}</SPTag>
          <SPTag>#화장실: {itemDetail.item_toilet}</SPTag>
          <SPTag>#총 층수: {itemDetail.item_total_floor}</SPTag>
          <SPTag>#해당 층: {itemDetail.item_floor}</SPTag>
          <SPTag>
            #{itemDetail.item_move_in_type === 0 ? '즉시 입주 가능' : `입주 가능일 : ${itemDetail.item_move_in_date}`}
          </SPTag>
        </SInfoDiv>
        <hr />
        <SPTag style={{fontSize: '2rem'}}>매물 설명</SPTag>
        <SInfoDiv>
          {/* <pre style={{wordWrap: 'break-word'}}> */}
          <pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-all', overflow: 'auto'}}>
            {itemDetail.item_description}
          </pre>
        </SInfoDiv>
        <Sbutton onClick={goBack}>뒤로가기</Sbutton>
      </Container>
    </div>
  )
}

export default ItemDetail;