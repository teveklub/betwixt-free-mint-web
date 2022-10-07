import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import useWeb3Ctx from '../../hooks/useWeb3Ctx';
import Success from './Success';
import maskImage from '../../assets/images/mask.jpg';
import saleAbi from '../../contracts/SaleContract.json'; 
import tokenAbi from '../../contracts/TokenContract.json'; 
import config from '../../config/config';
const date = new Date('2022-10-05T15:00:00.000Z');

const BP1 = '@media (max-width: 450px)';

const sx = {
  root: {
   
  },

  title: {
    mb: '20px',
    [BP1]:{
      mt: '0px !important'
    }
  },
  subTitle: {
    marginBottom: '100px',
  },
  bannerMintedPage: {
    mt:'-45px',
    [BP1]:{
      mt: 0
    }
  }
};

const MintPage = () => {
  const { onboard, handleConnect, address, ethersProvider } = useWeb3Ctx();
  const [buttonText, setButtonText] = useState('Connect Wallet');
  const [activeTab, setActiveTab] = useState(0);
  const saleContract = new ethers.Contract(
    config.SALE_CONTRACT,
    saleAbi.abi,
    ethersProvider
  );
  const tokenContract = new ethers.Contract(
    config.TOKEN_CONTRACT,
    tokenAbi.abi,
    ethersProvider
  );
  const [minted, setMinted] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  //sale states needed a different approach, because the sales can overlap each other :/

  const [preSaleStarted, setPreSaleStarted] = useState(false);
  const [preSaleFinished, setPreSaleFinished] = useState(false);

  const [mainSaleStarted, setMainSaleStarted] = useState(false);
  const [mainSaleFinished, setMainSaleFinished] = useState(false);

  const [presaleStartTime, setPresaleStartTime] = useState(null);
  const [saleStartTime, setSaleStartTime] = useState(null);
  const [presaleEndTime, setPresaleEndTime] = useState(null);
  const [saleEndTime, setSaleEndTime] = useState(null);

  const [presaleTimeCounter, setPresaleTimeCounter] = useState(null);
  const [saleTimeCounter, setSaleTimeCounter] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [txEtherScan, setTxEtherScan] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [txInProgress, setTxInProgress] = useState(false);
  const [approveInProgress, setApproveInProgress] = useState(false);
  const [checkoutIsPresale, setCheckoutIsPresale] = useState(true);
  const [isCreditCard, setIsCreditCard] = useState(false);
  const [signature, setSignature] = useState(null);

  const [maxTokenPerAddress, setMaxTokenPerAddress] = useState(10);

  const [maxDiscountMintable, setMaxDiscountMintable] = useState(10);
  const [maxMintableDuringMainSale, setMaxMintableDuringMainSale] =
    useState(10);
  const [userMaxDiscountMintable, setUserMaxDiscountMintable] = useState(0);
  const [maxMintPerTransaction, setMaxMintPerTransaction] = useState(10);
  const [refreshInterval, setRefreshInterval] = useState(null);

  const [signatures, setSignatures] = useState(null);


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
      const saleInfo = getSaleInfo();
      // const minted = await getMintedByWallet();
      // console.log(minted, ' minted by wallet');
      // const presaleStart = await checkPresaleActive();
      // console.log("presale is active ", presaleStart)
      // const signer = saleContract.connect(ethersProvider.getSigner());
      // console.log(signer, " signer")
      // const presaleIn5 = await setPresaleIn(signer);
      // console.log(presaleIn5, " presaleIn5")
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
  const checkPresaleActive = async () => {
    try {
      const presaleIsActive = await saleContract.checkPresaleIsActive();
      return presaleIsActive;
    } catch (error) {
      throw Error(error);
    }
  };
  const setPresaleIn = async (signer) => {
    try {
      const minted = await signer.Goerli_setPresaleIn5();
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
  const getSaleInfo = async () => {
    //console.log('saleInfo',saleContract);
    setIsLoading(true);
    const info = await saleContract
      .tellEverything()
      .catch((e) => console.log('err:', e));
    //console.log('****info', info)

    const totalSupply = await tokenContract.totalSupply();
    //console.log('TS',totalSupply);

    const presaleStart = Number(info.config.presaleStart);
    const presaleEnd = Number(info.config.presaleEnd);
    const saleStart = Number(info.config.saleStart);
    const saleEnd = Number(info.config.saleEnd);

    const fullPrice = info.config.fullPrice;

    /* const maxTokens = Number(info.maxTokens);
		const userMinted = Number(info.userMinted);

		const presaleIsActive = info.presaleIsActive;
		const saleIsActive = info.saleIsActive; */

    setMaxDiscountMintable(Number(info.config.maxPresalePerAddress));
    setMaxTokenPerAddress(Number(info.config.maxSalePerAddress));

    setMaxMintPerTransaction(Number(info.config.maxMintPerTransaction));

    //	let reserved = info.maxTokens.sub(info.MaxUserMintable);
    //	setMinted(Number(info.userMinted.add(reserved)));
    setMinted(Number(totalSupply));
    //setTotalAmount(Number(info.config.MaxUserMintable?info.config.MaxUserMintable:info._MaxUserMintable)); //maxTokens

    let now = Date.parse(new Date()) / 1000;
    let now2 = Date.parse(new Date()) / 1000;
    //let now = Number(await saleContract.getBlockTimestamp());

    /* console.log('current time', now2)
				console.log('block time', now)
				console.log('presale start time', presaleStart)
				console.log('presale end time', presaleEnd)
				console.log('sale start time', saleStart)
				console.log('sale end time', saleEnd) */

    let presaleIsOver = presaleEnd - now <= 0;
    let saleIsOver = saleEnd - now <= 0;
    let saleIsOn = now >= saleStart && !saleIsOver;
    let presaleIsOn = now >= presaleStart && !presaleIsOver;

    //	let _discountPrice = 0;
    let _discountPrice = ethers.BigNumber.from('50000000000000000');

    //ec holder's hack
    //let ecHolder = getUserParams();
    //console.log('USER IS EC HOLDER', ecHolder);

    /* 	if (ecHolder) {
			_discountPrice = ethers.BigNumber.from(ecHolder.params.eth_price); //info.discountPrice;
			setUserIsEcHolder(true);
			console.log('USER IS EC HOLDER2', ecHolder);
		} else {
			setUserIsEcHolder(false);
		} */

    setDiscountPrice(ethers.utils.formatEther(_discountPrice));
    setSalePrice(ethers.utils.formatEther(fullPrice));

    setPreSaleStarted(presaleIsOn);
    setPreSaleFinished(presaleIsOver);
    /* 
		setPreSaleStarted(true);
		setPreSaleFinished(true); */

    setMainSaleStarted(saleIsOn);
    setMainSaleFinished(saleIsOver);

    //console.log(presaleStart,presaleEnd,saleStart,saleEnd,maxTokens,fullPrice,discountPrice,userMinted);

    /* 	console.log('presaleIsOver',presaleIsOver,presaleEnd-now);
				console.log('saleIsOver',saleIsOver,saleEnd-now);
				console.log('presaleIsOn',presaleIsOn,now>=presaleStart,presaleIsOver);
				console.log('saleIsOn',saleIsOn,now>=saleStart, !saleIsOver); */

    setPresaleStartTime(new Date(presaleStart * 1000));
    setPresaleEndTime(new Date(presaleEnd * 1000));
    setSaleStartTime(new Date(saleStart * 1000));
    setSaleEndTime(new Date(saleEnd * 1000));

    if (!presaleIsOn && !presaleIsOver) {
      setPresaleTimeCounter(new Date(presaleStart * 1000));
    } else {
      //console.log('presale over, or on');
      if (!presaleIsOver) {
        setPresaleTimeCounter(new Date(presaleEnd * 1000));
      }
    }

    if (!saleIsOn && !saleIsOver) {
      setSaleTimeCounter(new Date(saleStart * 1000));
    } else {
      //console.log('sale over, or on');
      if (!saleIsOver) {
        setSaleTimeCounter(new Date(saleEnd * 1000));
      }
    }
    setIsLoading(false);
  };
  return (
    <Box className="center-div" sx={sx.root}>
      {activeTab > 0 && <Banner style={sx.bannerMintedPage} />}
      <Typography variant="pageTitle" sx={{...sx.title, ...(activeTab === 2 && {mt: '-45px'})}}>
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
