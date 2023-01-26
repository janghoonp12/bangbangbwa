import styled from "styled-components";
import logosample from "../../assets/logosample.png"

const LoginContainer = styled.div`
  display: flex;
  background-color: #F8EDE3;
  height: 100%;
  justify-content: center;
  text-align: center;

`

const LoginWrapper = styled.div`
  background-color: white;
  width: 50%;
  height: 500px;
  border-radius: 10px;
  margin: 200px auto;
`

const Image = styled.img`
  border-radius: 5px 0px 0px 5px;
  width: 100%;
  height: 100%;
`

const SecondForm = styled.div`
  background-image: url(${logosample});
  background-size: cover;
  display: inline-block;
  width: 40%;
  height: 100%;
`

const LoginForm = styled.form`
  display: inline-block;
  width: 60%;
  height: 100%;
  padding: 20px;
`

const CustomInput = styled.input`
  width: 100%;
`

function Login() {
  return (
    <LoginContainer>
      <LoginWrapper>
        <SecondForm />
        <LoginForm style={{textAlign:"center"}}>
          <div>logo</div>
          <lable>돌아 오신걸 환영해요</lable>
          <div style={{textAlign: "left"}}>이메일</div>
          <CustomInput/>
          <div style={{textAlign: "left"}}>비밀번호</div>
          <CustomInput />
          <div style={{textAlign: "left"}}>
            <a href="#">비밀번호를 잊으셨나요?</a>
          </div>
          <div>
            <button>로그인</button>
          </div>
          <div>
            <button>카카오</button>
          </div>
          <div>
            <button>네이버</button>
          </div>
        </LoginForm>
      </LoginWrapper>
    </LoginContainer>
  );
}

export default Login;
