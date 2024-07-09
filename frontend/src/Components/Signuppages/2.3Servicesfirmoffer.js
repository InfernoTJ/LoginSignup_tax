import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Alert, Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useSignup } from '../../Hooks/Usesignup'

const services = [
  'Tax preparation',
  'Tax planning',
  'Advisory',
  'Resolution',
  'Payroll',
  'Accounting',
  'Audit',
  'Law firm',
  'Bookkeeping',
  'Other',
];

const ServicesFirmOffer=forwardRef(({ formData, setFormData,setLoading }, ref)=> {
  const [selectedServices, setSelectedServices] = useState(formData.firmservices || []);
  const [selectAll, setSelectAll] = useState(false);
  const {firmservicessignup ,error,isLoading} =useSignup()
  
  
  const [firmserviceserror, setfirmserviceserror] = useState(false)


  const handleSelectService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    )
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedServices([]);
    } else {
      setSelectedServices(services);
    }
    setSelectAll(!selectAll);
  }
  setLoading(isLoading)
  useEffect(() => {
      
      
          if (error === 'Select at least one field') {
              setfirmserviceserror(true);
        } else {
          setfirmserviceserror(false)
      }
     
  }, [error]);
  useImperativeHandle(ref, () => async () => {
    // Add validation logic here
   
    // alert(selectedServices)
   // Select at least one field

   try {
     await firmservicessignup(selectedServices)
     setLoading(isLoading)
     setFormData((prev) => ({ ...prev, firmservices: selectedServices }));
     return true
   } catch (error) {
    return false
   }




  })
  return (
    <Box >
      <Typography variant="h3" sx={{fontSize:'50px' , fontWeight:'700'}} gutterBottom>
        Services your firm offers
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 ,mt:'3%'}}>
        {services.map((service) => (
          <Button
            key={service}
            variant={selectedServices.includes(service) ? 'contained' : 'outlined'}
            onClick={() => handleSelectService(service)}
            sx={{ width: 'auto',fontSize:'15px' , p:'15px 50px' , textTransform: 'none',borderColor:firmserviceserror?'red': '',  }}>
            {service}
          </Button>
        ))}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FormControlLabel
          control={
            <Checkbox  checked={selectAll} onChange={handleSelectAll} />
          }
          label="Select all"
        />
      </Box>
      {(firmserviceserror) && <Alert sx={{
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

export default ServicesFirmOffer 