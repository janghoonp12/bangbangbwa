import React, { useEffect } from "react";
import NoticeListItem from "./NoticeListItem";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import { clearSearchDetailNoticeDone } from "../../reducers/noticeSlice"
import { useDispatch, useSelector } from 'react-redux';



function NoticeList() {
  const dispatch = useDispatch();
  const { noticeData } = useSelector((state) => state.noticeSlice);
  const { searchDetailNoticeDone, noticeDetail } = useSelector((state) => state.noticeSlice);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (searchDetailNoticeDone) {
      dispatch(clearSearchDetailNoticeDone())
      navigate(`/notices/${noticeDetail.notice_id}`)
    }
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