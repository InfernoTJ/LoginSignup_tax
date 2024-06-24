import React, { forwardRef, useImperativeHandle, useState } from 'react';

import { Box, TextField } from '@mui/material';
import { useSignup } from '../../Hooks/Usesignup'


const FirmInfo = forwardRef(({ formData, setFormData }, ref)=> {
    const[firmname,setFirmname]=useState(formData.firmname)
    const[country,setcountry]=useState(formData.country)
    const[state,setstate]=useState(formData.state)
    const {firminfosignup , error,isLoading} =useSignup()
    
    useImperativeHandle(ref, () => async () => {
        // Add validation logic here
       
       try {
         await firminfosignup(firmname,country,state)
         setFormData(prev => ({ ...prev, firmname ,country ,state }));
         return true;
       } catch (error) {
        return false
       }
    
    
    
    
      })

    return (
        <Box>
            <h3>firm Information</h3>
            <TextField
                placeholder="firmname" //error={(emailError || allerror)}
                name='email'
                value={firmname}
                onChange={(e) => {
                    setFirmname(e.target.value);
                }}  
                //(emailError || allerror) ? '10px 10px 0 0' :
                sx={{
                    width: '100%', bgcolor: 'white',
                    borderRadius: '10px', '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        '& fieldset': {
                            borderRadius: '10px',
                        },
                    },
                }}
                id="outlined-required"
            />
            <TextField
                placeholder="country" // error={(emailError || allerror)}
                name='email'
                value={country}
                onChange={(e) => {
                    setcountry(e.target.value);
                }}
                sx={{
                    width: '100%', bgcolor: 'white',
                    borderRadius: '10px', '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        '& fieldset': {
                            borderRadius: '10px',
                        },
                    },
                }}
                id="outlined-required"
            /><TextField
                placeholder="state" //error={(emailError || allerror)}
                name='email'
                value={state}
                onChange={(e) => {
                    setstate(e.target.value);
                }} 
                // (emailError || allerror) ? '10px 10px 0 0' :
                sx={{
                    width: '100%', bgcolor: 'white',
                    borderRadius: '10px', '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        '& fieldset': {
                            borderRadius: '10px',
                        },
                    },
                }}
                id="outlined-required"
            />



        </Box>
    )
})



export default FirmInfo






