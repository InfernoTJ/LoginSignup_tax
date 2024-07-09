import React, { forwardRef, useImperativeHandle, useState, useMemo, useEffect } from 'react';

import { Alert, Box, InputLabel, TextField, Typography } from '@mui/material';
import { useSignup } from '../../Hooks/Usesignup'
import Select from 'react-select';
import { Country, State } from 'country-state-city';


const FirmInfo = forwardRef(({ formData, setFormData ,setLoading}, ref) => {
    const [firmname, setFirmname] = useState(formData.firmname)
    const [selectedCountry, setSelectedCountry] = useState(formData.selectedCountry);
    const [selectedState, setSelectedState] = useState(formData.selectedState);
    
    const [country, setcountry] = useState(formData.country);
    const [state, setstate] = useState(formData.state);

    const [firmnameerr, setfirmnameerr] = useState(false)
    const [countryerror, setcountryerror] = useState(false)
    const [stateerror, setstateerror] = useState(false)
    const[allerror , setallerror]=useState(false)


    const { firminfosignup, error, isLoading } = useSignup()
    const countryOptions = useMemo(
        () => Country.getAllCountries().map((country) => ({
            value: country.isoCode,
            label: country.name,
        })),
        []
    );

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
        setcountry(country.label)
        setSelectedState(null); 
    };

    const stateOptions = useMemo(() => {
        if (!selectedCountry) return [];
        return State.getStatesOfCountry(selectedCountry.value).map((state) => ({
            value: state.isoCode,
            label: state.name,
        }));
    }, [selectedCountry]);

    const handleStateChange = (state) => {
        setSelectedState(state);
        setstate(state.label)
    };


setLoading(isLoading)
useEffect(() => {
    
    if(error==='Fill All the Fields')
        {
            setallerror(true)
        }else{
            setallerror(false)
            
        }
        
        
        if (error === 'Enter Firm Name'||error === 'Firm Already Exists') {
            setfirmnameerr(true);
            
        }
        else {
            setfirmnameerr(false);
        }
        if (error === 'Select Country') {
            setcountryerror(true);
      } else {
        setcountryerror(false)
    }
    if (error === 'Select State') {
        setstateerror(true);
    } else {
        setstateerror(false)
    }
}, [error]);

useImperativeHandle(ref, () => async () => {
    // Add validation logic here

    try {
        await firminfosignup(firmname, country, state)
       
        setLoading(isLoading)
        setFormData(prev => ({ ...prev, firmname, selectedCountry, selectedState,country,state }));
        return true;
    } catch (error) {
        return false
    }
})

const countrystyles = {
        control: (provided) => ({
            ...provided,
            height:'56px',width:'50%',
            borderRadius:(allerror||countryerror)? '10px 10px 0 0 ': '10px',
            border:(allerror||countryerror)?'1.5px solid red':'1px solid grey'
            ,
            '&:hover': {
                borderColor:(allerror||countryerror)?'': 'blue',
            },
        }),
        menu: (provided) => ({
            ...provided,  
            
          borderRadius: '10px',
        }),
      };
      const statestyles = {
        control: (provided) => ({
            ...provided,
            height:'56px',width:'50%',
              borderRadius:(allerror||stateerror)? '10px 10px 0 0 ': '10px',
            border:(allerror||stateerror)?'1.5px solid red':'1px solid grey'
            ,
            '&:hover': {
                borderColor:(allerror||stateerror)?'': 'blue',
            },
        }),
        menu: (provided) => ({
            ...provided,  
            margin:'0',
          
            
          borderRadius: '10px',
        }),
      };

    return (
        <Box>
            <Typography sx={{ fontSize: '55px', fontWeight: '700' }} variant='h3'>Firm Information</Typography>
            <InputLabel sx={{mt:'3%'}} htmlFor="firimname">Firm name</InputLabel>
            <TextField
            id='firimname'
                placeholder="firmname" error={(firmnameerr || allerror)}
                name='email'
                value={firmname}
                onChange={(e) => {
                    setFirmname(e.target.value);
                }}

                sx={{
                    width: '50%', bgcolor: 'white',border:(firmnameerr || allerror)?'1.3px solid red':'1px solid grey',
                    borderRadius: (allerror||firmnameerr) ? '10px 10px 0 0' : '10px', '& .MuiOutlinedInput-root': {
                        borderRadius: (allerror||firmnameerr) ? '10px 10px 0 0' : '10px',height:'60px',
                        '& fieldset': {
                          borderRadius: (allerror||firmnameerr) ? '10px 10px 0 0' : '10px',
                        },
                      },
                }}

            />
            {(allerror||firmnameerr) && <Alert sx={{
                width: '46.15%',
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

            <InputLabel sx={{mt:'2%'}} htmlFor="country">Country</InputLabel>
            <InputLabel sx={{fontSize:'14px'}} htmlFor="country">Please make sure the country you've chosen is correct. You cannot change it later.</InputLabel>
            <Select id='country'
            error={(allerror||countryerror)}
            className='locations country'
            styles={countrystyles}
                options={countryOptions}
                value={selectedCountry}
                onChange={handleCountryChange}
                placeholder="Select a country"
            />
             {(allerror||countryerror) && <Alert sx={{
                width: '46%',
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
             <InputLabel sx={{mt:'2%'}} htmlFor="state">State</InputLabel>
            <Select id='state'
            error={((allerror||stateerror))}
            className='locations state'
            styles={statestyles}
                options={stateOptions}
                value={selectedState}
                onChange={handleStateChange}
                placeholder="Select a state"
                isDisabled={!selectedCountry}
            />
             {(allerror||stateerror) && <Alert sx={{
                width: '46%',
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


        </Box>
    )
})



export default FirmInfo






