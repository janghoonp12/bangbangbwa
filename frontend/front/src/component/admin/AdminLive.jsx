import React from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import broadcastdata from "../../broadcastdata.json";



function AdminLive() {
  const columns = [
    {field: 'id', headerName: 'ID', width: '100'},
    {field: 'title', headerName: '방송 제목', width: '300'},
    {field: 'description', headerName: '방송 설명', width: '650'},
    {field: 'reservation_time', headerName: '예약 시간', width: '200'}
  ]

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Box sx={{ height: 400, width: '70%'}}>
        <DataGrid
          style={{fontSize: '18px'}}
          rows={broadcastdata}
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

export default AdminLive;