import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
const sx = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
    },
    imgHolder: {
        '& img':{
            width: '379px',
            height: '379px',
        }
    },
    placeholder:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '377px',
        height: '377px',
        border: '1px solid #628BA0'
    }
}
const SelectedImageHolder = ({ selectedNft, handleBurn }) => {
    return (
        <Box sx={sx.root}>
            {selectedNft ?
                <Box sx={sx.imgHolder}>
                    <img src={selectedNft.image} alt="" />
                </Box> :
                <Box sx={sx.placeholder}>
                    <Typography variant='boxText'>
                        SELECT NFT TO BURN
                    </Typography>
                </Box>
            }

            <Button variant='grayButton' disabled={selectedNft ? false : true} onClick={handleBurn}>
                BURN
            </Button>
        </Box>
    )
}

export default SelectedImageHolder