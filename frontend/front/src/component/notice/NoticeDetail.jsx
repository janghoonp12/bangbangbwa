import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../../noticeData.json";
import styled from "styled-components";

const SButton = styled.button`
  margin: auto;
  display: block;
`

const SP = styled.p`
  margin-right: 20px;
  text-align: right;
  font-size: 20px;
`

const SHr = styled.hr`
  border: 0;
  height: 3px;
  background: #000000;
`


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
    <div>
      <h1 align="center">[{post.type}] {post.title}</h1>
      <hr />
      <SP align="right">{post.regidate}</SP>
      <hr />
      <br />
      <p align="center">{post.contents}</p>
      <SHr />
      <SButton onClick={goBack}>뒤로가기</SButton>
    </div>
  )
}

export default ItemDetail;