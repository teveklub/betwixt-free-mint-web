import { Box } from '@mui/system';
import React from 'react';

const sx = {
    root: {
        // position: 'absolute',
        // right: '60%',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        gap: '25px',
        maxWidth: '300px'
    },
    imgHolder: {
        height: 'auto',
        cursor: 'pointer',
        '& img': {
            width: '80px',
            height: '80px',
        },
    },
    placeHolder: {
        width: '78px',
        height: '78px',
        border: '1px solid #628BA0',
        backgroundColor: 'transparent',
    },
};

const NtfList = ({ metadatas, selectMeta }) => {
    return <Box sx={sx.root}>
        {[...Array(6)].map((e, index) => {
            if (metadatas[index]) {
                console.log(index)
                return (
                    <Box key={index} sx={sx.imgHolder} onClick={()=>selectMeta(metadatas[index])}>
                        <img src={metadatas[index].image} alt='meta' />
                    </Box>
                );
            } else {
                console.log(index)
                return <Box key={index} sx={sx.placeHolder}></Box>;
            }
        })}
    </Box>;
};

export default NtfList;
