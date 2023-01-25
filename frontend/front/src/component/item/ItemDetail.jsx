import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../../data.json";

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
      <h1>매물 상세 정보</h1>
      <p>{post.title}</p>
      <p>{post.type}</p>
      <p>{post.building_type}</p>
      <p>{post.manage_fee}</p>
      <button onClick={goBack}>뒤로가기</button>
    </div>
  )
}

export default ItemDetail;