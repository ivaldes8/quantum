import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column",
      alignItems: "center", position: 'absolute', width: '100%'}}>
        <CircularProgress  style={{alignSelf: 'center', marginTop: '30%'}} size={150}/>
      </Box>
  )
}

export default Loading