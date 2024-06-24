import { Box, TextField } from '@mui/material'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useSignup } from '../../Hooks/Usesignup'




const Email = forwardRef(({ formData, setFormData }, ref) => {
  const [email, setEmail] = useState(formData.email)
  const { emailsignup, zaerror, error, isLoading } = useSignup()


  useImperativeHandle(ref, () => async () => {

    try {
      await emailsignup(email);
      setFormData(prev => ({ ...prev, email }));
      return true
    } catch (error) {
     
      return false;
    }




  })


  return (
    <Box>

      <TextField
        label="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
    </Box>
  )
})
export default Email