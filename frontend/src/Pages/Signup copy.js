import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Stepper, Step, StepLabel } from '@mui/material';


function SignUpForm() {



  const [activeStep, setActiveStep] = useState(0);
  const [subStep, setSubStep] = useState(0); // New state to handle sub-steps within a stage
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    // Add other fields as necessary
  });

  const steps = ['Account Details', 'Personal Details', 'Confirmation'];

  const handleNext = () => {
    if (activeStep === 0 && subStep < 1) {
      setSubStep((prevSubStep) => prevSubStep + 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSubStep(0); // Reset subStep when moving to the next main step
    }
  };

  const handleBack = () => {
    if (activeStep === 0 && subStep > 0) {
      setSubStep((prevSubStep) => prevSubStep - 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setSubStep(0); // Reset subStep when moving back to the previous main step
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formValues);
  };

  const renderSubStepContent = (subStep) => {
    switch (subStep) {
      case 0:
        return (
          <Box>
            <TextField
              label="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 1:
        return (
          //otp pageeeee----------------------------------------------------------------------------------------------------------------------
          <Box>
           
          </Box>
        );
      default:
        return 'Unknown sub-step';
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderSubStepContent(subStep);
      case 1:
        return (
          <Box>
            <TextField
              label="First Name"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6">Confirm Your Details</Typography>
            <Typography>Email: {formValues.email}</Typography>
            <Typography>First Name: {formValues.firstName}</Typography>
            <Typography>Last Name: {formValues.lastName}</Typography>
            <Typography>Phone Number: {formValues.phoneNumber}</Typography>
            {/* Add other fields as necessary */}
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '50%', margin: 'auto', mt: 5 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit}>
        {renderStepContent(activeStep)}
        <Box sx={{ mt: 2 }}>
          {(activeStep !== 0 || subStep !== 0) && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 && subStep === 0 ? (
            <Button variant="contained" type="submit">
              Submit
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              {activeStep === 0 && subStep === 0 ? 'Next' : 'Continue'}
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
}

export default SignUpForm;
