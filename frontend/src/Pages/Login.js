import React, { useEffect, useState } from 'react'
import logo from '../Images/logo.jpg'
import Tweeter from '../Images/Icons/tweeter.png'
import Facebook from '../Images/Icons/facebook.png'
import weebly from '../Images/Icons/weebly.png'
import linkedin from '../Images/Icons/linkedin.png'
import Instagram from '../Images/Icons/instagram.png'

import { Link } from 'react-router-dom'
import './login.css'
import '../Components/Loading.css'

import { Alert, Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, InputLabel, Select, MenuItem, OutlinedInput, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import { useLogin } from '../Hooks/Uselogin'


function Login() {





    const [timeout, setTimeout] = useState('')
    const [psswrd, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [checkbox, setCheckbox] = useState(false)

    const [allerror, setallerror] = useState(false)
    const [emailError, setEmailError] = useState(false);
    const [passworderror, setPasswordError] = useState(false);
    const [sessionerror, setSessionerror] = useState(false);
    const [checkboxerror, setCheckboxerror] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    //Agree to terms and conditons
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const { login, isLoading, mailerror } = useLogin()


    useEffect(() => {
        if (mailerror === 'All the Fields must be filled') {
            setallerror(true);

        }
        else {
            setallerror(false);
        }
        if (mailerror === 'Incorrect Email') {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
        if (mailerror === 'Incorrect Password') {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
        if (mailerror === 'Select Stay Signed in') {
            setSessionerror(true)
        }
        else { setSessionerror(false) }
        if (mailerror === 'Agree to terms and conditons') {
            setCheckboxerror(true)
        }
        else { setCheckboxerror(false) }

    }, [mailerror]);


    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, psswrd, timeout, checkbox)

    }



    return (
        <Box className='loginpage' >
            <Box className='logininfo' >
                <img src={logo} className='LOGO' width='auto' height='70px' alt='logo' />
                <h1 className='wbtext'  >Welcome Back</h1>
                <Typography variant='p' sx={{ color: "white", mx:8, textAlign: 'center', fontSize: '20px', fontWeight: '500' }}>
                    "Welcome to 'SNP Tax & Financials', where tax management meets simplicity. Our advanced software streamlines tax processes for individuals, businesses, and professionals, ensuring accuracy and efficiency. Experience a new era of financial ease with SNP Tax & Financials."</Typography>
                <Typography variant='p' className='fontchange' >
                    Please Login to access your account</Typography>
                <div className='loginas'>
                    <Link target='blank' to="https://x.com/?lang=en"><img width='60px' className='sociallogos big' height='60px' src={Tweeter} alt='logoss' /></Link>
                    <Link target='blank' to="https://www.facebook.com"><img width='60px' className='sociallogos big' height='60px' src={Facebook} alt='logoss' /></Link>
                    <Link target='blank' to="https://www.weebly.com/in"><img width='40px' className='sociallogos' height='40px' src={weebly} alt='logoss' /></Link>
                    <Link target='blank' to="https://www.linkedin.com/feed/"><img width='40px' className='sociallogos' height='40px' src={linkedin} alt='logoss' /></Link>
                    <Link target='blank' to="https://www.instagram.com"><img width='40px' className='sociallogos' height='40px' src={Instagram} alt='logoss' /></Link>
                </div>
            </Box>
            <Box className='logininput'  >
                <form onSubmit={handleSubmit} >
                    <Box className='loginalign'>
                        <Typography variant='h1' sx={{
                            color: "black", fontSize: "35px",
                            fontWeight: '700', mb: '50px'

                        }}>Login Account</Typography>
                        <InputLabel htmlFor="outlined-required">Email</InputLabel>
                        <TextField disabled={isLoading}
                            placeholder="Email" error={(emailError || allerror)}
                            name='email'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            sx={{
                                width: '100%', bgcolor: 'white',
                                borderRadius: (emailError || allerror) ? '10px 10px 0 0' : '10px', '& .MuiOutlinedInput-root': {
                                    borderRadius: (emailError || allerror) ? '10px 10px 0 0' : '10px',
                                    '& fieldset': {
                                        borderRadius: (emailError || allerror) ? '10px 10px 0 0' : '10px',
                                    },
                                },
                            }}
                            id="outlined-required"
                        />
                        {(emailError || allerror) && <Alert sx={{
                            width: '96%',
                            p: '0', // Adjust padding to control the size
                            pl: '4%', height: '23px',
                            borderRadius: '10px',
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
                            Incorrect Email
                        </Alert>}

                        <br />

                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput value={psswrd} disabled={isLoading} error={(passworderror || allerror)}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                width: '100%', bgcolor: 'white', borderRadius: (passworderror || allerror) ? '10px 10px 0 0' : '10px', '& .MuiOutlinedInput-root': {
                                    borderRadius: (passworderror || allerror) ? '10px 10px 0 0' : '10px',
                                    '& fieldset': {
                                        borderRadius: (passworderror || allerror) ? '10px 10px 0 0' : '10px',
                                    },
                                },
                            }}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton disabled={isLoading}
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }

                            placeholder="Password"
                        /> {(passworderror || allerror) && <Alert sx={{
                            width: '96%',
                            p: '0', // Adjust padding to control the size
                            pl: '4%',
                            height: '23px',
                            borderRadius: '10px',
                            borderTopLeftRadius: '0',
                            borderTopRightRadius: '0',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center', // Center content vertically
                            '& .MuiAlert-icon': {
                                fontSize: '16px', // Adjust the size of the icon
                                mr: '8px', // Add margin to the right of the icon
                            },
                        }} variant="filled" severity="error">
                            Incorrect Password
                        </Alert>}
                        <Link to='/passwordreset' style={{ marginTop: '25px', marginBottom: '25px' }}>Forgot Password</Link>

                        <InputLabel id="time-select-label">Stay Signed In For</InputLabel>
                        <Select disabled={isLoading}
                            sx={{
                                width: '100%', bgcolor: 'white', borderRadius: (sessionerror || allerror) ? '10px 10px 0 0' : '10px', '& .MuiOutlinedInput-root': {
                                    borderRadius: (sessionerror || allerror) ? '10px 10px 0 0' : '10px',
                                    '& fieldset': {
                                        borderRadius: (sessionerror || allerror) ? '10px 10px 0 0' : '10px',
                                    },
                                },
                            }}
                            error={(sessionerror || allerror)}
                            labelId="time-select-label"
                            id="time-select"
                            value={timeout}

                            onChange={(e) => {
                                setTimeout(e.target.value);
                            }}
                        >
                            <MenuItem value={0} disabled>Select Time Interval</MenuItem>
                            <MenuItem value={5}>5 Seconds</MenuItem>
                            <MenuItem value={'8h'}>8 Hours</MenuItem>
                            <MenuItem value={'10d'}>10 Days</MenuItem>
                            <MenuItem value={'30d'}>30 Days</MenuItem>
                        </Select>
                        {(sessionerror || allerror) && <Alert sx={{
                            width: '96%',
                            p: '0', // Adjust padding to control the size
                            pl: '4%', height: '23px',
                            borderRadius: '10px',
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
                            Select Timeout
                        </Alert>}
                        <FormControlLabel sx={{ marginTop: '12px' }} disabled={isLoading} value={checkbox} control={<Checkbox checked={checkbox} onChange={(e) => { setCheckbox(e.target.checked) }} sx={{ color: (checkboxerror || allerror) ? 'red' : '' }} />} label={
                            <span className='termncond'>
                                "Agree to
                                <Link to="/termsncond">
                                    Terms and Conditions"
                                </Link>
                            </span>
                        } />
                        {(checkboxerror || allerror) && <Alert sx={{
                            width: '96%',
                            p: '0', // Adjust padding to control the size
                            pl: '4%', height: '23px',
                            borderRadius: '10px',

                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center', // Center content vertically
                            '& .MuiAlert-icon': {
                                fontSize: '16px', // Adjust the size of the icon
                                mr: '8px', // Add margin to the right of the icon
                            },
                        }} variant="filled" severity="error" >
                            Check the Agree to terms and conditons
                        </Alert>}
                        <Button type='submit' disabled={isLoading} variant="contained" sx={{
                            borderColor: 'primary.main',
                            borderWidth: '2px', borderStyle: 'solid', fontSize: '15px', fontWeight: '600', borderRadius: '100px', mt: '15px',
                            ':hover': {
                                backgroundColor: 'transparent',
                                borderColor: 'primary.main',
                                color: 'primary.main',
                                boxShadow: 'none',
                                borderWidth: '2px',
                                borderStyle: 'solid',
                            },
                        }}>Login</Button>
                        <p className='donthaveacc'>Don't have an account?<Link to='/signup'>Sign Up</Link></p>
                    </Box></form>
                {isLoading && <div className='loaderr'></div>}
            </Box>

        </Box>
    )
}

export default Login