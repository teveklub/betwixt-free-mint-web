import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import NtfList from './NtfList'
import mask from '../../../assets/images/mask.jpg';
import SelectedImageHolder from './SelectedImageHolder';
import { zoomFetchTokenUris } from '../../../utils/zoom2'
import { useZoom2Contract } from '../../../hooks/useContract'
import { Contract } from 'ethers';
import useWeb3Ctx from '../../../hooks/useWeb3Ctx';

const BP1 = '@media (max-width: 1024px)';

const METADATA = [
    {
        id: 1,
        image: mask
    },
    {
        id: 1,
        image: mask
    },
    {
        id: 1,
        image: mask
    }
]
const sx = {
    root: {
        position: 'relative',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    contentHolder: {
        width: '90vw',
        display: 'flex',
        justifyContent: 'space-between',
        '&:after': {
            content: '""',
            width: '300px',
            [BP1]: {
                content: 'none'
            }
        },
        [BP1]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '25px'
        }
    },
}

const BurnSection = ({handleSubmit, setStatusText}) => {
    const { onboard, handleConnect, address, ethersProvider } = useWeb3Ctx();
    const [selectedNft, setselectedNft] = useState(undefined);

    const [loading, setLoading] = useState(false);

    const selectMeta = (metadata) => {
        setselectedNft(metadata)
        setStatusText("NFT SELECTECT")
    }

    // useEffect(() => {
    //     if (address) {
    //         let token;
    //         if (config.TOKEN_CONTRACT) {
    //             token = new Contract(config.TOKEN_CONTRACT, ABI.abi, ethersProvider);

               
    //             if (!token) {
    //                 console.error('Token contract not found on address', tokenAddress);
    //                 return;
    //             }
    //             getTokens(token);
    //         }

    //     }
    // }, [address]);

    // const getTokens = async (token) => {
    //     setLoading(true);

    //     const metas = await zoomFetchTokenUris(
    //         token,
    //         zoomContract,
    //         address
    //     );
    //     console.log(metas)

    //     if (metas) {
    //         // console.log('TOKE META',metas);
    //         setTokenMetas(metas);
    //     } else {
    //         setTokenMetas([]);
    //     }
    //     setLoading(false);
    // };


    return (
        <Box sx={sx.root}>
            <Box sx={sx.contentHolder}>
                <NtfList metadatas={METADATA} selectMeta={selectMeta} />
                <SelectedImageHolder selectedNft={selectedNft} handleBurn={handleSubmit} />
            </Box>
        </Box>
    )
}

export default BurnSection