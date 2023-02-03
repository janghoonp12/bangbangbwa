import React from "react";
import users from "../../userData.json";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';




function AdminUser() {
  const columns = [
    {field: 'id', headerName: 'ID', width: '100'},
    {field: 'email', headerName: 'E-mail', width: '300'},
    {field: 'nickname', headerName: '닉네임', width: '300'},
    {field: 'level', headerName: '유저 등급', width: '150'},
    {field: 'status', headerName: '활성화 여부', width: '150'}
  ]

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Box sx={{ height: 400, width: '70%'}}>
        <DataGrid
          style={{fontSize: '18px'}}
          rows={users}
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

export default AdminUser;