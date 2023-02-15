import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import styled from 'styled-components';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SButton = styled.button `
  border: 0px solid black;
  background-color: white;
`;

export default function SearchInfoModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{}}>
      <SButton onClick={handleOpen} style={{width: "100%", backgroundColor: '#F8EDE3'}}><HelpOutlineIcon /></SButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            검색창 이용 방법
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            키워드나 지역 검색을 통해 원하는 매물을 찾아보세요!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}