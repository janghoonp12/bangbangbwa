import React from "react";
import NoticeListItem from "./NoticeListItem";
import Table from 'react-bootstrap/Table';

import { useSelector } from "react-redux";



function NoticeList() {
  const { noticeData } = useSelector((state) => state.noticeSlice);

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
        {noticeData ? noticeData.map((notice, index) => (
            <NoticeListItem 
            key={notice.notice_id}
            num = {index+1}
              notice={notice}
            />
          )
        ) : <tr><td>no</td></tr>}
      </tbody>
    </Table>
  );
}

export default NoticeList;