import React from 'react';
import styles from './Stepper.module.scss';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className={styles.stepperContainer}>
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <React.Fragment key={label}>
            <div className={styles.stepWrapper}>
              <div
                className={`${styles.stepCircle} ${
                  isCompleted ? styles.completed : ''
                } ${isActive ? styles.active : ''}`}
              >
                {isCompleted ? (
                  <svg
                    className={styles.checkmark}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`${styles.stepLabel} ${
                  isCompleted || isActive ? styles.labelActive : ''
                }`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`${styles.stepLine} ${
                  index < currentStep ? styles.lineCompleted : ''
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
