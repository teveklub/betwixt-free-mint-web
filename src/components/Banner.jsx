import { Box } from '@mui/system'
import React from 'react'
import banner from '../assets/images/banner.png'

const sx = {
    root: {
        maxWidth: '570px',
        margin: 'auto',
        'img': {
            width: '100%'
        }
    }
}

const Banner = ({ style }) => {
    return (
        <Box sx={{...sx.root, ...style }}>
            <img src={banner} alt="banner" />
        </Box>
    )
}

export default Banner