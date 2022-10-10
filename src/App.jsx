import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import routes from './routes/routes';
import theme from './theme/theme';
import Web3Manager from './Web3Manager.jsx/Web3Manager';
import { ToastContainer } from 'react-toast';
import Footer from './components/Footer';
const sx = {
  root: {
    minHeight: '100vh',
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Web3Manager>
      <BrowserRouter basename='/'>
        <Box sx={sx.root} color={theme.palette.background}>
            <Routes>
              {routes.map(({ path, component, exact }) => (
                <Route key={path} path={path} element={component} exact={exact} />
              ))}
            </Routes>
            <ToastContainer position='bottom-right' delay={4000} />
            <Footer />
        </Box>
      </BrowserRouter>
    </Web3Manager>
  </ThemeProvider>
  );
}

export default App;
