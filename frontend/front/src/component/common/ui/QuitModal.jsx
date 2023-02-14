import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { withdrawalAsync, clearSignInDone } from "../../../reducers/userSlice"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

function QuitModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const withdrawal = () => {
    dispatch(withdrawalAsync())
    dispatch(clearSignInDone())
    Swal.fire({
      position: 'middle',
      icon: 'success',
      title: '이용해주셔서 감사합니다.',
      showConfirmButton: false,
      timer: 1500
    })
    handleClose()
    navigate("/")
  }

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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            돌아가기
          </Button>
          <Button variant="danger" onClick={withdrawal}>
            회원탈퇴
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// render(<QuitModal />);

export default QuitModal;