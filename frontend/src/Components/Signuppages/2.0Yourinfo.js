import { Alert, Box, InputLabel, TextField, Typography } from '@mui/material'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { useSignup } from '../../Hooks/Usesignup'


const CustomPhoneInput = ({ value, onChange, error }) => {


    return (
        <PhoneInput

            country={'in'}
            value={value}
            onChange={onChange}
            containerStyle={{
                width: '50%',
                borderRadius: error ? '10px 10px 0 0 ' : '10px',
                height: '60px',
                background: 'white',
                border: error ? '1px solid red' : '1px solid grey',
                display: 'flex',
                alignItems: 'center',
            }}
            inputStyle={{
                width: '100%',
                border: 'none', height: '60px',
                outline: 'none',
                fontSize: '16px',
                borderRadius: '10px',
                color: '#000',
                padding: '8px 0',
                marginLeft: '60px',
            }}
            buttonStyle={{
                border: 'none', height: '60px',
                background: 'white',
                padding: '0',
                marginLeft: '8px',

            }}
            dropdownStyle={{
                margin: '0',
                width: '300px',
            }}
            specialLabel=''
        />
    );
};
const YourInfo = forwardRef(({ formData, setFormData ,setLoading}, ref) => {

    const [phoneno, setPhoneno] = useState(formData.phoneno)
    const [firstname, setfirstname] = useState(formData.firstname)
    const [lastname, setlastname] = useState(formData.lastname)

    const [phnerror, setphnerror] = useState(false)
    const [firnameerr, setfirnameerr] = useState(false)
    const [lastnameerr, setlastnameerr] = useState(false)
  const[allerror , setallerror]=useState(false)

    const handlePhoneChange = (value) => {
        setPhoneno(value)
    }

    const { urinfosignup, error, isLoading } = useSignup()

    setLoading(isLoading)
    useEffect(() => {
  
      if(error==='Fill All the Fields')
        {
          setallerror(true)
      }else{
          setallerror(false)
        
        }
  
    
      if (error === 'Enter First Name') {
        setfirnameerr(true);
  
      }
      else {
        setfirnameerr(false);
      }
      if (error === 'Enter Last Name ') {
        setlastnameerr(true);
      } else {
        setlastnameerr(false)
      }
      if (error === 'Enter Phone Number' || error === 'Phone Number Already Exists' || error==='Enter a Valid Phone number') {
        setphnerror(true);
      } else {
        setphnerror(false)
      }
    }, [error]);


    useImperativeHandle(ref, () => async () => {
        // Add validation logic here

        try {
        
            await urinfosignup(firstname, lastname, phoneno)
            setLoading(isLoading)
            setFormData(prev => ({ ...prev, firstname, lastname, phoneno }));
            return true;
        } catch (error) {
            return false
        }

    })

    return (
        <Box>
            <Typography sx={{ fontSize: '55px', fontWeight: '700' }} variant='h3'>Your information</Typography>
            <Box sx={{ display: 'flex', mt: '3.5%', mb: '2%', width: '50%' }}>
                <Box sx={{ width: '54%' }}>
                    <InputLabel htmlFor="outlined-firname">First name</InputLabel>
                    <TextField
                        id='outlined-firname'
                        placeholder="fisrt name" //error={(eerror)}
                        name='email'
                        error={(allerror||firnameerr)}
                        value={firstname}
                        onChange={(e) => {
                            setfirstname(e.target.value);
                        }}
                        //  (eerror) ? '10px 10px 0 0' :
                        sx={{
                            width: '100%', bgcolor: 'white',
                            borderRadius: (allerror||firnameerr) ? '10px 10px 0 0' : '10px', '& .MuiOutlinedInput-root': {
                                borderRadius: (allerror||firnameerr) ? '10px 10px 0 0' : '10px',height:'60px',
                                '& fieldset': {
                                  borderRadius: (allerror||firnameerr) ? '10px 10px 0 0' : '10px',
                                },
                              },
                        }}

                    />
                    {(allerror||firnameerr) && <Alert sx={{
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
                </Box>


                <Box sx={{ ml: '2%', width: '54%' }}>
                    <InputLabel htmlFor="outlined-lastname">Last Name</InputLabel>
                    <TextField
                        id="outlined-lastname"
                        placeholder="last name" // error={(eerror)}
                        name='email'
                        error={allerror||lastnameerr}
                        value={lastname}
                        onChange={(e) => {
                            setlastname(e.target.value);
                        }}
                        sx={{
                            width: '100%', bgcolor: 'white',
                            borderRadius: (allerror||lastnameerr) ? '10px 10px 0 0' : '10px', '& .MuiOutlinedInput-root': {
                                borderRadius: (allerror||lastnameerr) ? '10px 10px 0 0' : '10px',height:'60px',
                                '& fieldset': {
                                  borderRadius: (allerror||lastnameerr) ? '10px 10px 0 0' : '10px',
                                },
                              },
                        }}

                    />
                    {(allerror||lastnameerr) && <Alert sx={{
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
                </Box></Box>
            <InputLabel htmlFor="outlined-phone">Phone Number</InputLabel>
            <CustomPhoneInput
                id="outlined-phone"
                value={phoneno}

                onChange={handlePhoneChange}
                error={(allerror||phnerror)}
            />
            {(allerror||phnerror) && <Alert sx={{
                width: '46.21%',
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



        </Box>)
})

export default YourInfo