import React, { useState } from "react";

function ImageUpload() {
  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");
  // 파일 저장
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };
  // 파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };
  return (
          <div>
            {fileImage && (
              <img
                alt="sample"
                src={fileImage}
                style={{width: '100px', height: '100px'}}
              />
            )}
            <div style={{alignItems: "center", justifyContent: "center"}}>
              <input
                name="imgUpload"
                type="file"
                accept="image/*"
                onChange={saveFileImage}
                style={{width: '80px', height: '30px', cursor: "pointer",}}
              />
              <button
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  width: "80px",
                  height: "30px",
                  cursor: "pointer",
                }}
                onClick={() => deleteFileImage()}
              >
                삭제
              </button>
            </div>
          </div>
  );
}
export default ImageUpload;