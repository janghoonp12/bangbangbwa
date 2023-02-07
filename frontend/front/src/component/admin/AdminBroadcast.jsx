import React from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import broadcasts from "../../broadcastdata.json";




function AdminBroadcast() {
  const columns = [
    {field: 'id', headerName: 'ID', width: '100'},
    {field: 'title', headerName: '제목', width: '300'},
    {field: 'description', headerName: '설명', width: '600'},
    {field: 'reservation_time', headerName: '방송 시간', width: '300'}
  ]

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Box sx={{ height: 400, width: '70%'}}>
        <DataGrid
          style={{fontSize: '18px'}}
          rows={broadcasts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  )
}

export default AdminBroadcast;