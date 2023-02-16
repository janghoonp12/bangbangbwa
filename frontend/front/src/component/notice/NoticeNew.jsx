import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import Button from "../common/ui/Button";
import { writeNoticeAsync } from "../../reducers/noticeSlice"
import NoticeFileData from "../common/NoticeFileData";
import Swal from "sweetalert2";


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




function NoticeNew() {
  const navigate = useNavigate();
  
  const [type, setType] = useState();
  const [title, setTitle] = useState();
  const [comment, setComment] = useState();

  const { writeNoticeDone } = useSelector((state) => state.noticeSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (writeNoticeDone) {
      Swal.fire({
        icon: 'success',
        title: '공지사항 작성 성공!',
        showConfirmButton: false,
        timer: 500
      })

      navigate('/notices');
    }
  }, [writeNoticeDone])

  const typeChange = (e) => {
    setType(e.target.value)
  }
  const titleChange = (e) => {
    setTitle(e.target.value)
  }
  const commentChange = (e) => {
    setComment(e.target.value)
  }

  const createNotice = () => {
    dispatch(writeNoticeAsync(
      {
        'notice_type': type,
        'notice_title': title,
        'notice_comment': comment,
        // 'notice_regidate': realToday,
        'notice_status': 1,
      }
    ))
    // let today = new Date();   

    // let year = today.getFullYear(); // 년도
    // let month = today.getMonth() + 1;  // 월
    // let date = today.getDate();  // 날짜  

    // let realToday = `${year}-${month}-${date}`

    // axios.post('/admin/notices/new', data, {
    //   headers: {
    //     "X-AUTH-TOKEN" : sessionStorage.getItem("access-token")
    //   }
    // })
    // .then(response => {
    //   console.log(response);
    //   navigate('/notices')
    // })
    // .catch(error => {
    //   console.error(error);
    // })
  }

  return (
    <Wrapper>
      <Container>
        <h1>공지사항 작성</h1>
        <SGridDiv style={{marginTop: "5%"}}>
          <STitleP>분류</STitleP>
          <SSelect onChange={typeChange} required>
          <option value="" disabled selected style={{display: "none"}}>분류를 선택하세요</option>
          <option value="점검">점검</option>
          <option value="안내">안내</option>
          <option value="회식">회식</option>
          <option value="기타">기타</option>
          </SSelect>
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>공지 제목</STitleP>
          <input onChange={titleChange} placeholder=" 제목을 입력하세요." />
        </SGridDiv>
        <hr />
        <SGridDiv>
          <STitleP>공지 내용</STitleP>
          <textarea onChange={commentChange} rows="8" placeholder=" 내용을 입력하세요." />
        </SGridDiv>
        <hr />
        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <Button
            title="등록하기"
            onClick={createNotice}
            />
        </div>
      </Container>
    </Wrapper>
  )
}

export default NoticeNew;