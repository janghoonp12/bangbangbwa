import React from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import noticeData from "../../noticeData.json";




function AdminNotice() {
  const columns = [
    {field: 'id', headerName: 'ID', width: '100'},
    {field: 'type', headerName: '분류', width: '200'},
    {field: 'title', headerName: '공지 제목', width: '300'},
    {field: 'contents', headerName: '공지 내용', width: '600'},
    {field: 'regidate', headerName: '등록일', width: '150'}
  ]

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Box sx={{ height: 400, width: '70%'}}>
        <DataGrid
          style={{fontSize: '18px'}}
          rows={noticeData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}

export default AdminNotice;