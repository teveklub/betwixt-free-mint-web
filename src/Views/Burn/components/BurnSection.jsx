import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import NtfList from './NtfList'
import mask from '../../../assets/images/mask.jpg';
import SelectedImageHolder from './SelectedImageHolder';

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
    root:{
        display: 'flex',
        flexDirection: 'column'
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
    text: {
        margin: 'auto',
        m: '12px auto 100px auto'
    }
}

const BurnSection = () => {
    const [selectedNft, setselectedNft] = useState(undefined)

    const selectMeta = (metadata) => {
        setselectedNft(metadata)
    }
    return (
        <Box sx={sx.root}>
            <Typography variant='pageTitleDescription' sx={sx.text}>
                {selectedNft ? 'NFT DETECTED' : 'NFT selected'}
            </Typography>

            <Box sx={sx.contentHolder}>
                <NtfList metadatas={METADATA} selectMeta={selectMeta}/>
                <SelectedImageHolder selectedNft={selectedNft} />
            </Box>
        </Box>
    )
}

export default BurnSection