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
        whiteDescription: {
            textAlign: 'center',
            color: COLORS.primaryColor,
            font: 'normal normal normal 16px/28px poppins'
        },
        footerText: {
            textAlign: 'center',
            color: COLORS.primaryColor,
            font: 'normal normal normal 14px/28px Poppins'
        },
        blackTitle: {
            textAlign: 'center',
            color: COLORS.primaryColor,
            font: 'normal normal 600 36px/55px poppins',
        },
        blackDescription: {
            textAlign: 'center',
            color: COLORS.primaryColor,
            font: "normal normal normal 16px/28px poppins",
        },
        cardTitle: {
            textAlign: 'center',
            color: COLORS.primaryColor,
            font: "normal normal 600 16px/25px poppins",
        },
        pageDescription: {
            textAlign: 'center',
            color: COLORS.primaryColor,
            font: "normal normal normal 16px/25px bau",
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                grayButton: {
                    color: COLORS.primaryColor,
                    padding: '18px 32px',
                    fontFamily: 'Jotia-Regular',
                    fontSize: '22px',
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
