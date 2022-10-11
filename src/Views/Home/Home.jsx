import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useWeb3Ctx from '../../hooks/useWeb3Ctx'

const sx = {
  title: {
    mb: '20px'
  },
  subTitle: {
    marginBottom: '100px'
  }
}
const Home = () => {
  const { onboard, handleConnect, address, ethersProvider } = useWeb3Ctx();
  const navigate = useNavigate();

  const handleConnection = () => {
    handleConnect();
   
  }

  useEffect(() => {
    if (address !== undefined && address !== null)
    navigate('/mint');

  }, [address])
  
  console.log(address)
  return (
    <Box className='center-div'>
      <Typography variant='pageTitle' sx={sx.title}>Braves Free Mint</Typography>
      <Typography variant='pageTitleDescription' sx={sx.subTitle}>BEGIN YOUR JOURNEY INTO BETWIXT</Typography>
      <Button variant='grayButton' onClick={handleConnection}>Connect Wallet</Button>
    </Box>
  )
}

export default Home 