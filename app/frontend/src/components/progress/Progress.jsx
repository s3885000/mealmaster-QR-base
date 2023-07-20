import React from 'react';
import { CheckIcon, InProgressIcon } from '../../asset/icons/box/index.js';

const steps = ['Confirmed', 'In Progress', 'Ready'];

const Step = ({ currentStep, stepIndex }) => (
  <div className="step flex flex-col items-center mx-10 text-center w-20"> 
    <div className={`step w-10 h-10 rounded-md ${currentStep = stepIndex ? 'bg-primary' : 'bg-gray'} flex items-center justify-center`}>
      {currentStep = stepIndex ? <CheckIcon className='text-white' /> : <InProgressIcon className='text-white' />}
    </div>
    <p className="text-sm text-center whitespace-nowrap w-20">{steps[stepIndex]}</p>
  </div>
)

const Progress = ({ currentStep }) => (
  <div className="h-full flex justify-center items-center pr-5">
    {steps.map((step, index) => (
      <Step currentStep={currentStep} stepIndex={index} key={step} />
    ))}
    <div className='flex flex-row absolute mb-5'>
      <div className='bg-gray w-[7.5rem] h-1 hover:bg-primary mr-5'/>
      <div className='bg-gray w-[7.5rem] h-1 hover:bg-primary ml-5'/>
    </div>
  </div>
);

export default Progress;
