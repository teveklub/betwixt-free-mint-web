import { Box } from '@mui/system'
import React from 'react'
import Typography from '@mui/material/Typography'
import GalaxisLogo from '../assets/images/logos/Galaxis.svg'
import CamelCodingLogo from '../assets/images/logos/CC.svg'

const BP1 = '@media (max-width: 550px)';
const sx = {
    root: {
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        margin: '0 auto 0 auto',
        p: '35px 0',
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: '80px',
        rowGap: '15px',
        [BP1]: {
            justifyContent: 'center',
        }
    },
    contentHolder: {
        display: 'flex',
        gap: '5px',
        flexDirection: 'row',
        alignItems: 'center',
        '& img': {
            maxHeight: '32px',
            height: '100%',
            cursor: 'pointer'
        }
    },
    text: {
        font: 'Jotia-Regular',
        color: '#FFF',
        fontSize: '12px',

    }
}
const Footer = () => {

    const openCC = () => {
        window.open('https://camelcoding.com/', '_blank')
    }
    const openGalaxisWebsite = () => {
        window.open('https://galaxis.xyz', '_blank')
    }

    return (
        <Box sx={sx.root}>
            <Box sx={sx.contentHolder}>
                <Typography sx={sx.text}>powered by:</Typography>
                <img src={CamelCodingLogo} alt="CAMELCODING" onClick={openCC}/>
            </Box>

            <Box sx={sx.contentHolder}>
                <Typography sx={sx.text}>blockchain platform by:</Typography>
                <img src={GalaxisLogo} alt="GALAXIS" onClick={openGalaxisWebsite}/>
            </Box>
        </Box>
    )
}

export default Footer