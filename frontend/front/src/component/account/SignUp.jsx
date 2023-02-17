import styled from "styled-components";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import useInput from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback, useEffect } from "react";
import { signUpAsync, clearSignUpDone } from "../../reducers/userSlice"
import Swal from "sweetalert2";

const Wrapper = styled.div`
  display: flex;
  background-color: #F8EDE3;
  height: 100%;
  justify-content: center;
  text-align: center;

`

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  background-color: white;
  width: 60%;
  @media (max-width:1024px){
    grid-template-columns: 1fr;
    width: 80%;
  }
  height: 50%;
  border-radius: 10px;
  margin: 200px auto;
`

const SLeftDiv = styled.div`
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  display: inline-block;
  @media (max-width:1024px){
    display: none;
  }
  width: 100%;
  height: 100%;
`

const SRightDiv = styled.form`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const STextDiv = styled.div`
  text-align: left;
  margin-left: 10%;
`; 

const SCustomInput = styled.input`
  width: 80%;
  background: lightgrey;
  border: 1px;
`;

const SNormalButton = styled.button`
  background: #F8EDE3;
  margin-top: 1.5rem;
  width: 60%;
`;

const SGoLoginP = styled.p`
  font-size: 1rem;
  color: blue;
  cursor: pointer;
`;

function SignUp() {
  const [userEmail, onChangeEmail] = useInput('');
  const [userNickname, onChangeNickname] = useInput('');
  const [userPassword, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordError, setPasswordError] = useState(false);

  const { signUpDone } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

  useEffect(() => {
    if (signUpDone) {
      dispatch(clearSignUpDone());
      Swal.fire({
        icon: 'success',
        title: '회원가입 성공!',
        showConfirmButton: false,
        timer: 500
      })
      navigate('/signin');
    }
  })

  const signUpButtonClick = useCallback(() => {
    if (!regex.test(userEmail)) {
      alert('이메일 형식으로 입력해주세요!')
      return
    }
    if (userPassword.length < 8 && userPassword.length > 30) {
      alert('패스워드는 8자 이상 30자 이하로 입력해주세요!')
      return
    }
    if (userPassword !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.')
      return setPasswordError(true);
    }
    if (userNickname.length < 2 && userNickname. length > 10) {
      alert('닉네임은 2~10자로 입력해주세요!')
      return
    }
    dispatch(signUpAsync(
      {
        userEmail: userEmail,
        userPassword: userPassword,
        userNickname: userNickname
      }),
    );
  })

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== userPassword);
    setPasswordCheck(e.target.value);
  }, [userPassword]);

  return (
    <Wrapper>
      <Container>
        <SLeftDiv />
        <SRightDiv style={{textAlign:"center"}}>
          <div style={{fontSize: "2rem"}}>계정 만들기</div>
          <STextDiv style={{ marginTop: "10%"}}>이메일</STextDiv>
          <SCustomInput  placeholder="이메일을 입력해주세요" value={userEmail} required onChange={onChangeEmail}/>
          <STextDiv>닉네임</STextDiv>
          <SCustomInput placeholder="닉네임을 입력해주세요" value={userNickname} required onChange={onChangeNickname}/>
          <STextDiv>비밀번호</STextDiv>
          <SCustomInput placeholder="비밀번호를 입력해주세요" value={userPassword} required onChange={onChangePassword} type="password"/>
          <STextDiv>비밀번호 확인</STextDiv>
          <SCustomInput placeholder="비밀번호를 한번 더 입력해주세요" value={passwordCheck} required onChange={onChangePasswordCheck} type="password"/>
          <STextDiv style={{ marginTop: "10%"}}>
            <SGoLoginP
              onClick={() => {
                navigate("/signin")
              }}
            >이미 계정이 있으신가요?</SGoLoginP>
          </STextDiv>
          <SNormalButton type="button" onClick={() => {signUpButtonClick()}}>회원가입</SNormalButton>
        </SRightDiv>
      </Container>
    </Wrapper>
  );
}

export default SignUp;
