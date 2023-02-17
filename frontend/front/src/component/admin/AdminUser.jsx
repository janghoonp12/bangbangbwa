import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";




function AdminUser() {
  const [users, setUsers] = useState();

  useEffect(() => {
    axios.post('/admin/users/all', '', {
      headers: {
        'X-AUTH-TOKEN' : `Bearer ${sessionStorage.getItem('access-token')}`
      }
    })
    .then((res) => {

      const users = res.data.map((obj) => {
        const id = obj.user.userId
        const email = obj.user.userEmail
        const nickname = obj.user.userNickname
        const role = (obj.user_roles === 'ROLE_USER' ? '일반' : obj.user_roles === 'ROLE_BROKER' ? '중개사' : '관리자')
        const status = (obj.user.user_status === 1 ? '정상' : '탈퇴')

        const temp = { id, email, nickname, role, status }
        return temp
      })
      setUsers(users)
    })
    .catch(err => console.log(err))
  }, [])
  
  
  const columns = [
    {field: 'id', headerName: 'ID', width: '100'},
    {field: 'email', headerName: 'E-mail', width: '300'},
    {field: 'nickname', headerName: '닉네임', width: '300'},
    {field: 'role', headerName: '유저 등급', width: '150'},
    {field: 'status', headerName: '활성화 여부', width: '150'}
  ]

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {users && users.length ? <Box sx={{ height: 400, width: '70%'}}>
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
      </Box> : <p>로딩중입니다.</p>}
    </div>
  );
}

export default AdminUser;