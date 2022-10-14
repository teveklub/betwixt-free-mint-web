import { Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'

const BP1 = '@media (max-width: 600px)';

const MIN = 60000;
const HOUR = MIN * 60;
const DAY = HOUR * 24;

const INIT = { d: 0, h: 0, m: 0, s: 0 };

const sx = {
    counterBoxHolder: {
        display: 'flex',
        justifyContent: 'center',
        gap: '35px',
        mt: '20px',
        mb: '40px'
    },
    counterBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: '7px',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    counter: {
        p: ' 13px',
        width: '37px',
        height: '37px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#594569',
        [BP1]:{
            p: ' 10px',
            width: '25px',
            height: '25px',
        }
    }
}

const Counter = ({ date, handleCountingOver, simple }) => {
    const [values, setValues] = useState(INIT)

    useEffect(() => {

        const interval = setInterval(() => {
            if (date != null) {
                let dif = date.getTime() - new Date().getTime();
                if (dif > 0) {
                    setValues({
                        d: Math.floor(dif / DAY),
                        h: Math.floor((dif % DAY) / HOUR),
                        m: Math.floor((dif % HOUR) / MIN),
                    });
                } else {
                    setValues(INIT);
                    clearInterval(interval);
                    handleCountingOver();
                    // if (onFinish) {
                    //     onFinish()
                    // }
                }
            } else {
                setValues(INIT);
                clearInterval(interval);
            }
        }, 500);
        return () => {
            clearInterval(interval);
        };
    }, [date]);

    return (
        <>
        {simple ? (
          <>
              {values.d} days, {values.h} hours, {values.m} mins
          </>
        ) : (
          <Box sx={sx.counterBoxHolder}>
            <CounterCircle name="DAYS" value={values.d} />
            <CounterCircle name="HOURS" value={values.h} />
            <CounterCircle name="MINS" value={values.m} />
          </Box>
        )}
      </>
    );
};


const CounterCircle = ({ name, value, type }) => (
    <Box sx={sx.counterBox}>
        <Typography variant='pageTitleDescription'>
            {name}
        </Typography>
        <Box sx={sx.counter}>
            <Typography variant='counterNumber'>{value}</Typography>
        </Box>
    </Box>
);

export default Counter