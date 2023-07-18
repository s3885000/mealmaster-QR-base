import React from 'react';
import { CheckIcon, InProgressIcon } from '../../asset/icons/box/index.js';

const steps = ['Confirmed', 'In Progress', 'Ready'];

const Step = ({ currentStep, step }) => {
  const Icon = currentStep === step ? CheckIcon : InProgressIcon;
  const bgColor = currentStep === step ? 'bg-primary' : 'bg-gray';

  return (
    <div className={`step flex flex-col items-center mx-10`}>
      <div className={`w-10 h-10 rounded-md ${bgColor} flex items-center justify-center`}>
        <Icon className='text-white' />
      </div>
      <p className="text-sm text-center overflow-hidden truncate whitespace-nowrap">{step}</p>
    </div>
  );
}

const Progress = ({ currentStep }) => (
  <div className="h-full flex justify-center items-center pr-8">
    {steps.map((step, index) => (
      <Step currentStep={currentStep} step={step} key={step} />
    ))}
  </div>
);

export default Progress;
