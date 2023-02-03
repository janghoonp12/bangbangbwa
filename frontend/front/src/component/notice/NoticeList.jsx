import React from "react";
import NoticeListItem from "./NoticeListItem";
import noticeData from "../../noticeData.json";
import Table from 'react-bootstrap/Table';



function NoticeList() {

  return (
    <Table
      style={{width: '100%', marginTop: '50px', borderSpacing: '0px 10px', borderCollapse: 'separate', borderTop: '1px solid black'}}
    >
      <thead>
        <tr style={{fontSize: '30px'}}>
          <th style={{textAlign: "center"}}>목차</th>
          <th style={{textAlign: "center"}}>제목</th>
          <th style={{textAlign: "center"}}>등록일</th>
        </tr>
      </thead>
      <tbody>
        {noticeData.map((notice) => {
          return (
            <NoticeListItem 
              key={notice.id}
              notice={notice}
            />
          )
        })}
      </tbody>
    </Table>
  );
}

export default NoticeList;