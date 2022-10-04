import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Banner from '../../components/Banner'
import useWeb3Ctx from '../../hooks/useWeb3Ctx'
import Success from './Success'
import maskImage from '../../assets/images/mask.jpg'


const date = new Date('2022-10-05T15:00:00.000Z');
const sx = {
    root: {
        top: 'calc(0px - 207px)',
    },

    title: {
        mb: '20px'
    },
    subTitle: {
        marginBottom: '100px'
    }
}

const MintPage = () => {
    const { onboard, handleConnect, address, ethersProvider } = useWeb3Ctx();
    const [buttonText, setButtonText] = useState("Connect Wallet");
    const [activeTab, setActiveTab] = useState(0);


    useEffect(() => {
        if (address && address !== null) {
            setButtonText("MINT")
            setActiveTab(1)
        }
        else {
            setButtonText("Connect Wallet")
            setActiveTab(0)
        }
    }, [address])
    console.log(activeTab, address)

    const handleOnClick = () => {
        switch (activeTab) {
            case 0:
                handleConnect();
                break;
            case 1:
                handleMint()
            default:
                break;
        }
    }

    const handleMint = () => {
        //something happens here;
        console.log('Mint')
        setActiveTab(2)
        setButtonText("SHARE ON TWITTER");
    }
    return (
        <Box className='center-div' sx={sx.root}>
            {activeTab > 0 && <Banner style={{ mb: '25px' }} />}
            <Typography variant='pageTitle' sx={sx.title}>Braves Free Mint</Typography>
            {activeTab < 2 && <Typography variant='pageTitleDescription' sx={sx.subTitle}>BEGIN YOUR JOURNEY INTO BETWIXT</Typography>}
            {activeTab < 2 && <Button variant='grayButton' onClick={handleOnClick}>{buttonText}</Button>}

            {activeTab === 2 && <Success buttonText={buttonText} counterDate={date} image={maskImage} handleOnclick={handleOnClick} />}
        </Box>
    )
}

export default MintPage