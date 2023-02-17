import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";




function AdminNotice() {
  const [notices, setNotices] = useState();

  useEffect(() => {
    axios.get('/notices?page=0&size=100000')
    .then((res) => {

      const notices = res.data.content.map((obj) => {
        const id = obj.notice_id
        const date = obj.notice_regidate.split('T')
        const regidate = `${date[0]} ${date[1]}`
        const status = (obj.notice_status === 0 ? '공개' : '비공개')
        const title = obj.notice_title
        const type = obj.notice_type
        const comment = obj.notice_comment

        const temp = { id, regidate, status, title, type, comment }
        return temp
      })
      setNotices(notices)
    })
    .catch(err => console.log(err))

  }, [])

  const columns = [
    {field: 'id', headerName: 'ID', width: '100'},
    {field: 'type', headerName: '분류', width: '150'},
    {field: 'title', headerName: '공지 제목', width: '200'},
    {field: 'comment', headerName: '공지 내용', width: '400'},
    {field: 'regidate', headerName: '등록일', width: '200'},
    {field: 'status', headerName: '공개여부', width: '150'}
  ]

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {notices && notices.length ? <Box sx={{ height: 400, width: '70%'}}>
        <DataGrid
          style={{fontSize: '18px'}}
          rows={notices}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box> : <p>로딩중입니다.</p>}
    </div>
  );
}

export default AdminNotice;