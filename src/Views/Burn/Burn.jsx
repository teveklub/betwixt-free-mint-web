import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import useWeb3Ctx from '../../hooks/useWeb3Ctx';
import abi from '../../contracts/SaleContract.json';
import Counter from '../../components/Counter';
import BurnSection from './components/BurnSection';

const BP1 = '@media (max-width: 450px)';

const sx = {
    root: {
        heigt: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
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

    }
};
const DATE = new Date('2022-10-05T15:00:00.000Z');
const Burn = () => {
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
            setActiveTab(1);
        } else {
            setActiveTab(0);
        }
    }, [address]);

    const handleOnClick = () => {
        switch (activeTab) {
            case 0:
                handleConnect();
                break;
            case 1:
                handleBurn();
            default:
                break;
        }
    };

    const handleBurn = () => {
        console.log('burn')
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
            if (minted) {

                const res = await minted.wait().catch((e) => console.log(e, "error"));
                console.log(res, " res")
            }

            return minted;
        } catch (error) {
            throw Error(error);
        }
    };




    return (
        <Box className="center-div" >
            <Box sx={sx.root}>
                <Box sx={sx.headerHolder}>
                    <Banner style={sx.bannerMintedPage} />
                    <Typography variant="pageTitle" sx={{ ...sx.title }}>
                        Braves Burn Event
                    </Typography>
                </Box>
                {activeTab === 0 &&
                    <>
                        <Button variant='grayButton' onClick={handleOnClick} sx={sx.button}>Connect Wallet</Button>
                        <Box sx={sx.counterHolder}>
                            <Typography variant="pageTitleDescription">
                                BURN YOUR MASK TO EXPEREINCE THE BETWIXT GAME
                            </Typography>
                            <Counter date={DATE} />
                        </Box>
                    </>
                }
                {activeTab === 1 &&
                   <BurnSection />
                }
            </Box>
        </Box>
    )
}

export default Burn