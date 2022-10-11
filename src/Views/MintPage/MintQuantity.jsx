import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button } from "@mui/material";
import NumericInput from "./NumericInput";

const COLOR_CYAN = "#19A8B4";
const BP3 = "@media (max-width: 384px)";

const sx = {
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "458px",
    width: "100%",
    margin: "auto",
    mb: 3,
  },
  title: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 22,
    fontWeight: 700,
    mb: 3,
  },
  text: {
    fontFamily: "Jotia-Regular",
    textTransform: "uppercase",
    color: '#FFF',
    fontSize: 11,
    alignSelf: "center",
  },
  span: {
    fontFamily: "Jotia-Regular",
    color: '#FFF',
    textTransform: "none",
    fontWeight: 500,
    fontSize: 11,
  },
  row: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    minHeight: "30px",
    borderColor: "rgba(0,0,0,0.2)",
    alignSelf: "center",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
    width: "100%",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    minWidth: "25%",
    alignItems:"center"
  },
  img: {
    height: "12px",
    alignSelf: "center",
    marginRight: "3px",
    marginBottom: "2px",
  },
  priceContainer: {
    display: "flex",
    alignSelf: "center",
    my: 1,
  },
  price: {
    color: '#FFF',
    pt: "2px",
    fontFamily: "Jotia-Regular",
    fontSize: 22,
  },
};
const MintQuantity = ({ title, price, maxAmount, onClickMint }) => {
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
console.log('MINTQUANTYTY', typeof price);
  useEffect(() => {
    
    if(price === "FREE"){
      console.log("price string ")
      setTotalPrice(price);
      return
    }
    setTotalPrice("ETH " + parseFloat((price * quantity).toFixed(3)));
  }, [quantity]);

  const onNumberInput = (val) => {
    setQuantity(val);
  };

  return (
    <Box sx={sx.root}>
      <Typography sx={sx.title}>{title}</Typography>
      <Box sx={sx.row}>
        <Box sx={sx.col}>
          <Typography sx={sx.text} variant="text">
            Quantity
          </Typography>
          <NumericInput
            value={1}
            max={maxAmount}
            min={0}
            onChange={onNumberInput}
          />
          <Typography sx={sx.span} variant="text">
            ({maxAmount} max)
          </Typography>
        </Box>

        <Box sx={sx.col}>
          <Typography sx={sx.text} variant="text">
            Price
          </Typography>
          <Box display="flex" sx={sx.priceContainer}>
            <Typography sx={sx.price} variant="text">
             {totalPrice}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Button
        variant="grayButton"
        onClick={() => onClickMint(quantity, totalPrice)}
        disabled={quantity === 0 || quantity>maxAmount }
      >
        Mint
      </Button>
    </Box>
  );
};

/* eslint-disable react/forbid-prop-types */
MintQuantity.propTypes = {
  title: PropTypes.string,
  maxAmount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onClickMint: PropTypes.any.isRequired,
};

export default MintQuantity;
