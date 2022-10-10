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
import Counter from '../../components/Counter';
import { toast } from 'react-toast';
import whitelist from "../../whitelist/whitelist.json"
import CheckoutModal from './CheckoutModal';
const date = new Date('2022-10-05T15:00:00.000Z');

const BP1 = '@media (max-width: 450px)';

const sx = {
  root: {},

  title: {
    mb: '20px',
    [BP1]: {
      mt: '0px !important',
    },
  },
  subTitle: {
    marginBottom: '30px',
  },
  bannerMintedPage: {
    mt: '-45px',
    [BP1]: {
      mt: 0,
    },
  },
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
  const [showCheckout, setShowCheckout] = useState(true);
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
        if (preSaleStarted) {
          handleDiscountMint();
        }
        if (mainSaleStarted) {
          handleMint();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // console.log(ethersProviderVar, " ethersProviderVar")
    (async () => {
      const saleInfo = await getSaleInfo().then((response) => {
        console.log(response);
      });

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
      console.log(minted, ' minted');
      if (minted) {
        const res = await minted.wait().catch((e) => console.log(e, 'error'));
        console.log(res, ' res');
      }

      return minted;
    } catch (error) {
      throw Error(error);
    }
  };
  const getUserParams = () => {
    let up = null;
    if (address) {
      //console.log('SIGNATURES-------',signatures);

      const key = Object.keys(whitelist).find(
        (key) => key.toLowerCase() == address.toLowerCase()
      );
        toast.success(key)
      //console.log('USER KEY', key);
      if (key) {
        const userParams = whitelist[key].paramObj;

        // up = {
        //   params: {
        //     max_mint: userParams[3],
        //     receiver: userParams[4],
        //     valid_from: userParams[5],
        //     valid_to: userParams[6],
        //     eth_price: userParams[7],
        //   },
        //   raw_params: userParams,
        //   signature: whitelist[key].signature,
        // };
        up = {
          params: {
            max_mint: userParams["max_mint"],
            receiver: userParams['receiver'],
            valid_from: userParams['valid_from'],
            valid_to: userParams['valid_to'],
            eth_price: userParams['eth_price'],
          },
          raw_params: userParams,
          signature: whitelist[key].signature,
        };
        // console.log(up, " up")
      }
    }
    return up;
  };
  const getSaleInfo = async () => {
    //console.log('saleInfo',saleContract);
    setIsLoading(true);
    const info = await saleContract
      .tellEverything()
      .catch((e) => console.log('err:', e));
    console.log('****info', info);

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
    console.log(saleStart, " presale end")
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

  const handleDiscountMint = async () => {
    
    let maxMintable = 0;

    //mintInfo =  await saleContract.checkDiscountAvailable(address);

    const userParams = getUserParams();

    if (!userParams) {
      
      setShowErrorPopup(true);
      return;
    }
    
    const alreadyMintedByWallet = await saleContract
      ._mintedByWallet(address)
      .catch((e) => console.log);
      
    //console.log('minted by wallet',alreadyMintedByWallet);

    if (alreadyMintedByWallet) {
      maxMintable = userParams.params.max_mint - Number(alreadyMintedByWallet);
    }
    
    //console.log('maxMintable', maxMintable);

    if (maxMintable < 1) {
      toast.error('You have already used up your presale quota.');
      return;
    }
    console.log(maxMintable, " alreadyMintedByWallet");
    setUserMaxDiscountMintable(maxMintable);
    setCheckoutIsPresale(true);
    setIsCreditCard(false);
    setShowCheckout(true);
  };

  const handleMint = async () => {
    setApproveInProgress(true);
    console.log('!!!!!!!max tokens per adddres', maxTokenPerAddress);
    const alreadyMintedByWallet = await saleContract
      ._mintedByWallet(address)
      .catch((e) => console.log);

    if (alreadyMintedByWallet) {
      let maxMintableMainSale =
        maxTokenPerAddress - Number(alreadyMintedByWallet);

      if (maxMintableMainSale > 0) {
        setMaxMintableDuringMainSale(
          maxMintableMainSale < maxMintPerTransaction
            ? maxMintableMainSale
            : maxMintPerTransaction
        );

        /* 	if (userIsEcHolder) {
          setUserMaxDiscountMintable(maxMintableMainSale < maxMintPerTransaction ? maxMintableMainSale : maxMintPerTransaction);
        } */

        //	setCheckoutIsPresale(userIsEcHolder);//!!! ec holder hack. it should be false otherwise
        setCheckoutIsPresale(false);
        setIsCreditCard(false);
        setApproveInProgress(false);
        setShowCheckout(true);
      } else {
        setApproveInProgress(false);
        toast.error('You have alredy used up your quota.');
      }
    } else {
      setApproveInProgress(false);
      console.log("can't get already minted tokens");
    }
  };

  const mintDisco = async (amount, price) => {
    let sc = saleContract.connect(ethersProvider.getSigner());

    setShowCheckout(false);
    
    setApproveInProgress(true);

    let userParams = getUserParams();

    if (!userParams) {
      return;
    }
  
    console.log('user PARAMS', userParams);
    toast.success("eljut ")
    let tx = null;
    tx = await sc
      .mint_approved([...userParams.raw_params, userParams.signature], amount, {
        value: ethers.utils.parseEther(price.toString()),
      })
      .catch(handleError);
   

    setApproveInProgress(false);

    if (tx) {
      setTxEtherScan(`${config.ETHERSCAN_URL}/tx/${tx.hash}`);
      setTxInProgress(true);
      await tx.wait().catch((e) => {
        handleError(e);
        setTxInProgress(false);
      });
      setTxInProgress(false);
      getSaleInfo();
      // setTab(1); //-> wallet

      localStorage.setItem('activeTab', 1);
    }
  };

  const mintRegular = async (amount, price) => {
    console.log(amount * price);
    let sc = saleContract.connect(ethersProvider.getSigner());

    setShowCheckout(false);
    setApproveInProgress(true);
    const tx = await sc
      .mint(amount, { value: ethers.utils.parseEther(price.toString()) })
      .catch(handleError);
    setApproveInProgress(false);

    if (tx) {
      setTxEtherScan(`${config.ETHERSCAN_URL}/tx/${tx.hash}`);
      setTxInProgress(true);
      await tx.wait().catch((e) => {
        handleError(e);
        setTxInProgress(false);
      });
      setTxInProgress(false);
      getSaleInfo();
      // setTab(1); //-> wallet
      localStorage.setItem('activeTab', 1);
    }
  };
  const handleError = (e) => {
    console.error(e);
    if (e.error && e.error.message) {
      toast.error(e.error.message);
      console.log(e.error.message);
    } else if (e.message) {
      toast.error(e.message);
      console.log(e.message);
    } else if (e.reason) {
      toast.error(e.reason);
      console.log(e.reason);
    }
  };
  return (
    <Box className="center-div" sx={sx.root}>
      {activeTab > 0 && <Banner style={sx.bannerMintedPage} />}
      <Typography
        variant="pageTitle"
        sx={{ ...sx.title, ...(activeTab === 2 && { mt: '-45px' }) }}
      >
        Braves Free Mint
      </Typography>
      {activeTab < 2 && (
        <Typography variant="pageTitleDescription" sx={{...sx.subTitle, marginBottom:"70px"}}>
          BEGIN YOUR JOURNEY INTO BETWIXT
        </Typography>
      )}
      {activeTab < 2 && (
        <>
          {preSaleStarted ? (
            <Typography variant="pageTitleDescription" sx={sx.subTitle}>
              Presale started
            </Typography>
          ) : (
            <Counter date={presaleTimeCounter} />
          )}
          {mainSaleStarted ? (
            <Typography variant="pageTitleDescription" sx={sx.subTitle}>
              Main sale started
            </Typography>
          ) : (
            <Box sx={{textAlign:"center"}}>
              <Typography variant="pageTitleDescription" sx={sx.subTitle}>
                Main sale starts in :
              </Typography>
              <Counter date={saleTimeCounter} />
              <br/>
            </Box>
          )}
          <Button variant="grayButton" onClick={handleOnClick}>
            {buttonText}
          </Button>
          {showErrorPopup 
          &&  <Typography variant="pageTitleDescription" sx={sx.subTitle}>
          userParams error
        </Typography>
          }
          <CheckoutModal
        tokenName=""
        isOpen={showCheckout}
        setOpen={() => {
          if (!txInProgress && !approveInProgress) {
            setShowCheckout(false);
          }
        }}
        isPresale={checkoutIsPresale}
        withCreditCard={isCreditCard}
        whitelistLimit={
          checkoutIsPresale
            ? userMaxDiscountMintable
            : maxMintableDuringMainSale
        }
        salePrice={salePrice}
        presalePrice={discountPrice}
        mintSale={mintRegular}
        mintPresale={mintDisco}
      />
        </>
      )}
      {/*<Typography variant="pageTitleDescription" >PResale </Typography>
      <Counter date={presaleTimeCounter} />
       <Typography variant="pageTitleDescription" >Sale </Typography>
      <Counter date={saleTimeCounter} /> */}

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
