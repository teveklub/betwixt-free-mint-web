import { Box } from '@mui/system'
import React from 'react'
import banner from '../assets/images/banner.png'
import Typography from '@mui/material/Typography'

const BP1 = '@media (max-width: 450px)';

const sx = {
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        [BP1]:{
            mb: '20px'
        }
    },
    imgHolder: {
        maxWidth: '570px',
        margin: 'auto',
        'img': {
            width: '100%'
        }
    },
    text: {
        margin: 'auto',
        m: '12px auto 0 auto'
    }
}
const Header = ({ statusText }) => {
    return (
        <Box sx={sx.root}>
            <Box sx={sx.imgHolder}>
                <img src={banner} alt="banner" />
            </Box>
            <Typography variant="pageTitle">Braves Burn Event</Typography>
            {statusText && <Typography variant='pageTitleDescription' sx={sx.text}>
                {statusText}
            </Typography>}
        </Box>
    )
}

export default Header