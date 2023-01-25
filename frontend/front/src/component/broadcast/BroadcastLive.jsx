import React from "react";
import data from "../../data.json";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Card from 'react-bootstrap/Card';
import sample from "../../assets/logosample.png";

const Wrapper = styled.div`
  text-align: center;
`

const InnerDiv = styled.div`
  display: inline-block;
`


function BroadcastLive() {
  const navigate = useNavigate();
  const {postId} = useParams();
  const post = data.find((item) => {
      return parseInt(item.id) === parseInt(postId);
  });

  return (
    <Wrapper>
      <InnerDiv>
      <Card style={{ width: '18rem', height: '30rem' }}>
        <Card.Body>
          <Card.Title>라이브 방송 화면</Card.Title>
          <Card.Img src={sample} alt="방송 화면" />
          <Card.Text>
            {post.title}
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
        <button
          onClick={() => {
            navigate(-1);
          }}>뒤로가기</button>
      </InnerDiv>
    </Wrapper>
  )
}

export default BroadcastLive;