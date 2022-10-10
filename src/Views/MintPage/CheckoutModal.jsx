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
    fontFamily: "poppins",
    fontWeight: 700,
    size: 26,
    mb: 1,
  },
  text: {
    fontFamily: "poppins",
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
        <Typography sx={sx.title}>{tokenName} Token</Typography>
        <Typography sx={sx.text}>
          Please select the number of NFT you wish to mint.
        </Typography>

        {isPresale && (
          <MintQuantity
            price={Number(presalePrice)}
            maxAmount={whitelistLimit}
            onClickMint={mintPresale}
          />
        )}
        {!isPresale && (
          <MintQuantity
            price={Number(salePrice)}
            maxAmount={whitelistLimit}
            onClickMint={mintSale}
          />
        )}
      </Box>
    </PopupModal>
  );
};

export default CheckoutModal;
