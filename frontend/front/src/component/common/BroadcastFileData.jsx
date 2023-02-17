import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { broadcastFileUploadAsync } from "../../reducers/fileSlice"

function FileData() {
  const [file, setFile] = useState(null); //파일
  const dispatch = useDispatch();

  const handleChangeFile = (event) => {
    setFile(event.target.files);
    const fd = new FormData();
    fd.append("file", event.target.files[0]);
    
    dispatch(broadcastFileUploadAsync(fd))
  }

  return(
    <div>
            <div>
                <input type="file" id="file" onChange={(event) => handleChangeFile(event)} multiple="multiple"></input>
            </div>
    </div>
  );
}
export default FileData;