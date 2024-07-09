import { Alert, Box, Checkbox, FormControl, FormControlLabel, TextField, Typography } from '@mui/material'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import { Link } from 'react-router-dom'
import { useLogin } from '../../Hooks/Uselogin'




const Email = forwardRef(({ formData, setFormData, setLoading }, ref) => {
  const [email, setEmail] = useState(formData.email)
  const [checkbox, setCheckbox] = useState(formData.checkbox)

  const [mailerror, setMailerror] = useState(false)
  const [checkboxerror, setCheckboxerror] = useState(false)
  const [allerror, setallerror] = useState(false)
  const { emailresetvr, error, isLoading } = useLogin()
  useImperativeHandle(ref, () => async () => {

    try {
      await emailresetvr(email);
      setFormData(prev => ({ ...prev, email }))
      setLoading(isLoading)
      return true
    } catch (error) {

      return false;
    }




  })
  setLoading(isLoading)
  useEffect(() => {


    if (error === 'Account not found') {
      setMailerror(true);

    }
    else {
      setMailerror(false);
    }
  }, [error]);


  return (
    <Box sx={{ mt: '30%', width: '96%' }}>
      <Typography textAlign={'center'} sx={{ fontSize: '45px', fontWeight: '700' }} variant='h3'>Reset Your Password</Typography>
      <Typography sx={{ ml: '16%', fontSize: '17px' }} variant='h6'>To reset your password, Enter the email that you use to login.</Typography>
      <TextField
        disabled={isLoading}
        label="Email"
        error={(mailerror || allerror)}
        sx={{
          bgcolor: 'white', m: 0, mt: '40px', height: '60px',
          borderRadius: (mailerror || allerror) ? '10px 10px 0 0' : '10px', '& .MuiOutlinedInput-root': {
            borderRadius: (mailerror || allerror) ? '10px 10px 0 0' : '10px', height: '60px',
            '& fieldset': {
              borderRadius: (mailerror || allerror) ? '10px 10px 0 0' : '10px',
            },
          },
        }}
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />

      {(mailerror || allerror) && <Alert sx={{
        width: '96%',
        p: '0', // Adjust padding to control the size
        pl: '4%', height: '23px',
        borderRadius: '10px', bgcolor: '#FF4E4E ',
        borderTopLeftRadius: '0',
        borderTopRightRadius: '0',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center', // Center content vertically
        '& .MuiAlert-icon': {
          fontSize: '16px', // Adjust the size of the icon
          mr: '8px', // Add margin to the right of the icon
        },
      }} variant="filled" severity="error" >
        {error}
      </Alert>}
    </Box>
  )
})
export default Email