import React from "react";
import styled from "styled-components";
import itemData from "../../data.json";

const SH3 = styled.h3`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;


function AdminItem(props) {
  const text = props.text
  let filteredItem = itemData.filter((item) => {
    const arr = [item.title, item.type, item.building_type, item.manage_fee]
    let have = false
    arr.forEach((i) => {
      if (i.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
        have = true
      }
    })
    return have ? item : null;
  })

  return (
    <div>
      <SH3>매물 관리</SH3>
      {filteredItem.map((data, index) => {
              return (
                <p key={data.id} style={{textAlign: 'center'}}>
                  제목 : {data.title} | 종류 : {data.type} | 건물 유형 : {data.building_type} | 금액 : {data.manage_fee}
                </p>
              );
          })}
    </div>
  )
}

export default AdminItem;