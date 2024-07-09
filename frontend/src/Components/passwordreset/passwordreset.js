import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Container, TextField, Typography, InputAdornment, IconButton, Box, Button, FormHelperText, Alert } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSignup } from '../../Hooks/Usesignup'
import { useLogin } from '../../Hooks/Uselogin';



const SetPassword=forwardRef(({ formData, setFormData ,setLoading}, ref)=> {
  const {passwordresetvr,error,isLoading} =useLogin()
  const [password, setPassword] = useState(parseInt(formData.password) || '');
  const [confirmPassword, setConfirmPassword] = useState(parseInt(formData.confirmPassword) || '');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passworderror, setpassworderror] = useState(false)
  const [confirmpassworderror, setconfirmpassworderror] = useState(false)
const[allerror,setallerror]=useState(false)

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };



  const isPasswordValid = (password) => {
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>_-]/.test(password);
    const hasMinLength = password.length >= 8;
    return { hasNumber, hasUppercase ,hasLowercase ,hasSymbol, hasMinLength };
  };

  const passwordValidation = isPasswordValid(password);


  
  setLoading(isLoading)
  useEffect(() => {

    if(error==='Enter Both Passwords')
      {
        setallerror(true)
    }else{
        setallerror(false)
      
      }

  
    if (error === 'Enter A Password' || error==='Create a Strong Password') {
  
      setpassworderror(true);

    }
    else {
      setpassworderror(false);
    }
    if (error === 'Enter Confirm Password' || error==='Wrong Confirm Password') {
      setconfirmpassworderror(true);
    } else {
      setconfirmpassworderror(false)
    }
  }, [error])
  useImperativeHandle(ref, () => async () => {
    // Add validation logic here
    
   try {
     await passwordresetvr(password,confirmPassword)
     setLoading(isLoading)
     setFormData(prev => ({ ...prev, password ,confirmPassword }));
     return true;
   } catch (error) {
    return
   }




  })
  return (
    <Box sx={{mb:3}}>
      <Typography variant="h3" sx={{ fontSize: '50px', fontWeight: '700' }} gutterBottom>
        Reset password
      </Typography>

  
        
        <TextField
          fullWidth
          sx={{bgcolor: 'white', mt:3,
            borderRadius: (allerror||passworderror) ? '10px 10px 0 0' : '10px', '& .MuiOutlinedInput-root': {
                borderRadius: (allerror||passworderror) ? '10px 10px 0 0' : '10px',height:'60px',
                '& fieldset': {
                  borderRadius: (allerror||passworderror) ? '10px 10px 0 0' : '10px',
                },
              },}}
          error={(allerror||passworderror)}
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
         
        />
        {(allerror||passworderror) && <Alert sx={{
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} px={2}>
          <FormHelperText sx={{display:'flex'}}  error={!passwordValidation.hasNumber} >
            <CheckCircleIcon color={passwordValidation.hasNumber ? 'success' : 'error'} fontSize="small" /> <p style={{marginTop:'1px' ,marginLeft:'3px'}}>a number</p>
          </FormHelperText>
          <FormHelperText sx={{display:'flex'}} error={!passwordValidation.hasUppercase} >
            <CheckCircleIcon color={passwordValidation.hasUppercase ? 'success' : 'error'} fontSize="small" /> <p style={{marginTop:'1px' ,marginLeft:'3px'}}>a lowercase letter</p>
          </FormHelperText>
          <FormHelperText sx={{display:'flex'}} error={!passwordValidation.hasLowercase}>
            <CheckCircleIcon color={passwordValidation.hasLowercase ? 'success' : 'error'} fontSize="small" /><p style={{marginTop:'1px' ,marginLeft:'3px'}}>a number</p> 
          </FormHelperText>
          <FormHelperText sx={{display:'flex'}} error={!passwordValidation.hasSymbol}>
            <CheckCircleIcon color={passwordValidation.hasSymbol ? 'success' : 'error'} fontSize="small" /><p style={{marginTop:'1px' ,marginLeft:'3px'}}>a symbol</p> 
          </FormHelperText>
          <FormHelperText sx={{display:'flex'}} error={!passwordValidation.hasMinLength}>
            <CheckCircleIcon color={passwordValidation.hasMinLength ? 'success' : 'error'} fontSize="small" /><p style={{marginTop:'1px' ,marginLeft:'3px'}}>at least 8 characters</p> 
          </FormHelperText>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          sx={{bgcolor: 'white', mt:2,
            borderRadius: (allerror||confirmpassworderror) ? '10px 10px 0 0' : '10px', '& .MuiOutlinedInput-root': {
                borderRadius: (allerror||confirmpassworderror) ? '10px 10px 0 0' : '10px',height:'60px',
                '& fieldset': {
                  borderRadius: (allerror||confirmpassworderror) ? '10px 10px 0 0' : '10px',
                },
              },}}
          type={showConfirmPassword ? 'text' : 'password'}
          label="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
   
          error={(allerror||confirmpassworderror)}
         
        />
        {(allerror||confirmpassworderror) && <Alert sx={{
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

export default SetPassword