// src/_component/CheckoutStepper/page.tsx
import { Stepper, Step, StepLabel } from '@mui/material';

interface CheckoutStepperProps {
  activeStep: number;
}

export default function CheckoutStepper({ activeStep }: CheckoutStepperProps) {
  const steps = ['Customer Details', 'Delivery Information', 'Payment'];
  
  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2 }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}