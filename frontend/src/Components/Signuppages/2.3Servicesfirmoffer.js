import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
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

const ServicesFirmOffer=forwardRef(({ formData, setFormData }, ref)=> {
  const [selectedServices, setSelectedServices] = useState(formData.firmservices || []);
  const [selectAll, setSelectAll] = useState(false);
  const {firmservicessignup ,error,isLoading} =useSignup()
  
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

  useImperativeHandle(ref, () => async () => {
    // Add validation logic here
   
    // alert(selectedServices)
   // return false

   try {
     await firmservicessignup(selectedServices)
     setFormData((prev) => ({ ...prev, firmservices: selectedServices }));
     return true
   } catch (error) {
    return false
   }




  })
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Services your firm offers
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {services.map((service) => (
          <Button
            key={service}
            variant={selectedServices.includes(service) ? 'contained' : 'outlined'}
            onClick={() => handleSelectService(service)}
            sx={{ minWidth: '120px', textTransform: 'none' }}
          >
            {service}
          </Button>
        ))}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button variant="contained" sx={{ textTransform: 'none' }}>
          Next
        </Button>
        <FormControlLabel
          control={
            <Checkbox checked={selectAll} onChange={handleSelectAll} />
          }
          label="Select all"
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          Selected Services: {selectedServices.join(', ')}
        </Typography>
      </Box>
    </Box>
  )
})

export default ServicesFirmOffer 