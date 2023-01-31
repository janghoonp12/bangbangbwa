import styled from "styled-components";
import logosample from "../../assets/logosample.png"
// import { useNavigate } from "react-router";

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
  height: 50%;
  border-radius: 10px;
  margin: 200px auto;
`

// const Image = styled.img`
//   border-radius: 5px 0px 0px 5px;
//   width: 100%;
//   height: 100%;
// `

const SLeftDiv = styled.div`
  background-image: url(${logosample});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  display: inline-block;
  width: 100%;
  height: 100%;
`

const SRightDiv = styled.form`
  width: 100%;
  height: 100%;
  padding: 20px;
`

const SCustomInput = styled.input`
  width: 80%;
`

const SNormalButton = styled.button`
  background: #F8EDE3;
  margin-top: 1.5rem;
  width: 60%;
`;

const SKakaoButton = styled.button`
  background: yellow;
  margin-top: 0.25rem;
  width: 60%;
`;

const SNaverButton = styled.button`
  background: lightgreen;
  margin-top: 0.25rem;
  width: 60%;
  
`;

function Login() {
  // const navigate = useNavigate();
  // const onClick = () => {
  //   navigate("/")
  // }

  return (
    <Wrapper>
      <Container>
        <SLeftDiv />
        <SRightDiv style={{textAlign:"center"}}>
          <div style={{fontSize: "6rem"}}>logo</div>
          <div style={{fontSize: "1rem"}}>돌아 오신걸 환영해요</div>
          <div style={{textAlign: "left", marginTop: "3rem", marginLeft: "10%"}}>이메일</div>
          <SCustomInput/>
          <div style={{textAlign: "left", marginLeft: "10%"}}>비밀번호</div>
          <SCustomInput />
          <div style={{textAlign: "left", marginLeft: "10%"}}>
            <a href="javascript:void(0)" onClick={onClick}>비밀번호를 잊으셨나요?</a>
          </div>
          <SNormalButton>로그인</SNormalButton>
          <SKakaoButton>카카오</SKakaoButton>
          <SNaverButton>네이버</SNaverButton>
        </SRightDiv>
      </Container>
    </Wrapper>
  );
}

export default Login;
