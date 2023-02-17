import React from "react";
import styled from "styled-components";
import itemImage from "../../assets/logo.png"
import { useDispatch } from 'react-redux';
import { searchDetailItemAsync, DeleteItemAsync, deleteMyItem, choiceItemDetail } from "../../reducers/itemSlice"
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import Swal from "sweetalert2";


const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border: 1px solid grey;
  border-radius: 8px;
  background: white;
`;

const STitleTextP = styled.p`
  font-size: 20px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
`;

const SContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SContentTextP = styled.p`
  display: flex;
  font-size: 15px;
  margin-right: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SItemImg = styled.img`
  height: 100px;
  width: 100px;
`;

const STextDiv = styled.div`
  text-align: left;
  margin-top: 15px;
  margin-left: 20px;
`;

function PostListItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ifnoItem = () => {
    dispatch(searchDetailItemAsync(props.post.item.item_id))
  }
  const modify = () => {
    dispatch(choiceItemDetail(props.post))
    navigate(`/items/modify/${props.post.item.item_id}`)
  }
  const deleteItem = () => {
    dispatch(DeleteItemAsync(props.post.item.item_id))
    dispatch(deleteMyItem(props.post.item.item_id))
    Swal.fire({
      icon: 'success',
      title: '매물 삭제 성공!',
      showConfirmButton: false,
      timer: 500
    })
  }

  return (
    <Wrapper>
      <div>
        <SItemImg src={itemImage} alt="이미지샘플"/>
      </div>
      <STextDiv>
        <STitleTextP>{props.post.item.item_title}</STitleTextP>
        <SContentDiv>
          <SContentTextP>{props.post.item.item_type}</SContentTextP>
          <SContentTextP>{props.post.item.item_building_type}</SContentTextP>
          <SContentTextP>{props.post.item.item_manage_fee}</SContentTextP>
        </SContentDiv>
      </STextDiv>
      <STextDiv>
        <SContentDiv>
        <Button onClick={ifnoItem}>조회</Button><Button type="primary" onClick={modify}>수정</Button><Button danger onClick={deleteItem}>삭제</Button>
        </SContentDiv>
      </STextDiv>
      
    </Wrapper>
  );
}

export default PostListItem