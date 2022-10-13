import { Box } from '@mui/system'
import React from 'react'
import banner from '../assets/images/banner.svg'
import { useNavigate } from 'react-router-dom'
const sx = {
    root: {
        maxWidth: '570px',
        margin: 'auto',
        paddingBottom:"50px",
        'img': {
            width: 'auto',
            height:"130px"

        }
    }
}

const Banner = ({ style,onClick }) => {
    const navigate = useNavigate();
    return (
        <Box sx={{...sx.root, ...style }} onClick={onClick}>
            <img src={banner} alt="banner" />
        </Box>
    )
}

export default Banner