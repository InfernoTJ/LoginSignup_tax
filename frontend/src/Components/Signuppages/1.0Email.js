import { Alert, Box, Checkbox, FormControl, FormControlLabel, TextField, Typography } from '@mui/material'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useSignup } from '../../Hooks/Usesignup'
import { Link } from 'react-router-dom'




const Email = forwardRef(({ formData, setFormData, setLoading }, ref) => {
  const [email, setEmail] = useState(formData.email)
  const [checkbox, setCheckbox] = useState(formData.checkbox)

  const [mailerror, setMailerror] = useState(false)
  const [checkboxerror, setCheckboxerror] = useState(false)
  const [allerror, setallerror] = useState(false)
  const { emailsignup, zaerror, error, isLoading } = useSignup()
  useImperativeHandle(ref, () => async () => {

    try {
      await emailsignup(email, checkbox);
      setFormData(prev => ({ ...prev, email }))
      setLoading(isLoading)
      return true
    } catch (error) {

      return false;
    }




  })
  setLoading(isLoading)
  useEffect(() => {

    if (error === 'Enter the Required Fields') {
      setallerror(true)
    } else {
      setallerror(false)

    }


    if (error === 'Enter an Email' || error === 'Not Valid Email' || error === 'Email already in use') {
      setMailerror(true);

    }
    else {
      setMailerror(false);
    }
    if (error === 'Check the checkbox') {
      setCheckboxerror(true);
    } else {
      setCheckboxerror(false)
    }
  }, [error]);

  return (
    <Box className='emailbox'>
      <Typography textAlign={'center'} sx={{ fontSize: '45px', fontWeight: '700' }} variant='h3'>Sign Up</Typography>
      <Typography sx={{ textAlign:'center', fontSize: '17px' }} variant='h6'>Sign Up your firm and start upgrading your workflow.</Typography>
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
      <FormControlLabel sx={{ marginTop: '12px' }} disabled={isLoading} value={checkbox} control={<Checkbox checked={checkbox} onChange={(e) => { setCheckbox(e.target.checked) }} sx={{ color: (checkboxerror || allerror) ? '#FF4E4E' : '' }} />} label={
        <span className='iageree'>
          I Agree to
          <Link to="/termsncond">
            Terms and Conditions
          </Link>
        </span>
      } />
      {(checkboxerror || allerror) && <Alert sx={{
        width: '96%',
        p: '0', // Adjust padding to control the size
        pl: '4%', height: '23px',
        borderRadius: '10px',
        bgcolor: '#FF4E4E ',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center', // Center content vertically
        '& .MuiAlert-icon': {
          fontSize: '16px', // Adjust the size of the icon
          mr: '8px', // Add margin to the right of the icon
        },
      }} variant="filled" severity="error" >
        Check the Agree to terms and conditons
      </Alert>}
   
    </Box>
  )
})
export default Email