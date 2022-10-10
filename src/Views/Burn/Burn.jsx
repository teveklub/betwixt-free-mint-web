import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import useWeb3Ctx from '../../hooks/useWeb3Ctx';
import abi from '../../contracts/SaleContract.json';
import Counter from '../../components/Counter';
import BurnSection from './components/BurnSection';
import PendingBurn from './components/PendingBurn';
import SuccesBurn from './components/SuccesBurn';
import Header from '../../components/Header';

const BP1 = '@media (max-width: 450px)';

const sx = {
    root: {
        position: 'relative',
        minHeight: '100vh',
        height: '100%',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
    },
    headerHolder: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    },
    title: {
        mb: '20px',
        [BP1]: {
            mt: '0px !important'
        }
    },
    subTitle: {
        marginBottom: '100px',
    },
    bannerMintedPage: {
        mt: '-45px',
        [BP1]: {
            mt: 0
        }
    },
    button: {
        margin: '35% auto'
    },
    counterHolder: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        gap: '30px',
    },
    pending: {
        margin: '0 auto'
    }
};
const DATE = new Date('2022-10-05T15:00:00.000Z');
const Burn = () => {
    const { onboard, handleConnect, address, ethersProvider } = useWeb3Ctx();
    const [buttonText, setButtonText] = useState('Connect Wallet');
    const [activeTab, setActiveTab] = useState(0);
    const [burnPending, setburnPending] = useState(false);
    const [statusText, setStatusText] = useState(undefined);
    const saleContract = new ethers.Contract(
        '0x6DbD13D198944Bc49B983E146a9dF6bfA871CA13',
        abi.abi,
        ethersProvider
    );

    useEffect(() => {
        if (address && address !== null) {
            setActiveTab(1);
            setStatusText('NFT DETECTED')
        } else {
            setActiveTab(0);
        }
    }, [address]);


    const signMessage = async (message) => {
        try {
            console.log(message)
            if (!window.ethereum) {
                throw new Error('No crypto wallet found');
            }
            await window.ethereum.send("eth_requestAccounts");
            const signer = ethersProvider.getSigner();
            const signature = await signer.signMessage(message)
            const address = await signer.getAddress();

            return {
                message, signature, address
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = (selectedNft) => {
        setburnPending(true)
        console.log(selectedNft);
        setActiveTab(2);
        // let dna = selectedNft;

        // signMessage(`{tokenID: ${selectedNft.tokenId}},  reforged_dna: ${dna}`).then((response) => {
        //     if (response) {
        //         console.log(response);
        //         let obj = {
        //             "address": response.address,
        //             // "message": {
        //             //     "tokenID": ctx.card.tokenId,
        //             //     "reforged_dna": dna
        //             // },
        //             "message": `{tokenID: ${ctx.card.tokenId}},  reforged_dna: ${dna}`,
        //             "signature": response.signature
        //         }
        //         console.log(obj)
        //         // postForge(obj).then(() => {
        //         //     setForgePending(true)

        //         // }).catch((e) => { console.log(e) })
        //     }
        // })
    }
    useEffect(() => {
        let timer = null;
        if (burnPending) {
            timer = setInterval(() => {
                // axios.get(`https://god-panels-metadata-staging.herokuapp.com/api/reforge/${ctx.card.tokenId}/status`)
                //     .then((response) => {
                //         if (response.data.reforgeStatus === 'completed') {
                //             setOpenCongratulationModal(true);
                //             setForgePending(false)
                //         }
                //     })
                setActiveTab(3);
                setStatusText(undefined)
            }, 2000);
        } else return;
        return () => clearInterval(timer);
    }, [burnPending])


    return (
        <Box className="center-div">
            <Box sx={sx.root} >
                {/* <Box sx={sx.headerHolder}>
                    <Banner style={sx.bannerMintedPage} />
                    <Typography variant="pageTitle" sx={{ ...sx.title }}>
                        Braves Burn Event
                    </Typography>
                </Box> */}
                <Header statusText={statusText}/>
                {activeTab === 0 &&
                    <>
                        <Button variant='grayButton' onClick={handleConnect} sx={sx.button}>Connect Wallet</Button>
                        <Box sx={sx.counterHolder}>
                            <Typography variant="pageTitleDescription">
                                BURN YOUR MASK TO EXPEREINCE THE BETWIXT GAME
                            </Typography>
                            <Counter date={DATE} />
                        </Box>
                    </>
                }
                {activeTab === 1 &&
                    <BurnSection handleSubmit={handleSubmit} setStatusText={setStatusText}/>
                }
                {activeTab === 2 && <PendingBurn />}
                {activeTab === 3 && <SuccesBurn />}
            </Box>
        </Box>
    )
}

export default Burn