import React, { useEffect } from "react";
import styled from "styled-components";
import QuitModal from "../common/ui/QuitModal";
import nicknamelogo from "../../assets/nicknamelogo.png";
import passwordlogo from "../../assets/pwlogo.png";
import updatelogo from "../../assets/updatelogo.png";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import useInput from '../../hooks/useInput';
import { changeNicknameAsync, changePasswordAsync, withdrawalAsync, clearSignInDone, changeMeNickname } from "../../reducers/userSlice"
import Swal from 'sweetalert2'

const SItemDiv = styled.div`
  width: 100%;
  max-width: 70%;
  height: 100%;
  max-height: 50%;
  border: 1px solid grey;
  border-radius: 8px;
  text-align: left;
  padding: 10px;
  margin-left: 10px;
`;

const SFlexDiv = styled.div`
  display: flex;
  height: 100%;
  max-height: 40%;
  width: 100%;
  // max-width: 40%;
  // justify-content: center;
  align-items: center;
  text-align: left;
  
`;

const SGridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 7fr 1fr;
  align-items: center;
`;

const SLogoDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SLogoImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SInfoP = styled.p`
  margin-bottom: 0px;
`;

const SQuitDiv = styled.div`
  margin-top: 3rem;
  float: right;
`;

const StyleInput = styled.input`
  width: 100%;
  height: 40px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 3px solid black;
`

function MyProfile() {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userSlice);
  const [newNickname, onChangeNickname] = useInput(me?.nickname || '');
  const [newPassword, onChangePassword] = useInput('');

  const changeNickname = () => {
    console.log(newNickname.length)
    if (newNickname.length < 2 && newNickname.length > 10) {
      alert('닉네임은 2~10자로 입력해주세요!')
      return
    }
    console.log("무한?")
    dispatch(changeNicknameAsync(newNickname))
    dispatch(changeMeNickname(newNickname))
    Swal.fire({
      position: 'middle',
      icon: 'success',
      title: '닉네임 변경 성공!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const changePassword = () => {
    if (newPassword.length < 8 && newPassword.length > 30) {
      alert('패스워드는 8자 이상 30자 이하로 입력해주세요!')
      return
    }
    dispatch(changePasswordAsync(newPassword))
    Swal.fire({
      position: 'middle',
      icon: 'success',
      title: '비밀변호 변경 성공!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <SItemDiv>
      <div>
        <p>기본정보</p>
      </div>
      <SFlexDiv>
        <div>
          <p>닉네임 : { me.nickname }</p>
          <p>이메일 : { me.email}</p>
        </div>

      </SFlexDiv>
      <hr />
      <SGridDiv>
        <SLogoDiv>
        < SLogoImg src={nicknamelogo} alt="닉네임로고" />
        </SLogoDiv>
        <SInfoP>닉 네 임 : </SInfoP>
        {/* <SInfoP>{ me.nickname }</SInfoP> */}
        <StyleInput value={newNickname} required onChange={onChangeNickname}/>
        <SLogoDiv>
        <SLogoImg src={updatelogo} alt="닉네임수정로고" onClick={changeNickname} />
        </SLogoDiv>
      </SGridDiv>
      <SGridDiv style={{ marginTop: "5px" }}>
      <SLogoDiv>
        < SLogoImg src={passwordlogo} alt="비밀번호로고" />
        </SLogoDiv>
        <SInfoP>비밀번호: </SInfoP>
        <StyleInput value={newPassword} required onChange={onChangePassword}/>
        <SLogoDiv>
        < SLogoImg src={updatelogo} alt="수정로고" onClick={changePassword}/>
        </SLogoDiv>
      </SGridDiv>
      <SQuitDiv>
        <QuitModal/>
      </SQuitDiv>
    </SItemDiv>
    )
}

export default MyProfile;