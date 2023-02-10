import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../../noticeData.json";
import styled from "styled-components";
import sample from "../../assets/logosample.png"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 70%;
  border-top: 2px solid black;
  margin-top: 50px;
`;

const STitleDiv = styled.div`
  height: 100px;
  display: flex;
`;

const SContentDiv = styled.div`
  border-top: 0.5px solid lightgrey;
  border-bottom: 0.5px solid lightgrey;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  min-height: 500px;
`;

const SButton = styled.button`
  margin-top: 30px;
  float: right;
  width: 100px;
  height: 50px;
  font-size: 20px;
  border-radius: 8px;
  background-color: rgba(3, 28, 252, 0.2);
  border: 0.5px solid lightgrey;

  :hover {
    border: 1px solid black;
    background-color: rgba(3, 28, 252, 0.4);
  }
`;


function ItemDetail() {
  const navigate = useNavigate();
  const {postId} = useParams();
  const notice = data.find((item) => {
    return parseInt(item.id) === parseInt(postId);
  });
  const goBack = () => {
    navigate(-1);
  }
  // 임시 테스트

  return (
    <Wrapper>
      <h1 style={{marginTop: '50px'}}>공지사항</h1>
      <Container>
        <STitleDiv>
          <div style={{width: '15%', lineHeight: '100px'}}>
            <p style={{fontSize: '30px', color: 'grey', fontWeight: '400', marginLeft: '30px'}}>[{notice.type}]</p>
          </div>
          <div style={{width: '70%', lineHeight: '100px', marginLeft: '20px'}}>
            <p style={{fontSize: '30px'}}>{notice.title}</p>
          </div>
          <div style={{width: '15%', lineHeight: '100px'}}>
            <p style={{fontSize: '30px', textAlign: 'center'}}>{notice.regidate}</p>
          </div>
        </STitleDiv>
        <SContentDiv>
          <p style={{fontSize: '20px'}}>{notice.contents}</p>
          <img src={sample} alt="#" />
        </SContentDiv>
        <SButton onClick={goBack}>뒤로가기</SButton>
      </Container>
    </Wrapper>
  )
}

export default ItemDetail;
