import React from "react";
import styled from "styled-components";
import broadcasts from "../../broadcastdata.json";

const SH3 = styled.h3`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;


function AdminBroadcast(props) {
  const text = props.text
  let filteredBroadcast = broadcasts.filter((broadcast) => {
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
      <SH3>방송 목록 관리</SH3>
      {filteredBroadcast.map((data, index) => {
              return (
                <p key={data.id} style={{textAlign: 'center'}}>
                  방송 제목 : {data.title} | 방송 내용 : {data.description} | 방송 시간 : {data.reservation_time}
                </p>
              );
          })}
    </div>
  )
}

export default AdminBroadcast;