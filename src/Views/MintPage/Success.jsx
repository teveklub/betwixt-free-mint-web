import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Counter from '../../components/Counter'

const BP1 = '@media (max-width: 600px)';

const sx = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    imageHolder: {
        margin: 'auto',
        width: 'auto',
        my: '27px',
        '& img': {
            maxWidth: '378px',
            maxHeight: '378px',
            height: '100%'
        },
        [BP1]: {
            '& img': {
                maxWidth: '280px',
                maxHeight: '280px',
                height: '100%'
            },
        }
    },
    button: {

        mb: '50px'
    },
    comeBackText: {
        fontSize: '20px',
        lineHeight: '24px',
        mb: '14px',
        [BP1]: {
            fontSize: '16px',
            lineHeight: '20px',
        }
    }
}

const Success = ({ image, buttonText, counterDate, handleOnclick,handleReveal }) => {
    return (
        <Box sx={sx.root}>
            <Typography variant='pageTitleDescription' color='#62A077'>Success</Typography>
            <Box sx={sx.imageHolder}>
                <img src={image} alt="mask" />
            </Box>
            <Button sx={sx.button} variant='grayButton' onClick={handleOnclick}>{buttonText}</Button>
            <Button sx={sx.button} variant='grayButton' onClick={handleReveal}>{buttonText}</Button>
            <Typography sx={sx.comeBackText} variant="pageTitleDescription"> COME BACK FOR THE BURN EVENT</Typography>
            <Typography variant='pageTitleDescription'> TO EXPEREINCE THE BETWIXT GAME</Typography>

            <Counter date={counterDate} />
        </Box>
    )
}

export default Success