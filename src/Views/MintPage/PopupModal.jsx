import React from 'react';

import { Box, Modal, Typography } from '@mui/material';

const BP1 = '@media (max-width: 899px)';
const BP2 = '@media (max-width: 719px)';
const BP3 = '@media (max-width: 600px)';

const sx = {
  root: {
    height: '100%',
    backgroundColor: '#15101999',
    py: '44px',
    px: '125px',
    position: 'relative',
    display: 'flex',
    // pointerEvents: "none",
    transition: 'all .3s',
    [BP1]: {
      px: '85px',
    },
    [BP2]: {
      px: '25px',
    },
  },
  container: {
    maxHeight: '80vh',
    minHeight: '150px',
    position: 'relative',
    margin: 'auto',
    width: '100%',
    maxWidth: '500px',
    borderRadius: '16px',
    border: '1px solid #628BA0',
    overflow: 'hidden',
    transition: 'all .3s',
    backgroundColor: '#1E1E1E',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    px: '30px',
    py: '20px',
    textAlign: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  closeBtn: {
    position: 'absolute',
    width: '14px',
    height: '14px',
    top: '38%',
    bottom: '0',
    right: '5px',
    cursor: 'pointer',
    pointerEvents: 'auto',
    transition: 'all .3s',
    color: '#FFF',
    '&:hover': {
      opacity: 0.8,
    },
  },
  header: {
    fontFamily: 'poppins-semibold',
    position: 'relative',
    width: '100%',
    minHeight: '50px',
    color: '#FF692B',
  },
  body: {
    width: '100%',
    minHeight: '50px',
    fontFamily: 'Jotia',
    fontSize: '16px',
  },
  footer: {
    width: '100%',
    minHeight: '10px',
  },
};

const PopupModal = ({
  isOpen,
  setOpen,
  header,
  footer,
  children,
  isTxPopup,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          if (setOpen) {
            setOpen(false);
          }
        }
      }}
    >
      <Box sx={sx.root}>
        <Box sx={sx.container}>
          <Box sx={sx.header}>
            {!isTxPopup && (
              <Box sx={sx.closeBtn} onClick={() => setOpen && setOpen(false)}>
                {/* <img src={close} style={{ width: '100%' }} alt="Close" /> */}
                x
              </Box>
            )}

            <Typography variant='counterNumber'>{header}</Typography>
          </Box>
          <Box sx={sx.body}>{children}</Box>
          <Box sx={sx.footer}>{footer}</Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PopupModal;
