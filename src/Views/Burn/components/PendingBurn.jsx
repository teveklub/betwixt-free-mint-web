import React from 'react'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

const sx = {
    root: {
        position: 'relative',
        top: '-50px',
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    }
}


const PendingBurn = () => {
    return (
        <Box sx={sx.root}>
            <Typography variant="counterNumber">BURNING MASK</Typography>
            <Typography variant='pageTitleDescription'>PREPARE FOR THE LIGHT</Typography>
        </Box>
    )
}

export default PendingBurn