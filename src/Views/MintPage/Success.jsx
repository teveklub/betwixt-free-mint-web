import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { toast } from "react-toast";
import Counter from "../../components/Counter";

const BP1 = "@media (max-width: 600px)";

const sx = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  imageHolder: {
    margin: "auto",
    width: "auto",
    my: "27px",
    "& img": {
      maxWidth: "378px",
      maxHeight: "378px",
      height: "100%",
    },
    [BP1]: {
      "& img": {
        maxWidth: "280px",
        maxHeight: "280px",
        height: "100%",
      },
    },
  },
  button: {
    mb: "50px",
  },
  comeBackText: {
    fontSize: '24px',
    lineHeight: "24px",
    mb: "14px",
    [BP1]: {
      fontSize: "16px",
      lineHeight: "20px",
    },
  },
  toExperienceText: {
    fontSize: '14px', 
    color: '#594569'
  }
};

const Success = ({
  image,
  counterDate,
  salesOver,
  failed,
  // handleOnclick,handleReveal
}) => {
  const shareOnTwitter = () => {
    window.open("https://twitter.com/intent/tweet?text=I've%20just%20minted%20a%20Betwixt%20Brave!%20Mint%20yours%20braves.betwixt.life%20@BetwixtNFT")
  };
  return (
    <Box sx={sx.root}>
      {!salesOver ? (
        <>
          {!failed ? (
            <>
              <Typography variant="pageTitleDescription" color="#62A077">
                Success
              </Typography>
              <Box sx={sx.imageHolder}>
                <img src={image} alt="mask" />
              </Box>
              <Button
                sx={sx.button}
                variant="grayButton"
                onClick={shareOnTwitter}
              >
                Share on Twitter
              </Button>
              {/* <Button sx={sx.button} variant='grayButton' onClick={handleReveal}>{buttonText}</Button> */}
              <Typography sx={sx.comeBackText} variant="pageTitleDescription">
                {" "}
                COME BACK FOR THE BURN EVENT
              </Typography>
              <Typography variant="pageTitleDescription" sx={sx.toExperienceText}>
                {" "}
                TO EXPEREINCE THE BETWIXT GAME
              </Typography>
              <Counter date={counterDate} />{" "}
            </>
          ) : (
            <>
              <Typography variant="pageTitleDescription" color="#7f2020">
                Failed
              </Typography>
              <Box sx={sx.imageHolder}>
                <img src={image} alt="mask" />
              </Box>
              <Typography sx={sx.comeBackText} variant="pageTitleDescription">
                {" "}
                COME BACK FOR THE BURN EVENT
              </Typography>
              <Typography variant="pageTitleDescription" sx={sx.toExperienceText}>
                {" "}
                TO EXPEREINCE THE BETWIXT GAME
              </Typography>
              <Counter date={counterDate} />{" "}
            </>
          )}
        </>
      ) : (
        <>
          <Typography
            variant="pageTitleDescription"
            style={{ marginBottom: "50px", fontSize: "18px" }}
          >
            SALE ENDED
          </Typography>
          <Typography sx={sx.comeBackText} variant="pageTitleDescription">
            {" "}
            COME BACK FOR THE BURN EVENT
          </Typography>
          <Typography variant="pageTitleDescription" sx={sx.toExperienceText}>
            {" "}
            TO EXPEREINCE THE BETWIXT GAME
          </Typography>
          <Counter date={counterDate} />{" "}
        </>
      )}
    </Box>
  );
};

export default Success;
