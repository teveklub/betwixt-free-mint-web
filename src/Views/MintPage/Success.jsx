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
    fontSize: "20px",
    lineHeight: "24px",
    mb: "14px",
    [BP1]: {
      fontSize: "16px",
      lineHeight: "20px",
    },
  },
};

const Success = ({
  image,
  counterDate,
  salesOver,
  failed,
  // handleOnclick,handleReveal
}) => {
  const shareOnTwitter = () => {
    toast.success("Share on Twitter");
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
              <Typography variant="pageTitleDescription">
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
              <Typography variant="pageTitleDescription">
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
            style={{ marginBottom: "25px", fontSize: "20px" }}
          >
            SALE ENDED
          </Typography>
          <Typography sx={sx.comeBackText} variant="pageTitleDescription">
            {" "}
            COME BACK FOR THE BURN EVENT
          </Typography>
          <Typography variant="pageTitleDescription">
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
