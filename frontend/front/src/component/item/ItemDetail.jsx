import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../../data.json";
import styled from "styled-components";
// import logosample from "../../assets/logosample.png"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`    
  width: 100%;
  max-width: 70%;
  border: 1px solid grey;
  border-radius: 8px;
`;

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 0.4fr;
  grid-template-areas:
    "div div";
`;

const PicLeftDiv = styled.div`
  width: 100%;
  max-width: 100%;
  height: 50vh;
  max-height: 100%;
  overflow: hidden;
`;

const PicRightDiv = styled.div`
  width: 100%;
  max-width: 100%;
  height: 50vh;
  max-height: 100%;
  overflow: hidden;
`;

const PicDiv = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 85%;
  border: 1px solid grey;
  border-radius: 8px;
`;

const PicsDiv = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 15%;
  border: 1px solid grey;
  border-radius: 8px;
`;

const BroadcastDiv = styled.div`
  width: 100%;
  max-width: 100%;
  height: 50%;
  max-height: 50%;
  border: 1px solid grey;
  border-radius: 8px;
`;

const MapDiv = styled.div`
  width: 100%;
  max-width: 100%;
  height: 50%;
  max-height: 50%;
  border: 1px solid grey;
  border-radius: 8px;
`;

const InfoDiv = styled.div`
  display: grid;
  grid-template-areas:
    "div div div div"
`;

const StyledPTag = styled.p`
  border: 1px solid grey;
  border-radius: 8px;
`;

// const ImgTag = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
// `;

function ItemDetail() {
  const navigate = useNavigate();
  const {postId} = useParams();
  const post = data.find((item) => {
    return parseInt(item.id) === parseInt(postId);
  });
  const goBack = () => {
    navigate(-1);
  }

  return (
    <Wrapper>
      <Container>
        <GridDiv>
          <PicLeftDiv>
            <PicDiv>
              <h1>매물사진</h1>
              {/* <ImgTag src={logosample} alt="이미지" /> */}
            </PicDiv>
            <PicsDiv>
              <h1>자세한사진들</h1>
            </PicsDiv>
          </PicLeftDiv>
          <PicRightDiv>
            <BroadcastDiv>
              <h1>방송정보</h1>
              {/* <ImgTag src={logosample} alt="이미지" /> */}
            </BroadcastDiv>
            <MapDiv>
              <h1>지도</h1>
              {/* <ImgTag src={logosample} alt="이미지" /> */}
            </MapDiv>
          </PicRightDiv>
        </GridDiv>
        
        <h1>매물 상세 정보</h1>
        <InfoDiv>
          <StyledPTag>매물이름: {post.title}</StyledPTag>
          <StyledPTag>매물종류: {post.type}</StyledPTag>
          <StyledPTag>건물유형: {post.building_type}</StyledPTag>
          <StyledPTag>관리비용: {post.manage_fee}</StyledPTag>
          <StyledPTag>매물이름: {post.title}</StyledPTag>
          <StyledPTag>매물종류: {post.type}</StyledPTag>
          <StyledPTag>건물유형: {post.building_type}</StyledPTag>
          <StyledPTag>관리비용: {post.manage_fee}</StyledPTag>
          <StyledPTag>매물이름: {post.title}</StyledPTag>
          <StyledPTag>매물종류: {post.type}</StyledPTag>
          <StyledPTag>건물유형: {post.building_type}</StyledPTag>
          <StyledPTag>관리비용: {post.manage_fee}</StyledPTag>
          <StyledPTag>매물이름: {post.title}</StyledPTag>
          <StyledPTag>매물종류: {post.type}</StyledPTag>
          <StyledPTag>건물유형: {post.building_type}</StyledPTag>
          <StyledPTag>관리비용: {post.manage_fee}</StyledPTag>
          <StyledPTag>매물이름: {post.title}</StyledPTag>
          <StyledPTag>매물종류: {post.type}</StyledPTag>
          <StyledPTag>건물유형: {post.building_type}</StyledPTag>
          <StyledPTag>관리비용: {post.manage_fee}</StyledPTag>
          <StyledPTag>매물이름: {post.title}</StyledPTag>
          <StyledPTag>매물종류: {post.type}</StyledPTag>
          <StyledPTag>건물유형: {post.building_type}</StyledPTag>
          <StyledPTag>관리비용: {post.manage_fee}</StyledPTag>
        </InfoDiv>
        <button onClick={goBack}>뒤로가기</button>
      </Container>
    </Wrapper>
  )
}

export default ItemDetail;