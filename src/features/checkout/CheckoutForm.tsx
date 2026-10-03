import { useState, type FormEvent } from 'react';
import { Button } from '../../shared/ui/Button';
import { PersonalInfoStep } from './components/PersonalInfoStep';
import { type CheckoutData, INITIAL_DATA } from './types';
import styles from './CheckoutForm.module.scss';


export const CheckoutForm = () => {
  const [data, setData] = useState<CheckoutData>(INITIAL_DATA);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFields = (fields: Partial<CheckoutData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const steps = [
    <PersonalInfoStep data={data} updateFields={updateFields} />,
    <div>Адрес (В разработке)</div>,
    <div>Оплата (В разработке)</div>
  ];

  const isFirstStep = step === 0;
  const isLastStep = step === steps.length - 1;

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return setStep(s => s + 1);
    
    // Final Submit
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Заказ оформлен! Данные отправлены на ${data.email}`);
      setIsSubmitting(false);
      setStep(0);
      setData(INITIAL_DATA);
    }, 1500);
  };

  return (
    <div className={styles.card}>
      <div className={styles.stepper}>
        Шаг {step + 1} из {steps.length}
      </div>
      
      <form onSubmit={handleNext}>
        <div className={styles.content}>
          {steps[step]}
        </div>
        
        <div className={styles.actions}>
          {!isFirstStep && (
            <Button type="button" variant="secondary" onClick={() => setStep(s => s - 1)}>
              Назад
            </Button>
          )}
          <Button type="submit" isLoading={isSubmitting}>
            {isLastStep ? 'Оформить заказ' : 'Далее'}
          </Button>
        </div>
      </form>
    </div>
  );
};
