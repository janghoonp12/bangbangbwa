import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function ColorSchemesExample() {
  return (
    <>
      <br />
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">BangBang</Navbar.Brand>
          {/* <Nav.Link href="#home">우리이름</Nav.Link> */}
          <Nav className="me-auto">
            <Nav.Link href="#home">홈</Nav.Link>
            <Nav.Link href="#broadcasts">방송</Nav.Link>
            <Nav.Link href="#items">매물</Nav.Link>
            <Nav.Link href="#interest">관심</Nav.Link>
          </Nav>
        </Container>
        <InputGroup>
        <Form.Control
        placeholder="검색 ㄱㄱ"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
        검색
        </Button>
        </InputGroup>
        <Button variant="secondary">Notice</Button>{''}
        <Button variant="secondary">Alarm</Button>{''}
        <Button variant="secondary">MyPage</Button>{''}
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;