import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Container, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Box, Button } from '@mui/material';
import { useSignup } from '../../Hooks/Usesignup'





const FirmSettings =forwardRef(({ formData, setFormData }, ref)=> {
  const {firmsettingsignup,error,isLoading} =useSignup()
  const [url, setUrl] = useState(formData.url);
  const [currency, setCurrency] = useState(formData.currency);
  const [language, setLanguage] = useState(formData.language);
  const [eror, setError] = useState('');
  
  const handleUrlChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.includes('.taxdome.com')) {
      setError('Do not include ".taxdome.com" in the URL.');
    } else {
      setError('');
      setUrl(inputValue);
    }
  };
  
  

  
  
  useImperativeHandle(ref, () => async () => {
    // Add validation logic here
    try {
      const fdata = {
        url: `${url}.taxdome.com`,
        currency,
      };
      await firmsettingsignup(fdata.url,fdata.currency)
   
      setFormData(prev => ({ ...prev, url , currency , language }));
      return true;
    } catch (error) {
      return false
    }
    
    
    
    
  })
  
  return ( <>
   <Typography variant="h4" gutterBottom>
        Firm Settings
      </Typography>
      <Typography variant="h6" gutterBottom>
        TaxDome <span style={{ color: 'blue' }}>Pro</span>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        A powerful, integrated platform to manage teams, clients, projects.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        From £40/mo per user
      </Typography>

      <Box my={4}>
        <Typography variant="h6">Firm Settings</Typography>
        
        <Typography variant="body1" gutterBottom>
          Choose web URL
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          You will be able to set up a fully custom domain (without .taxdome.com) later
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="microtechsolutions"
          value={url}
          onChange={handleUrlChange}
          InputProps={{
            endAdornment: <Typography variant="body2">.taxdome.com</Typography>,
          }}
          margin="normal"
          error={!!eror}
          helperText={eror}
          />

        <FormControl fullWidth margin="normal">
          <InputLabel>Default currency</InputLabel>
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </Select>
          <Typography variant="caption" display="block">
            You cannot change it later
          </Typography>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Default language</InputLabel>
          <Select >
            <MenuItem value="English (British)">English (British)</MenuItem>
            <MenuItem value="English (US)">English (US)</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
            <MenuItem value="French">French</MenuItem>
          </Select>
        </FormControl>

        
      </Box>
    </>
)
})

export default FirmSettings  