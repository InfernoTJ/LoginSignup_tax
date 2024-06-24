
import React, { useRef, useState } from 'react';
import { Button, TextField, Typography , Box, Stepper, Step, StepLabel, styled } from '@mui/material';


import Email from '../Components/Signuppages/1.0Email';
import Otp from '../Components/Signuppages/1.1otp';
import YourInfo from '../Components/Signuppages/2.0Yourinfo';
import FirmInfo from '../Components/Signuppages/2.1Firminfo';
import FirmDetails from '../Components/Signuppages/2.2Firmdetails';
import ServicesFirmOffer from '../Components/Signuppages/2.3Servicesfirmoffer';
import YourRoleInFirm from '../Components/Signuppages/2.4Yourroleinfirm';
import FirmSettings from '../Components/Signuppages/3.0Firmsettings';

import SetPassword from '../Components/Signuppages/3.2SetPassword';
import BookSession from '../Components/Signuppages/4.0BookSession';







const steps = [
  { label: 'Email', subSteps: [Email, Otp] },
  { label: 'Information', subSteps: [YourInfo, FirmInfo, FirmDetails, ServicesFirmOffer, YourRoleInFirm] },
  { label: 'Settings', subSteps: [FirmSettings, SetPassword] },
  { label: 'Book a Session', subSteps: [BookSession] },
];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0)

  const [activeSubStep, setActiveSubStep] = useState(0)

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

  return (
    <Box sx={{ width: '70%' , m:'0 auto' ,mt:'3%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt:'10%', mb: 2 ,border:'1px solid black'}}>
      <CurrentComponent ref={formRef} formData={formData}
          setFormData={setFormData} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button  disabled={(activeStep === 0 && activeSubStep === 0 ) || activeStep === steps.length - 1} onClick={handleBack}>
          Back
        </Button>
        <Button type='submit'
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={activeStep === steps.length - 1 && activeSubStep === steps[activeStep].subSteps.length - 1}
        >
          {activeStep === steps.length - 2 && activeSubStep === steps[activeStep].subSteps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  )
}
export default MultiStepForm;



