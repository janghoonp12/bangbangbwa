import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button"


const SDiv = styled.div`
  text-align: center;
  border: 1px solid black;
`;

const SSelect = styled.select`
  width: 500px;
  height: 30px;
  margin-bottom: 20px;
`

const SInput = styled.input`
  width: 500px;
  margin-bottom: 20px;
`;


function NoticeNew() {
  return (
    <SDiv>
      <h1>공지사항 작성</h1>
      <hr />
      <form>
        <h3>공지 제목</h3>
        <SInput type="text" placeholder="공지 제목을 입력하세요." /><br />

        <h3>공지 분류</h3>
        <SSelect>
          <option value="점검">점검</option>
          <option value="안내">안내</option>
          <option value="회식">회식</option>
          <option value="기타">기타</option>
        </SSelect><br />

        <h3>공지 내용</h3>
        <SInput type="textarea" style={{height: '100px'}} placeholder="공지 내용을 입력하세요." /><br />

        <h3>첨부 파일</h3>
        <SInput type="file" multiple={true} /><br />
      </form>
      <Button block variant="outline-success" style={{width: '500px', margin: '10px'}} class="mt-3">공지 등록</Button>
    </SDiv>

  )
}

export default NoticeNew;