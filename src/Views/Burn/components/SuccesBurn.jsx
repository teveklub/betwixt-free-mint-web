import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import treeImg from '../../../assets/images/tree.png'

const BP1 = '@media (max-width: 450px)';

const sx = {
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
    },
    imgHolder: {
        display: 'flex',
        justifyContent: 'center',
        '& img': {
            width: '379px',
            height: '379px',

            [BP1]: {
                width: '250px',
                height: '250px',
            }
        }
    },
}
const SuccesBurn = () => {
    const handlePlay = () => {
        window.open('https://google.com', '_blank')
    }
    const share = () => {
        console.log('share')
    }
    return (
        <Box sx={sx.root}>
            <Box sx={sx.imgHolder}>
                <img src={treeImg} alt='tree' />
            </Box>
            <Button variant='grayButton' onClick={handlePlay}>Play the game</Button>

            <Typography variant="share" onClick={share}>SHARE ON TWITTER</Typography>
        </Box>
    )
}

export default SuccesBurn