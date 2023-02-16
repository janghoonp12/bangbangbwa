import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

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
  const { noticeDetail } = useSelector((state) => state.noticeSlice);
  const { me } = useSelector((state) => state.userSlice);

  // const notice = data.find((item) => {
  //   return parseInt(item.id) === parseInt(postId);
  // });
  const goBack = () => {
    navigate(-1);
  }
  const goModify = () => {
    navigate(`/notices/modify/${noticeDetail.notice_id}`)
  }

  return (
    <Wrapper>
      <h1 style={{marginTop: '50px'}}>공지사항</h1>
      <Container>
        <STitleDiv>
          <div style={{width: '15%', lineHeight: '100px'}}>
            <p style={{fontSize: '30px', color: 'grey', fontWeight: '400', marginLeft: '30px'}}>[{noticeDetail.notice_type}]</p>
          </div>
          <div style={{width: '70%', lineHeight: '100px', marginLeft: '20px'}}>
            <p style={{fontSize: '30px'}}>{noticeDetail.notice_title}</p>
          </div>
          <div style={{width: '15%', lineHeight: '100px'}}>
            <p style={{fontSize: '30px', textAlign: 'center'}}>{noticeDetail.notice_regidate}</p>
          </div>
        </STitleDiv>
        <SContentDiv>
          <p style={{fontSize: '20px'}}>{noticeDetail.notice_comment}</p>
        </SContentDiv>
        <SButton onClick={goBack}>뒤로가기</SButton>
        {me ? <SButton onClick={goModify}>수정</SButton> : <></>}
      </Container>
    </Wrapper>
  )
}

export default ItemDetail;