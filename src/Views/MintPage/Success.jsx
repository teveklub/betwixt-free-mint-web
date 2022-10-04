import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Counter from '../../components/Counter'

const sx = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    imageHolder: {
        margin: 'auto',
        maxWidth: '378px',
        maxHeight: '378px',
        my: '27px',
        '& img': {
            height: '100%'
        }
    },
    button: {
        
        mb: '50px'
    },
    comeBackText: {
        fontSize: '20px',
        lineHeight: '24px',
        mb: '14px'
    }
}

const Success = ({ image, buttonText, counterDate, handleOnclick }) => {
    return (
        <Box sx={sx.root}>
            <Typography variant='pageTitleDescription' color='#62A077'>Success</Typography>
            <Box sx={sx.imageHolder}>
                <img src={image} alt="mask" />
            </Box>
            <Button sx={sx.button} variant='grayButton' onClick={handleOnclick}>{buttonText}</Button>

            <Typography sx={sx.comeBackText} variant="pageTitleDescription"> COME BACK FOR THE BURN EVENT</Typography>
            <Typography variant='pageTitleDescription'> TO EXPEREINCE THE BETWIXT GAME</Typography>

            <Counter date={counterDate} />
        </Box>
    )
}

export default Success