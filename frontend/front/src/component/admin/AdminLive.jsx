import React from "react";
import styled from "styled-components";
import broadcastdata from "../../broadcastdata.json";

const SH3 = styled.h3`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;


function AdminLive(props) {
  const text = props.text
  let filteredLive = broadcastdata.filter((broadcast) => {
    const arr = [broadcast.title, broadcast.description, broadcast.reservation_time]
    let have = false
    arr.forEach((i) => {
      if (i.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
        have = true
      }
    })
    return have ? broadcast : null;
  })

  return (
    <div>
      <SH3>라이브 방송 관리</SH3>
      {filteredLive.map((data, index) => {
              return (
                <p key={data.id} style={{textAlign: 'center'}}>
                  방송 제목 : {data.title} | 방송 내용 : {data.description} | 방송 시간 : {data.reservation_time}
                </p>
              );
          })}
    </div>
  )
}

export default AdminLive;