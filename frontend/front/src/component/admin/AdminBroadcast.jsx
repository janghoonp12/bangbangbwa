import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";



function AdminBroadcast() {
  const [broadcasts, setBroadcasts] = useState();

  useEffect(() => {
    axios.get('/broadcasts?page=0&size=100000')
    .then((res) => {

      const broadcasts = res.data.content.map((obj) => {
        const id = obj.broadcastId
        const title = obj.broadcastTitle
        const date = obj.broadcastReservationTime.split('T')
        const rereservationTime = `${date[0]} ${date[1]}`
        const status = (obj.broadcastStatus === 1 ? '라이브' : '지난 방송')
        
        const temp = { id, title, rereservationTime, status }

        return temp

      })
      setBroadcasts(broadcasts)
    })
    .catch(err => console.log(err))
  }, [])

  const columns = [
    {field: 'id', headerName: 'ID', width: '100'},
    {field: 'title', headerName: '제목', width: '500'},
    {field: 'rereservationTime', headerName: '방송 시간', width: '300'},
    {field: 'status', headerName: '방송 여부', width: '200'}
  ]

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {broadcasts && broadcasts.length ?
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
      </Box> : <p>로딩중입니다.</p>}
    </div>
  )
}

export default AdminBroadcast;