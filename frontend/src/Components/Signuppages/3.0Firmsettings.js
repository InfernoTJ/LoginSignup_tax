import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Container, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Box, Button, Alert } from '@mui/material';
import { useSignup } from '../../Hooks/Usesignup'

import firmsetimg from '../../Images/firmsetting.png'
import { toast } from 'react-toastify';



const FirmSettings = forwardRef(({ formData, setFormData,setLoading }, ref) => {
  const { firmsettingsignup, error, isLoading } = useSignup()
  const [wurl, setUrl] = useState(formData.wurl);
  const [currency, setCurrency] = useState(formData.currency);
  const [language, setLanguage] = useState(formData.language);


  const [weburlerror, setweburlerror] = useState(false)
  const [currencyerror, setcurrencyerror] = useState(false)
const[allerror,setallerror]=useState(false)
const[inctaxcom,setinctaxcom]=useState('')
  const handleUrlChange = (event) => {
    const inputValue = event.target.value;
    setUrl(inputValue)
    if (inputValue.includes('.taxdome.com')) {
      setweburlerror(true)
      setinctaxcom('Do not include ".taxdome.com" in the URL.')
      toast.error('Do not include ".taxdome.com" in the URL.')
      return false
    } else {
      setweburlerror(false);
    }
  }



  setLoading(isLoading)
  useEffect(() => {

    if(error==='Enter All Fields')
      {
        setinctaxcom(error)
        setallerror(true)
    }else{
        setallerror(false)
      
      }

  
    if (error === 'Enter Web url' || error==='WebUrl Already exists choose a different one') {
      setinctaxcom(error)
      setweburlerror(true);

    }
    else {
      setweburlerror(false);
    }
    if (error === 'Select Currency') {
      setcurrencyerror(true);
    } else {
      setcurrencyerror(false)
    }
  }, [error]);
  
  useImperativeHandle(ref, () => async () => {
    // Add validation logic here
    try {
      const fdata = {
        url: `${wurl}.taxdome.com`,
        currency,
      }
      if(weburlerror)
        {
          return false
        }
      await firmsettingsignup(fdata.url, fdata.currency,wurl)
      setLoading(isLoading)
      setFormData(prev => ({ ...prev, wurl, currency, language }));
      return true;
    } catch (error) {
      return false
    }




  })

  return (<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Box >
      <Typography variant="h3" sx={{ fontSize: '50px', fontWeight: '700' }} gutterBottom>
        Firm Settings
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '26px' }} gutterBottom>
        TaxDome <span style={{ color: 'blue' }}>Pro</span>
      </Typography>
      <Typography sx={{
        float: 'left',
        width: '330px'
      }} variant="subtitle1" gutterBottom>
        A powerful, integrated platform to manage teams, clients, projects.
      </Typography>
      <Typography sx={{ float: 'left', ml: '50px', fontWeight: '600', color: '#474747' }} variant="subtitle1" gutterBottom>
        From £40/mo per user
      </Typography>
      <br /><br />
      <Box sx={{ mt: 3 }}>
        <Typography sx={{ fontWeight: '600' }} variant="h6">Firm Settings</Typography>

        <InputLabel sx={{ mt: 1 }} >Choose web URL</InputLabel>
        <Typography variant="caption" display="block" gutterBottom>
          You will be able to set up a fully custom domain (without .taxdome.com) later
        </Typography>

        {/* weeeebbburrllllll */}
        <TextField
          fullWidth
          error={allerror||weburlerror}
          variant="outlined"
          placeholder="Weburl"
          value={wurl}
          sx={{ width: '100%', bgcolor: 'white',
            borderRadius: (allerror||weburlerror) ? '10px 10px 0 0' : '10px', '& .MuiOutlinedInput-root': {
                borderRadius: (allerror||weburlerror) ? '10px 10px 0 0' : '10px',height:'60px',
                '& fieldset': {
                  borderRadius: (allerror||weburlerror) ? '10px 10px 0 0' : '10px',
                },
              },}}
          onChange={handleUrlChange}
          InputProps={{
            endAdornment: <Typography variant="body2">.taxdome.com</Typography>,
          }}
          
          
        />
{(allerror||weburlerror) && <Alert sx={{
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
                        {inctaxcom}
                    </Alert>}



        <Box sx={{display:'flex' , justifyContent:'space-between',mt:3}}>
        <FormControl  sx={{ width:'30%',m:'0'}} fullWidth>
          <InputLabel sx={{bgcolor:'white'}}>Default currency</InputLabel>
          <Select sx={{height:'56px', borderRadius:(allerror||currencyerror)? '10px 10px 0 0 ': '10px',
            border:(allerror||currencyerror)?'1.5px solid red':''
            ,}} value={currency} onChange={(e) => setCurrency(e.target.value)}  >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </Select>{(allerror||currencyerror) && <Alert sx={{
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
          <Typography variant="caption" display="block">
            You cannot change it later
          </Typography>
        </FormControl>

        <FormControl sx={{width:'65%',m:'0' }} fullWidth >
          <InputLabel sx={{bgcolor:'white'}}>Default language(English)</InputLabel>
          <Select sx={{height:'56px' , borderRadius:'10px' }} >
            <MenuItem value="English (British)">English (British)</MenuItem>
            <MenuItem value="English (US)">English (US)</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
            <MenuItem value="French">French</MenuItem>
          </Select>
        </FormControl>
        </Box>

      </Box></Box>
    <img style={{marginRight:'80px'}} src={firmsetimg} alt='logoss' />

  </Box>
  )
})

export default FirmSettings  