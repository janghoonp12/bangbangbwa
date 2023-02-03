import React from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import itemData from "../../data.json";



function AdminItem() {
  const columns = [
    {field: 'id', headerName: 'ID', width: '100'},
    {field: 'title', headerName: '제목', width: '600'},
    {field: 'type', headerName: '거래 유형', width: '200'},
    {field: 'building_type', headerName: '종류', width: '200'},
    {field: 'manage_fee', headerName: '가격', width: '150'}
  ]

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Box sx={{ height: 400, width: '70%'}}>
        <DataGrid
          style={{fontSize: '18px'}}
          rows={itemData}
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

export default AdminItem;