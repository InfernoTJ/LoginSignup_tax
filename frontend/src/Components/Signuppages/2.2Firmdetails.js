import { Box, Button, Input, Slider, Typography } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ToggleButton from '@mui/lab/ToggleButton';
import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup';
import { useSignup } from '../../Hooks/Usesignup'
const sources = [
  'Google search',
  'Capterra/Getapp/G2',
  'From a friend',
  'Offline event',
  'Social media',
  'TaxDome Consultant/Partner',
  'Other',
];

const FirmDetails =forwardRef(({ formData, setFormData }, ref)=> {
  const [value, setValue] = useState(formData.value);
  const {firmdetailsignup,error,isLoading} =useSignup()
  
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  }



  const [selectedSource, setSelectedSource] = useState(formData.selectedSource);

  const handleSelectSource = (source) => {
    setSelectedSource(source);
  }
  useImperativeHandle(ref, () => async () => {
    // Add validation logic here
   
    try {
      await firmdetailsignup(value,selectedSource)
      setFormData(prev => ({ ...prev, value,selectedSource }));
      return true;
    } catch (error) {
      return false
    }




  })
  

  return (<>
    <Typography gutterBottom>Firm size</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Input
          value={value} readOnly
          size="small"
          
          disableUnderline
          sx={{
            width: 36,
            textAlign: 'center',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginRight: '10px',
          }}
        />
        <Slider
          value={value}
          onChange={handleSliderChange}
          step={1}
          min={0}
          max={200}
          marks={[
            { value: 0, label: '0' },
            { value: 5, label: '5' },
            { value: 10, label: '10' },
            { value: 15, label: '15' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
            { value: 200, label: '200+' },
          ]}
          sx={{ width: '100%' }}
        />

</Box>


<Typography variant="h6" gutterBottom>
        How did you hear about TaxDome?
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {sources.map((source) => (
          <Button
            key={source}
            variant={selectedSource === source ? 'contained' : 'outlined'}
            onClick={() => handleSelectSource(source)}
            sx={{ minWidth: '200px', textTransform: 'none' }}
          >
            {source}
          </Button>
        ))}
      </Box>
      {selectedSource && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Selected Source: {selectedSource}
          </Typography>
        </Box>
      )}
     
      
      
      </>)

    })
export default FirmDetails  