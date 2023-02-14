import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { noticeFileUploadAsync} from "../../reducers/fileSlice"

function FileData() {
  const [file, setFile] = useState(null); //파일
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeFile = (event) => {
    console.log(event.target.files);
    setFile(event.target.files);
    const fd = new FormData();
    fd.append("file", event.target.files[0]);
    
    dispatch(noticeFileUploadAsync(fd))
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