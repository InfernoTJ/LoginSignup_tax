import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Container, TextField, Typography, InputAdornment, IconButton, Box, Button, FormHelperText } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSignup } from '../../Hooks/Usesignup'



const SetPassword=forwardRef(({ formData, setFormData }, ref)=> {
  const {passwordsignup,error,isLoading} =useSignup()
  const [password, setPassword] = useState(parseInt(formData.password) || '');
  const [confirmPassword, setConfirmPassword] = useState(parseInt(formData.confirmPassword) || '');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Passwords match');
    // Add your form submission logic here
  };

  const isPasswordValid = (password) => {
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasMinLength = password.length >= 8;
    return { hasNumber, hasLetter, hasMinLength };
  };

  const passwordValidation = isPasswordValid(password);
  useImperativeHandle(ref, () => async () => {
    // Add validation logic here
    
   try {
     await passwordsignup(password)
     setFormData(prev => ({ ...prev, password ,confirmPassword }));
     return true;
   } catch (error) {
    return
   }




  })
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Set password
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
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
          margin="normal"
        />
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <FormHelperText error={!passwordValidation.hasNumber}>
            <CheckCircleIcon color={passwordValidation.hasNumber ? 'success' : 'error'} fontSize="small" /> a number
          </FormHelperText>
          <FormHelperText error={!passwordValidation.hasLetter}>
            <CheckCircleIcon color={passwordValidation.hasLetter ? 'success' : 'error'} fontSize="small" /> a letter
          </FormHelperText>
          <FormHelperText error={!passwordValidation.hasMinLength}>
            <CheckCircleIcon color={passwordValidation.hasMinLength ? 'success' : 'error'} fontSize="small" /> at least 8 characters
          </FormHelperText>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
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
          margin="normal"
          error={password !== confirmPassword && confirmPassword.length > 0}
          helperText={password !== confirmPassword && confirmPassword.length > 0 ? 'Passwords do not match' : ''}
        />

        
      </form>
      </>
  )
})

export default SetPassword