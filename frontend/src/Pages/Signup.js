
import React, { useRef, useState } from 'react';
import { Button, Typography, Box, Stepper, Step, StepLabel,  } from '@mui/material';

import Email from '../Components/Signuppages/1.0Email'
import Otp from '../Components/Signuppages/1.1otp'
import YourInfo from '../Components/Signuppages/2.0Yourinfo'
import FirmInfo from '../Components/Signuppages/2.1Firminfo'
import FirmDetails from '../Components/Signuppages/2.2Firmdetails'
import ServicesFirmOffer from '../Components/Signuppages/2.3Servicesfirmoffer'
import YourRoleInFirm from '../Components/Signuppages/2.4Yourroleinfirm'
import FirmSettings from '../Components/Signuppages/3.0Firmsettings'
import logo from '../Images/logo.jpg'
import SetPassword from '../Components/Signuppages/3.2SetPassword'
import BookSession from '../Components/Signuppages/4.0BookSession'

import './signup.css'
import '../Components/loaddd.css'
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';




const steps = [
  { label: 'Email', subSteps: [Email, Otp] },
  { label: 'Information', subSteps: [YourInfo, FirmInfo, FirmDetails, ServicesFirmOffer, YourRoleInFirm] },
  { label: 'Settings', subSteps: [FirmSettings, SetPassword] },
  { label: 'Book a Session', subSteps: [BookSession] },
];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0)

  const [activeSubStep, setActiveSubStep] = useState(0)
  const [loading, setLoading] = useState()

  const navigate = useNavigate();
  const formRef = useRef(null)

  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    firstname: '',
    lastname: '',
    phoneno: '',
    firmname: '',
    country: '',
    state: '',
    firmsize: '',
    referal: '',
    firmservices: [],
    roleinfirm: '',
    weburl: '',
    currency: '',
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
    if (activeStep === steps.length - 2 && activeSubStep === steps[activeStep].subSteps.length - 1) {   
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
    <img src={logo} width='auto' className='logosigunup' alt='logo' />
    <Link className='loginbut' to='/login'>Login</Link>


    <Box sx={{ width: '80%', m: '0 auto', mt: '3%', }}>

      {/* stepperrrrr */}
      {!((activeStep === 0 && activeSubStep === 0) || activeStep === steps.length - 1) && <Stepper sx={{ mx: '20%' }} activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>}


      {/* backbutton and the currentcomponent */}

      <Box sx={{ display: 'flex', mt: '10%',  }}>
        {!((activeStep === 0 && (activeSubStep === 0 || activeSubStep === 1)||activeStep === steps.length - 1)) && <Button
          disabled={(activeStep === 1 && activeSubStep === 0) || loading}
          sx={{ color: 'dodgerblue', height: '50px', }}
          onClick={handleBack}> <span class="material-symbols-outlined">
            expand_circle_down
          </span>
        </Button>}


        <Box sx={{
           m: ((activeStep === 0 && (activeSubStep === 0 || activeSubStep === 1)) || activeStep === steps.length - 1) ? '0 auto' : '0 0 0 2%',
           mb: 2,
           width: ((activeStep === 0 && (activeSubStep === 0 || activeSubStep === 1)) || activeStep === steps.length - 1) ? '50%' : '90%', 
          }}>

          <CurrentComponent ref={formRef} formData={formData}
            setFormData={setFormData} setLoading={setLoading} />
        </Box></Box>



{/* login verify buttons */}
      {((activeStep === 0 && (activeSubStep === 0 || activeSubStep === 1)) || activeStep === steps.length - 1) &&
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
          onClick={handleNext}>{activeSubStep === 0 && activeStep === 0 ? 'Create Account' : 'Verify OTP'}</Button>}
      {(activeSubStep === 0 && activeStep === 0) && <Typography variant='h6' sx={{ textAlign:'center'}} >Already have an account? <Link to='/login'>Sign In</Link></Typography>}




{/* NEXTTT BUTTONNSSS AND FINISHHHH */}
      {!((activeStep === 0 && (activeSubStep === 0 || activeSubStep === 1)) || activeStep === steps.length - 1) && <Button type='submit'
        variant="contained" 
        sx={{
          ml: '90px',
          width: '13%',
          color: 'white',
          borderRadius: '10px',
          fontWeight: '600',
          border: '2px solid dodgerblue',
          height: '50px',
          textTransform: 'capitalize',
          fontSize: '15px',
          bgcolor: 'dodgerblue',
          mb: '20px',
          ":hover": {
            backgroundColor: 'white', color: 'dodgerblue', border: '2px solid dodgerblue'
          }, ":disabled": {
            bgcolor: '#C1D0FF'
          }
        }}

        onClick={handleNext}
        disabled={(activeStep === steps.length - 1 && activeSubStep === steps[activeStep].subSteps.length - 1)||loading}
      >
       {activeStep === steps.length - 2 && activeSubStep === steps[activeStep].subSteps.length - 1 ? 'Finish' : 'Next'}
      </Button>}
      {loading && <div className='loader'></div>}


    </Box></>
  )
}
export default MultiStepForm;



