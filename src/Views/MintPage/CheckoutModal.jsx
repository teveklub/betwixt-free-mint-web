import { Typography, Box } from "@mui/material";
import PopupModal from "./PopupModal";
import MintQuantity from "./MintQuantity";

const sx = {
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "top",
    textAlign: "center",
    gap: "0 25px",
  },
  title: {
    size: 26,
    mb: 1,
  },
  text: {
    fontFamily: "Jotia-Regular",
    color: '#FFF',
    fontSize: 12,
  },
};

const CheckoutModal = ({
  tokenName,
  setOpen,
  isOpen,
  mintPresale,
  mintSale,
  isPresale,
  presalePrice,
  salePrice,
  whitelistLimit,
}) => {
  const headerText = isPresale ? "Presale Checkout" : "Checkout";


  return (
    <PopupModal setOpen={setOpen} isOpen={isOpen} header={headerText}>
      <Box sx={sx.content}>
        <Typography sx={sx.title} variant='share'>{tokenName} Token</Typography>
        <Typography sx={sx.text}>
          Please select the number of NFT you wish to mint.
        </Typography>

        {isPresale && (
          <MintQuantity
            price={presalePrice}
            maxAmount={whitelistLimit}
            onClickMint={mintPresale}
          />
        )}
        {!isPresale && (
          <MintQuantity
            price={salePrice}
            maxAmount={1}
            onClickMint={mintSale}
          />
        )}
      </Box>
    </PopupModal>
  );
};

export default CheckoutModal;
