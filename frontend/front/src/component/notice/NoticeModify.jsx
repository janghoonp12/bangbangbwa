import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import Button from "../common/ui/Button";
import { modifyNoticeAsync, deleteNoticeAsync, clearModifyNoticeDone, clearDeleteNoticeDone } from "../../reducers/noticeSlice"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useInput from '../../hooks/useInput';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Container = styled.div`
  // display: flex;
  width: 100%;
  max-width: 70%;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const SGridDiv = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 0.75fr;
`;


const SSelect = styled.select`
  width: 200px;
  height: 40px;

  :invalid {
    color: red;
  }
`;

const STitleP = styled.p`
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  font-size: 20px;
`;




function NoticeModify() {
  const navigate = useNavigate();
  const { noticeDetail, modifyNoticeDone, deleteNoticeDone } = useSelector((state) => state.noticeSlice);
  const [type, setType] = useInput(noticeDetail ? noticeDetail.notice_type : '');
  const [title, setTitle] = useInput(noticeDetail ? noticeDetail.notice_title : '');
  const [comment, setComment] = useState(noticeDetail ? noticeDetail.notice_comment : '');

  // const { writeNoticeDone } = useSelector((state) => state.noticeSlice);
  console.log(noticeDetail)
  const dispatch = useDispatch();
  

  useEffect(() => {
    if (modifyNoticeDone) {
      dispatch(clearModifyNoticeDone())
      navigate(-1)
    }

    if (deleteNoticeDone) {
      dispatch(clearDeleteNoticeDone())
      navigate(-1)
    }
  })

  // useEffect(() => {
  //   if (writeNoticeDone) {
  //     navigate('/notices');
  //   }
  // })

  const ModifyNotice = () => {
    dispatch(modifyNoticeAsync(
      {
        'notice_id': noticeDetail.notice_id,
        'notice_type': type,
        'notice_title': title,
        'notice_comment': comment,
      }
    ))
  }
    const DeleteNotice = () => {
      dispatch(deleteNoticeAsync(
        {
          'notice_id' : noticeDetail.notice_id
        }
      ))
  }

  return (
    <Wrapper>
      <Container>
        <h1>공지사항 작성</h1>
        <SGridDiv style={{marginTop: "5%"}}>
          <STitleP>분류</STitleP>
          <SSelect value={type} required onChange={setType}>
          <option value="default" style={{display: "none"}}>분류를 선택하세요</option>
          <option value="점검">점검</option>
          <option value="안내">안내</option>
          <option value="회식">회식</option>
          <option value="기타">기타</option>
          </SSelect>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>공지 제목</STitleP>
          <input value={title} required onChange={setTitle} placeholder=" 제목을 입력하세요." />
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>공지 내용</STitleP>
          <ReactQuill value={comment} required onChange={setComment}/>
        </SGridDiv>
        <hr />
        <div style={{float: "left"}}>
          <Button
            title="삭제하기"
            onClick={DeleteNotice}
            />
        </div>
        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <Button
            title="수정하기"
            onClick={ModifyNotice}
            />
        </div>
      </Container>
    </Wrapper>
  )
}

export default NoticeModify;