import { createTheme } from '@mui/material';
const BP1 = '@media (max-width: 600px)';

const COLORS = {
    primaryColor: '#FFFFFF',
    background: '#151019',
    gray: '#363F59',
};

const theme = createTheme({
    typography: {
        pageTitle: {
            textAlign: 'center',
            color: COLORS.primaryColor,
            fontFamily: 'Schnyder',
            fontWeight: 300,
            fontSize: '64px',
            lineHeight: '77px',
            [BP1]: {
                fontSize: '42px',
                lineHeight: '53px',
            }
        },
        pageTitleDescription: {
            textAlign: 'center',
            color: COLORS.primaryColor,
            fontFamily: 'Jotia',
            fontSize: '14px',
            lineHeight: '17px',
            textTransform: 'uppercase',
            [BP1]: {
                fontSize: '12px',
                lineHeight: '14px',
            }
        },
        counterNumber: {
            textAlign: 'center',
            color: COLORS.primaryColor,
            fontFamily: 'Jotia',
            fontSize: '32px',
            textTransform: 'uppercase',
            [BP1]: {
                fontSize: '24px',
            }
        },
        boxText: {
            textAlign: 'center',
            color: COLORS.primaryColor,
            fontFamily: 'Jotia',
            fontSize: '24px',
            textTransform: 'uppercase',
            [BP1]: {
                fontSize: '18px',
            } 
        },
        share: {
            textAlign: 'center',
            color: COLORS.primaryColor,
            fontFamily: 'Jotia',
            fontSize: '16px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            [BP1]: {
                fontSize: '14px',
            } 
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                grayButton: {
                    color: COLORS.primaryColor,
                    padding: '18px',
                    fontFamily: 'Jotia',
                    fontSize: '22px',
                    lineHeight: '29px',
                    textTransform: 'uppercase',
                    backgroundColor: COLORS.gray,
                    borderRadius: '4px',
                    maxWidth: '292px',
                    width: '100%',
                    margin: '0 auto',
                    '&:hover': {
                        backgroundColor: COLORS.gray,
                    },
                    [BP1]: {
                        fontSize: '15px',
                        lineHeight: '22px',
                        maxWidth: '220px',
                        padding: '13px',
                    }
                },
                orangeFilledButton: {

                    padding: '10px 10px',
                    fontFamily: 'poppins-semibold',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    backgroundColor: '#FF692B',
                    border: '2px solid #FF682B',
                    borderRadius: '4px',
                    maxWidth: '215px',
                    width: '100%',
                    margin: '0 auto',
                    '&:hover': {
                        backgroundColor: '#ff692bcc'
                    }
                }
            }
        },
    },
    palette: {
        primary: {
            main: COLORS.primaryColor,
        },
        background: {
            background: COLORS.background,
            error: {
                main: '#EE1B11',
            },
        }
    },
});

export default theme;
