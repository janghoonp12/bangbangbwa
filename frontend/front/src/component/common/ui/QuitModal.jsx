import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function QuitModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        회원탈퇴
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>정말 탈퇴하시겠습니까?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>한 번 탈퇴하면 복구할 수 없습니다.</p>
          <p>회원 탈퇴를 원하시면 비밀번호를 입력해주십시오.</p>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                placeholder="your password"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            돌아가기
          </Button>
          <Button variant="danger" onClick={handleClose}>
            회원탈퇴
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// render(<QuitModal />);

export default QuitModal;