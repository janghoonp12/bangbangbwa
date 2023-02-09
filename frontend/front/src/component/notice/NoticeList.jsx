import React, { useEffect } from "react";
import NoticeListItem from "./NoticeListItem";
import Table from 'react-bootstrap/Table';

import { useSelector } from "react-redux";



function NoticeList() {
  const { searchAllNoticeDone, noticeData } = useSelector((state) => state.noticeSlice);

  useEffect(() => {
    if (searchAllNoticeDone) {
      console.log(noticeData)
    }
    // console.log(notices)
  })

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
        {noticeData ? noticeData.map((notice) => {
          return (
            <NoticeListItem 
              key={notice.id}
              notice={notice}
            />
          )
        }) : <tr><td>no</td></tr>}
      </tbody>
    </Table>
  );
}

export default NoticeList;