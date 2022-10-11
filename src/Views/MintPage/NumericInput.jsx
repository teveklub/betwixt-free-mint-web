import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { Input, ButtonGroup, Button } from "@mui/material";

const BORDER_THICKNESS = 2;
const BORDER_RADIUS = 7;

const sx = {
  root: {
    color: "#FFF",
    my: 1,
    "& .MuiButtonGroup-grouped": {
      minWidth: 34,
    },
  },
  input: {
    fontFamily: "Jotia-Regular",
    color: "#FFF",
    fontSize: 22,
    width: 10,
    minWidth: 20,
    height:40,
    maxHeight: 40,
    textAlign: "center",
    textAlignLast: "center",
    padding: 0,
    borderTop: BORDER_THICKNESS,
    borderBottom: BORDER_THICKNESS,
    "&:before, &:hover:not(.Mui-disabled):before": {
      border: 0,
    },
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
      {
        display: "none",
     },
    "& input": {
      padding: 0,
    },
  },
  button: {
    fontFamily: "Jotia-Regular",
    color: "#FFF",
    border: BORDER_THICKNESS,
    maxHeight: 40,
    fontSize: 16,
    height:"40px",
    "&:hover": {
      border: BORDER_THICKNESS,
    },
    "&:focus": {
      outline: "none",
    },
  },
  buttonLeft: {
    color: "#FFF",
    fontSize: 16,
    border: BORDER_THICKNESS,
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
    marginRight: "-1px",
    borderRight: 0,
    transition: "all 0.1s ease-in-out",
    "&:hover": {
      color: "#FFF",
      borderColor: "#FFF",
      background: "#363F59",
      borderWidth: BORDER_THICKNESS,
      borderRight: 0,
    },
  },
  buttonRight: {
    color: "#FFF",
    border: BORDER_THICKNESS,
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    borderLeft: 0,
    transition: "all 0.1s ease-in-out",
    "&:hover": {
      color: "#FFF",
      borderColor: "#FFF",
      background: "#363F59",
      borderWidth: BORDER_THICKNESS,
      borderLeft: 0,
    },
  },
};
const NumericInput = ({ value, max, min, onChange }) => {
  const [counter, setCounter] = useState(value || 0);

  useEffect(() => {
    onChange(counter);
  }, [counter]);

  const handleIncrement = () => {
    max = 1;
    if (max != null) {
      if (counter < max) {
        setCounter(counter + 1);
      } else {
        setCounter(max);
      }
    } else {
      setCounter(counter + 1);
    }
  };

  const handleDecrement = () => {
    if (min != null) {
      if (counter > min) {
        setCounter(counter - 1);
      } else {
        setCounter(min);
      }
    } else {
      setCounter(counter - 1);
    }
  };

  return (
    <ButtonGroup
      sx={sx.root}
      size="small"
      aria-label="small outlined button group"
    >
      <Button sx={{ ...sx.button, ...sx.buttonLeft }} onClick={handleDecrement}>
        -
      </Button>
      <div className="numericInput">
      <Input
        type="number"
        sx={{ ...sx.input }}
        value={counter}
        disableUnderline={true}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value) {
            if (min != null && value < min) {
              setCounter(min);
              e.target.value = min;
            } else if (max != null && value > max) {
              setCounter(max);
              e.target.value = max;
            } else {
              setCounter(value);
              e.target.value = value;
            }
          } else {
            setCounter(0);
            e.target.value = 0;
          }
        }}
      ></Input>
      </div>

      <Button
        sx={{ ...sx.button, ...sx.buttonRight }}
        onClick={handleIncrement}
      >
        +
      </Button>
    </ButtonGroup>
  );
};

/* eslint-disable react/forbid-prop-types */
NumericInput.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.any.isRequired,
};
export default NumericInput;
