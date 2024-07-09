
import React, { useRef, useState } from 'react';
import { Button, Typography, Box, Stepper, Step, StepLabel,  } from '@mui/material';

import Email from '../Components/passwordreset/mailverification'
import Otp from '../Components/passwordreset/otpverification'
import logo from '../Images/logo.jpg'
import SetPassword from '../Components/passwordreset/passwordreset'


import './signup.css'
import '../Components/loaddd.css'
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';




const steps = [
  { label: 'Email', subSteps: [Email, Otp,SetPassword] },
  
];

const Passwordreset = () => {
  const [activeStep, setActiveStep] = useState(0)

  const [activeSubStep, setActiveSubStep] = useState(0)
  const [loading, setLoading] = useState()

  const navigate = useNavigate();
  const formRef = useRef(null)

  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    usrpassword: ''
  });

 



  const handleNext = async () => {
    if (formRef.current) {
      const isValid = await formRef.current();
      if (!isValid) return;
    }
    if (activeSubStep < steps[activeStep].subSteps.length - 1) {
      setActiveSubStep((prev) => prev + 1);
    } else if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
      setActiveSubStep(0);
    }
    if (activeStep===0 && activeSubStep===2) {   
      navigate('/login');
    } 
  };

  const handleBack = () => {
    if (activeSubStep > 0) {
      setActiveSubStep((prev) => prev - 1);
    } else if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
      setActiveSubStep(steps[activeStep - 1].subSteps.length - 1);
    }
  };

  const CurrentComponent = steps[activeStep].subSteps[activeSubStep];

  return (<>
    <img src={logo} width='auto' style={{ position: 'absolute', top: '40px', left: '100px' }} height='55px' alt='logo' />
    <Link className='loginbut' to='/login'>Login</Link>


    <Box sx={{ width: '80%', m: '0 auto', mt: '3%', }}>

      


      {/* backbutton and the currentcomponent */}

      <Box sx={{ display: 'flex', mt: '10%',  }}>
      {/* <Button
          disabled={(activeStep === 1 && activeSubStep === 0) || loading}
          sx={{ color: 'dodgerblue', height: '50px', }}
          onClick={handleBack}> <span class="material-symbols-outlined">
            expand_circle_down
          </span>
        </Button> */}


        <Box sx={{
           m: '0 auto',
           mb: 2,
           width:'50%', 
          //  bgcolor:'aqua'
          }}>

          <CurrentComponent ref={formRef} formData={formData}
            setFormData={setFormData} setLoading={setLoading} />
        </Box></Box>



{/* login verify buttons */}
      {((activeStep === 0 && (activeSubStep === 0 || activeSubStep === 1)) ) &&
        <Button disabled={loading}
          sx={{
            ml: '25%',
            width: '48%',
            color: 'white',
            borderRadius: '15px',
            fontWeight: '600',
            border: '2px solid dodgerblue',
            height: '60px',
            fontSize: '15px',
            bgcolor: 'dodgerblue',
            mb: '20px',
            ":hover": {
              backgroundColor: 'white',
              color: 'dodgerblue',
              border: '2px solid dodgerblue'
            }, ":disabled": {
              bgcolor: '#C1D0FF'
            }
          }}
          type='submit'
          variant="contained"
          color="primary"
          onClick={handleNext}>{activeSubStep === 0 && activeStep === 0 ? 'Verify' : 'Verify OTP'}</Button>}
   




{/* NEXTTT BUTTONNSSS AND FINISHHHH */}
      {(activeStep===0 && activeSubStep===2) && <Button type='submit'
        variant="contained" 
        sx={{
          ml: '25%',
          width: '50%',
          color: 'white',
          borderRadius: '15px',
          fontWeight: '600',
          border: '2px solid dodgerblue',
          height: '60px',
          fontSize: '15px',
          bgcolor: 'dodgerblue',
          mb: '20px',
          ":hover": {
            backgroundColor: 'white',
            color: 'dodgerblue',
            border: '2px solid dodgerblue'
          }, ":disabled": {
            bgcolor: '#C1D0FF'
          }
        }}

        onClick={handleNext}
        disabled={loading}
      >
       Confirm
      </Button>}
      {loading && <div className='loader'></div>}


    </Box></>
  )
}
export default Passwordreset;



