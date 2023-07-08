import React from 'react';
import { CheckIcon, InProgressIcon } from '../../asset/icons/box/index.js';

const steps = ['Confirmed', 'In Progress', 'Ready'];

const Step = ({ currentStep, stepIndex }) => (
  <div className="step flex flex-col items-center mx-10"> 
    <div className={`step w-10 h-10 rounded-md ${currentStep = stepIndex ? 'bg-primary' : 'bg-gray'} flex items-center justify-center`}>
      {currentStep = stepIndex ? <CheckIcon className='text-white' /> : <InProgressIcon className='text-white' />}
    </div>
    <p className="text-sm text-center overflow-hidden truncate whitespace-nowrap">{steps[stepIndex]}</p>
  </div>
)

const Progress = ({ currentStep }) => (
  <div className="h-full flex justify-center items-center pr-8"> 
    {steps.map((step, index) => (
      <Step currentStep={currentStep} stepIndex={index} key={step} />
    ))}
  </div>
);

export default Progress;
