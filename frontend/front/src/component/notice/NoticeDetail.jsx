import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../../noticeData.json";
import styled from "styled-components";

const StyledBtn = styled.button`
  margin: auto;
  display: block;
`

const StyledP = styled.p`
  margin-right: 20px;
  text-align: right;
  font-size: 20px;
`

const StyledHr = styled.hr`
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
      <StyledP align="right">{post.regidate}</StyledP>
      <hr />
      <br />
      <p align="center">{post.contents}</p>
      <StyledHr />
      <StyledBtn onClick={goBack}>뒤로가기</StyledBtn>
    </div>
  )
}

export default ItemDetail;