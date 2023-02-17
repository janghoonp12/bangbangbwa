import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";


function AdminLive() {
  const [liveBroadcasts, setLiveBroadcasts] = useState();

  useEffect(() => {
    axios.get('/broadcasts/live?page=0&size=100000')
    .then((res) => {

      const liveBroadcasts = res.data.content.map((obj) => {
        const id = obj.broadcastId
        const title = obj.broadcastTitle
        const date = obj.broadcastReservationTime.split('T')
        const rereservationTime = `${date[0]} ${date[1]}`
        
        const temp = { id, title, rereservationTime }

        return temp

      })
      setLiveBroadcasts(liveBroadcasts)
    })
    .catch(err => console.log(err))
  }, [])


  const columns = [
    {field: 'id', headerName: 'ID', width: '100'},
    {field: 'title', headerName: '방송 제목', width: '300'},
    {field: 'rereservationTime', headerName: '방송 시간', width: '650'}
  ]

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {liveBroadcasts && liveBroadcasts.length ? <Box sx={{ height: 400, width: '70%'}}>
        <DataGrid
          style={{fontSize: '18px'}}
          rows={liveBroadcasts}
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

export default AdminLive;