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
import whitelist from '../../whitelist/whitelist.json';
import CheckoutModal from './CheckoutModal';
import TxProgressModal from './TxProgressModal';
const date = new Date('2022-10-17T15:00:00.000Z');

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
    fontSize: '24px',
  },
  bannerMintedPage: {
    // mt: '-45px',
    [BP1]: {
      mt: 0,
    },
  },
  pubMintHolder: {
    dispaly: 'flex',
    mb: '40px',
    gap: '10px'
  }
};

const MintPage = () => {
  const { onboard, handleConnect, address, ethersProvider } = useWeb3Ctx();
  const [buttonText, setButtonText] = useState('Connect Wallet');
  const [activeTab, setActiveTab] = useState(0);
  const [userAlreadyMinted, setUserAlreadyMinted] = useState(false);
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
  const [maxMintPerTransaction, setMaxMintPerTransaction] = useState(1);
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [counintingOver,setCountingOver]= useState(0);
  const [signatures, setSignatures] = useState(null);

  useEffect(() => {
    console.log('address: ', address);
    if (address && address !== null) {
      setButtonText('MINT');
      setActiveTab(1);
    } else {
      setButtonText('Connect Wallet');
      setActiveTab(0);
    }
  }, [address]);
  useEffect(() => {
    if (address === null) return;
    (async () => {
      const alreadyMintedByWallet = await saleContract
        ._mintedByWallet(address)
        .catch((e) => console.log);
      if (alreadyMintedByWallet.toNumber() > 0) {
        setUserAlreadyMinted(true);
      }
      console.log(alreadyMintedByWallet, ' setUserAlreadyMinted');
    })();
  }, []);

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
  const handleGoToWallet = () => {
    setActiveTab(2);
  };

  useEffect(() => {
    // console.log(ethersProviderVar, " ethersProviderVar")
    if (address === null) return;
    (async () => {
      const balanceOf = await tokenContract
        .balanceOf(address)
        .catch((e) => toast.error(e.message));
      console.log(balanceOf.toNumber(), ' balance');
      if (balanceOf < 1) return;
      const token = await tokenContract
        .tokenOfOwnerByIndex(address, 0)
        .catch((e) => {
          toast.error(e.message);
        });
      if (token) {
        console.log(token, ' token');
      }
      // const minted = await getMintedByWallet();
      // console.log(minted, ' minted by wallet');
      // const presaleStart = await checkPresaleActive();
      // console.log("presale is active ", presaleStart)
      // const signer = saleContract.connect(ethersProvider.getSigner());
      // console.log(signer, " signer")
      // const presaleIn5 = await setPresaleIn(signer);
      // console.log(presaleIn5, " presaleIn5")
    })();
  }, [activeTab]);

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
  }, [counintingOver]);

  const getUserParams = () => {
    let up = null;
    if (address) {
      //console.log('SIGNATURES-------',signatures);

      const key = Object.keys(whitelist).find(
        (key) => key.toLowerCase() == address.toLowerCase()
      );
      //console.log('USER KEY', key);
      if (key) {
        // const userParams = whitelist[key].paramObj;
        const userParamsRaw = whitelist[key].params;

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
            max_mint: userParamsRaw[3],
            receiver: userParamsRaw[4],
            valid_from: userParamsRaw[5],
            valid_to: userParamsRaw[6],
            eth_price: userParamsRaw[7],
          },
          raw_params: userParamsRaw,
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

    // let time = 1665648120;
    const presaleStart = Number(info.config.presaleStart);
    // const presaleStart = Number(info.config.presaleStart);
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
    console.log(saleStart, ' presale end');
    let presaleIsOver = presaleEnd - now <= 0;
    let saleIsOver = saleEnd - now <= 0;
    let saleIsOn = now >= saleStart && !saleIsOver;
    let presaleIsOn = now >= presaleStart && !presaleIsOver;
    // let presaleIsOver = saleEnd - now <= 0;
    // let saleIsOver = saleStart - now <= 0;
    // let saleIsOn = now >= presaleStart && !saleIsOver;
    // let presaleIsOn = now >= presaleEnd && !presaleIsOver;

    //	let _discountPrice = 0;
    let _discountPrice = ethers.BigNumber.from('50000000000000000');

    setDiscountPrice(ethers.utils.formatEther(_discountPrice));
    setSalePrice(ethers.utils.formatEther(fullPrice));

    setPreSaleStarted(presaleIsOn);
    setPreSaleFinished(presaleIsOver);
    /* 
    setPreSaleStarted(true);
    setPreSaleFinished(true); */

    setMainSaleStarted(saleIsOn);
    setMainSaleFinished(saleIsOver);

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
    console.log('handle discount mint');
    let maxMintable = 0;

    //mintInfo =  await saleContract.checkDiscountAvailable(address);

    const userParams = getUserParams();

    if (!userParams) {
      toast.error('Address not found in the whitelist');
      setShowErrorPopup(true);
      return;
    }

    const alreadyMintedByWallet = await saleContract
      ._mintedByWallet(address)
      .catch((e) => console.log);
    console.log(alreadyMintedByWallet, ' alreadyMintedByWallet');
    //console.log('minted by wallet',alreadyMintedByWallet);

    if (alreadyMintedByWallet) {
      maxMintable = userParams.params.max_mint - Number(alreadyMintedByWallet);
    }

    //console.log('maxMintable', maxMintable);

    if (maxMintable < 1) {
      toast.error('You have already used up your presale quota.');
      return;
    }
    console.log(maxMintable, ' maxmintable');
    setUserMaxDiscountMintable(Math.min(maxMintPerTransaction,maxMintable));
    // setUserMaxDiscountMintable(maxMintable);
    setCheckoutIsPresale(true);
    setIsCreditCard(false);
    setShowCheckout(true);
  };
  const handleReveal = async () => {
    const reveal = await saleContract
      .Goerli_revealAtCurrentSuppl()
      .catch((e) => console.log('err:', e));
    if (reveal) {
    }
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
    let tx = null;

    tx = await sc
      .mint_approved([...userParams.raw_params, userParams.signature], amount, {
        value: amount,
      })
      .catch(handleError);

    setApproveInProgress(false);

    if (tx) {
      setTxEtherScan(`${config.ETHERSCAN_URL}/tx/${tx.hash}`);
      setTxInProgress(true);
      let res = await tx.wait().catch((e) => {
        console.log(e, ' errrrrrrrror');
        handleError(e);
        setTxInProgress(false);
      });

      // let resTwo = await tx.getTransactionHash().catch((e) => {
      //   console.log(e, " errrrrrrrror")
      //   handleError(e);
      //   setTxInProgress(false);
      // });
      // let receipt = await resTwo.getReceipt();
      if (res) {
        console.log(res, " ressss 443")
        setTxInProgress(false);
        getSaleInfo();
        setActiveTab(2); //-> wallet
      }

      localStorage.setItem('activeTab', 1);
    }
  };

  const mintRegular = async (amount) => {
    let sc = saleContract.connect(ethersProvider.getSigner());

    setShowCheckout(false);
    setApproveInProgress(true);
    const tx = await sc
      .mint(amount, { value: ethers.utils.parseEther(salePrice.toString()) })
      .catch(handleError);
    setApproveInProgress(false);

    if (tx) {
      setTxEtherScan(`${config.ETHERSCAN_URL}/tx/${tx.hash}`);
      setTxInProgress(true);
      await tx.wait().then(()=>{
        setTxInProgress(false);
        getSaleInfo();
        setActiveTab(2);
      }).catch((e) => {
        handleError(e);
        setTxInProgress(false);
      })
      
      // localStorage.setItem('activeTab', 1);
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
  const handleCountingOver = () =>{
    setCountingOver((value)=> value+1)
  }
  return (
    <Box className="center-div" sx={sx.root}>
      {activeTab > 0 && (
        <Banner style={sx.bannerMintedPage} onClick={() => setActiveTab(1)}
         />
      )}
      <Typography
        variant="pageTitle"
        sx={{ ...sx.title, ...(activeTab === 2 && { mt: '-45px' }) }}
      >
        Braves Free Mint
      </Typography>
      {activeTab < 2 && (
        <Typography
          variant="pageTitleDescription"
          sx={{ ...sx.subTitle, marginBottom: '40px', color: '#594569', fontSize: '14px' }}
        >
          BEGIN YOUR JOURNEY INTO BETWIXT
        </Typography>
      )}

{preSaleFinished && mainSaleFinished && <Success counterDate={date} salesOver/>}


      {activeTab < 2 && (
        <>
          {preSaleStarted ? (
            <>
            <Typography variant="pageTitleDescription" sx={sx.subTitle} style={{marginBottom: '10px'}}>
              Whitelist mint:
            </Typography>
            <Typography variant="pageTitleDescription" sx={sx.subTitle} style={{backgroundColor: '#594569', padding: '17px 20px', marginBottom: '40px', width: '140px', marginTop: '15px', fontSize: '18px'}}>
              started
            </Typography>
            </>
          ) : (
            <>
              {!preSaleFinished && (
                <>
                  <Typography
                    variant="pageTitleDescription"
                    sx={sx.subTitle}
                    style={{ marginBottom: 0 }}
                  >
                    Whitelist mint starts in :
                  </Typography>
                  <Counter date={presaleTimeCounter} handleCountingOver={handleCountingOver}/>
                  <br />
                </>
              )}
            </>
          )}
          {mainSaleStarted ? (
            <>
            <Typography variant="pageTitleDescription" sx={sx.subTitle} style={{marginBottom: '10px'}}>
             Public mint: 
            </Typography>
             <Typography variant="pageTitleDescription" sx={sx.subTitle} style={{backgroundColor: '#594569', padding: '17px 20px', marginBottom: '40px', width: '140px', marginTop: '15px', fontSize: '18px'}}>
             started
           </Typography>
           </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
             {preSaleStarted && !mainSaleFinished && (
                <>
                  <Typography variant="pageTitleDescription" sx={sx.subTitle}>
                  Public mint starts in :
                  </Typography>
                  <Counter date={saleTimeCounter} handleCountingOver={handleCountingOver} />
                </>
              )}
            

              {!preSaleStarted && !preSaleFinished &&  (
                <Box className="pubMintHolder" sx={sx.pubMintHolder}>
                  <Typography variant="pageTitleDescription" style={{fontSize: '18px'}}>
                  Public mint starts in :
                  </Typography>
                  <Typography variant="pageTitleDescription" style={{color:'#594569', fontWeight: '700', fontSize: '18px'}}> <Counter date={saleTimeCounter}  handleCountingOver={handleCountingOver} simple /></Typography>
                </Box>
              )}
              
            </Box>
          )}

          {activeTab !== 2 && (preSaleStarted || mainSaleStarted) && (
            <>
              <Button variant="grayButton" onClick={handleOnClick}>
                {buttonText}
              </Button>
            </>
          )}
          {/* {!mainSaleStarted && !preSaleStarted && !mainSaleFinished && !preSaleFinished &&
          <>
          <Typography
          variant="pageTitleDescription"
          sx={sx.subTitle}
          style={{ marginBottom: 0 }}
        >
          Mint is not started yet!
        </Typography>
        </>
          } */}
          {/* {showErrorPopup 
          &&  <Typography variant="pageTitleDescription" sx={sx.subTitle}>
          userParams error
        </Typography>
          } */}
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
            // salePrice={salePrice}
            salePrice="FREE"
            presalePrice="FREE"
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
        <>
          <Success counterDate={date} image={maskImage} />
        </>
      )}
      {/* {activeTab === 2 && !txInProgress && !approveInProgress && !mainSaleFinished && ! preSaleFinished &&  (
        <>
          <Success counterDate={date} image={maskImage} failed/>
        </>
      )} */}

      <TxProgressModal isOpen={txInProgress} txEtherScan={txEtherScan} />
    </Box>
  );
};

export default MintPage;
