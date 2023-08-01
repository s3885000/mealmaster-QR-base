import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { CheckIcon, InProgressIcon } from '../../asset/icons/box/index.js';

const useStyles = makeStyles({
  root: {
    color: '#C9C9C9',
  },
  stepper: {
    backgroundColor: '#F7F7F8',
  },
  active: {
    color: '#22BB9B',
  },
  completed: {
    color: '#C9C9C9',
  },
  iconContainer: {
    transform: 'scale(1.5)',
  },
  label: {
    fontSize: '12px',
    position: 'relative',
    padding: '0 15px', 
  },
  step: {
    flex: '15',
  },
});

const steps = ['Confirmed', 'In Progress', 'Ready'];

const Progress = ({ currentStep }) => {
  const classes = useStyles();

  const StepIconComponent = (props) => {
    return (
      <div
        style={{ backgroundColor: props.completed ? '#22BB9B' : '#C9C9C9', borderRadius: '5px' }}
        className={`w-6 h-6 rounded-md flex items-center justify-center`}
      >
        {props.completed ? <CheckIcon className='text-white' /> : <InProgressIcon className='text-white' />}
      </div>
    );
  };

  return (
    <Stepper activeStep={currentStep} alternativeLabel className={classes.stepper}>
      {steps.map((label) => (
        <Step key={label} className={classes.step}>
          <StepLabel
            StepIconComponent={StepIconComponent}
            classes={{
              root: classes.root,
              label: classes.label,
              completed: classes.completed,
              active: classes.active,
              iconContainer: classes.iconContainer,
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default Progress;
