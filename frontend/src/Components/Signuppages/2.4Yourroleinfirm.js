import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSignup } from '../../Hooks/Usesignup'
const roles = [
  'Owner or Partner',
  'Bookkeeper or Accountant',
  'Operations / Office Manager',
  'Admin',
  'Assistant',
  'Other',
];

const YourRoleInFirm =forwardRef(({ formData, setFormData }, ref)=> {
  const [selectedRole, setSelectedRole] = useState(formData.selectedRole);
  
  const {urrolesignup,error,isLoading} =useSignup()
  const handleSelectRole = (role) => {
    setSelectedRole(role);
  }

  useImperativeHandle(ref, () => async () => {
    // Add validation logic here
  
    try {
      await urrolesignup(selectedRole)
      setFormData(prev => ({ ...prev, selectedRole }));
      return true;
    } catch (error) {
      return false
    }




  })

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Your role in the firm
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {roles.map((role) => (
          <Button
            key={role}
            variant={selectedRole === role ? 'contained' : 'outlined'}
            onClick={() => handleSelectRole(role)}
            sx={{ minWidth: '200px', textTransform: 'none' }}
          >
            {role}
          </Button>
        ))}
      </Box>
   
      {selectedRole && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Selected Role: {selectedRole}
          </Typography>
        </Box>
      )}
    </Box>
  )
})

export default YourRoleInFirm  