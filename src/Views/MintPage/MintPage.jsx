import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import useWeb3Ctx from '../../hooks/useWeb3Ctx';
import Success from './Success';
import maskImage from '../../assets/images/mask.jpg';
import abi from '../../contracts/SaleContract.json';
const date = new Date('2022-10-05T15:00:00.000Z');
const sx = {
  root: {
    top: 'calc(0px - 207px)',
  },

  title: {
    mb: '20px',
  },
  subTitle: {
    marginBottom: '100px',
  },
};

const MintPage = () => {
  const { onboard, handleConnect, address, ethersProvider } = useWeb3Ctx();
  const [buttonText, setButtonText] = useState('Connect Wallet');
  const [activeTab, setActiveTab] = useState(0);
  const saleContract = new ethers.Contract(
    '0x6DbD13D198944Bc49B983E146a9dF6bfA871CA13',
    abi.abi,
    ethersProvider
  );

  useEffect(() => {
    if (address && address !== null) {
      setButtonText('MINT');
      setActiveTab(1);
    } else {
      setButtonText('Connect Wallet');
      setActiveTab(0);
    }
  }, [address]);

  const handleOnClick = () => {
    switch (activeTab) {
      case 0:
        handleConnect();
        break;
      case 1:
        handleMint();
      default:
        break;
    }
  };

  const handleMint = () => {
    //something happens here;
    console.log('Mint');
    setActiveTab(2);
    setButtonText('SHARE ON TWITTER');
  };
  useEffect(() => {
    // console.log(ethersProviderVar, " ethersProviderVar")
    (async () => {
      const minted = await getMintedByWallet();
      console.log(minted, ' minted by wallet');
      const signer = saleContract.connect(ethersProvider.getSigner());
      console.log(signer, " signer")
      const presaleIn5 = await setPresaleIn(signer);
      console.log(presaleIn5, " presaleIn5")
    })();
  }, []);

  const getMintedByWallet = async () => {
    try {
      const minted = await saleContract.checkSaleIsActive();
      return minted;
    } catch (error) {
      throw Error(error);
    }
  };
  const setPresaleIn = async (signer) => {
    try {
      const minted = await signer.Rinkeby_setPresaleIn5();
      console.log(minted, " minted")
      if (minted){
        
        const res = await minted.wait().catch((e) => console.log(e, "error"));
        console.log(res, " res")
      }

      return minted;
    } catch (error) {
      throw Error(error);
    }
  };
  return (
    <Box className="center-div" sx={sx.root}>
      {activeTab > 0 && <Banner style={{ mb: '25px' }} />}
      <Typography variant="pageTitle" sx={sx.title}>
        Braves Free Mint
      </Typography>
      {activeTab < 2 && (
        <Typography variant="pageTitleDescription" sx={sx.subTitle}>
          BEGIN YOUR JOURNEY INTO BETWIXT
        </Typography>
      )}
      {activeTab < 2 && (
        <Button variant="grayButton" onClick={handleOnClick}>
          {buttonText}
        </Button>
      )}

      {activeTab === 2 && (
        <Success
          buttonText={buttonText}
          counterDate={date}
          image={maskImage}
          handleOnclick={handleOnClick}
        />
      )}
    </Box>
  );
};

export default MintPage;
