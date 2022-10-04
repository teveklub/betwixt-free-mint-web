import { createTheme } from '@mui/material';

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
            fontFamily: 'Schnyder M App',
            fontWeight: 300,
            fontSize: '64px',
            lineHeight: '77px',
        },
        pageTitleDescription: {
            textAlign: 'center',
            color: COLORS.primaryColor,
            fontFamily: 'Jotia-Regular',
            fontSize: '14px',
            lineHeight: '17px',
            textTransform: 'uppercase'
        },
        counterNumber: {
            textAlign: 'center',
            color: COLORS.primaryColor,
            fontFamily: 'Jotia-Regular',
            fontSize: '32px',
            textTransform: 'uppercase'
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                grayButton: {
                    color: COLORS.primaryColor,
                    padding: '18px',
                    fontFamily: 'Jotia-Regular',
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
