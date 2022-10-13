import React from "react";
import { Typography, Modal, Box } from "@mui/material";
import { SpinnerCircularFixed as Spinner } from "spinners-react";
import Divider from "./Divider";
import PopupModal from "./PopupModal";
import './Spinner.css'

const sx = {
  root: {
    width: "100%",
    height: "100%",
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "top",
    textAlign: "center",
    gap: "0 25px",
  },
  title: {
    textAlign: "center",
    color: "#FFF",
    lineHeight:"30px"
  },
  url: {
    fontFamily: 'Jotia-Regular',
    textDecoration: "none",
    color: "#628BA0",
    fontWeight: "700",
  },
};

const TxProgressModal = ({ isOpen, txEtherScan }) => {
  return (
    <PopupModal isOpen={isOpen} isTxPopup={true}>  
      <Box sx={sx.root}>
        <Typography variant="boxText" sx={sx.title}>
          Transaction<br/> In Progress
        </Typography>
        <Typography variant="text" sx={{ my: 4 , color: '#FFF'}}>
        Please wait while your transaction is being processed. <br />
          {txEtherScan && (
            <>
              You can check the transaction status on{" "}
              <Box
                component="a"
                href={txEtherScan}
                sx={sx.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Etherscan
              </Box>
              .
            </>
          )}
        </Typography>

        <>
    <div className="counter-circle" style={{margin:"0 auto", marginBottom:"10px"}}>
      <div className="counter-rotary-holder" id='txRotator'>
        <div className="counter-rotary-item" />
      </div>
      <div className="counter-shadow">
        <div className="counter-content-holder">
          <div className="counter-text">LOADING</div>
        </div>
      </div>

    </div>
  </>
        {/* <Spinner
          color="#FF692B"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        /> */}
      </Box>
    </PopupModal>
  );
};

export default TxProgressModal;
