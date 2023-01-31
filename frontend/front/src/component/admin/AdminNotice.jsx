import React from "react";
import styled from "styled-components";
import noticeData from "../../noticeData.json";

const SH3 = styled.h3`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;


function AdminNotice(props) {
  const text = props.text
  let filteredNotice = noticeData.filter((notice) => {
    const arr = [notice.type, notice.title, notice.contents]
    let have = false
    arr.forEach((i) => {
      if (i.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
        have = true
      }
    })
    return have ? notice : null;
  })

  return (
    <div>
      <SH3>공지 관리</SH3>
      {filteredNotice.map((data, index) => {
              return (
                <p key={data.id} style={{textAlign: 'center'}}>
                  분류 : [{data.type}] | 제목 : {data.title} | 내용 : {data.contents}
                </p>
              );
          })}
    </div>
  )
}

export default AdminNotice;