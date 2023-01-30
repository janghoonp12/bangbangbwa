import styled from "styled-components";
import logosample from "../../assets/logosample.png"
import { useNavigate } from "react-router-dom";

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
`;

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
  font-size: 0.25rem;
  color: blue;
  cursor: pointer;
`;

function SignUp() {

  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <SLeftDiv />
        <SRightDiv style={{textAlign:"center"}}>
          <div style={{fontSize: "2rem"}}>계정 만들기</div>
          {/* <div style={{fontSize: "1rem"}}>돌아 오신걸 환영해요</div> */}
          <STextDiv style={{ marginTop: "10%"}}>이메일</STextDiv>
          <SCustomInput/>
          <STextDiv>닉네임</STextDiv>
          <SCustomInput />
          <STextDiv>비밀번호</STextDiv>
          <SCustomInput />
          <STextDiv>비밀번호 확인</STextDiv>
          <SCustomInput />
          <STextDiv style={{ marginTop: "10%"}}>
            <SGoLoginP
              onClick={() => {
                navigate("/login")
              }}
            >이미 계정이 있으신가요?</SGoLoginP>
          </STextDiv>
          <SNormalButton>로그인</SNormalButton>
          
        </SRightDiv>
      </Container>
    </Wrapper>
  );
}

export default SignUp;
