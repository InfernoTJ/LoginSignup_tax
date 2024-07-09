import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Alert, Box, Button, Typography } from '@mui/material';
import { useSignup } from '../../Hooks/Usesignup'
const roles = [
  'Owner or Partner',
  'Bookkeeper or Accountant',
  'Operations / Office Manager',
  'Admin',
  'Assistant',
  'Other',
];

const YourRoleInFirm =forwardRef(({ formData, setFormData,setLoading }, ref)=> {
  const [selectedRole, setSelectedRole] = useState(formData.selectedRole);
  
  
  const [roleinfirmerror, setroleinfirmerror] = useState(false)

  const {urrolesignup,error,isLoading} =useSignup()
  const handleSelectRole = (role) => {
    setSelectedRole(role);
  }

  setLoading(isLoading)
  useEffect(() => {
      
      
          if (error === 'Select One Fields') {
              setroleinfirmerror(true);
        } else {
          setroleinfirmerror(false)
      }
     
  }, [error]);
  useImperativeHandle(ref, () => async () => {
    // Add validation logic here
  
    try {
      await urrolesignup(selectedRole)
      setLoading(isLoading)
      setFormData(prev => ({ ...prev, selectedRole }));
      return true;
    } catch (error) {
      return false
    }




  })

  return (
    <Box >
      <Typography variant="h3" sx={{fontSize:'50px' , fontWeight:'700'}} gutterBottom>
        Your role in the firm
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {roles.map((role) => (
          <Button
            key={role}
            variant={selectedRole === role ? 'contained' : 'outlined'}
            onClick={() => handleSelectRole(role)}
            sx={{ width: 'auto',fontSize:'15px' , p:'15px 50px' , textTransform: 'none', borderColor:roleinfirmerror?'red': '', }}
          >
            {role}
          </Button>
        ))}
      </Box>
      {(roleinfirmerror) && <Alert sx={{
        width: '96%', mt:'20px',
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
        {error}
      </Alert>}
      
    </Box>
  )
})

export default YourRoleInFirm  