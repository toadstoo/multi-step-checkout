import { useState, type FormEvent } from 'react';
import { Button } from '../../shared/ui/Button';
import { PersonalInfoStep } from './components/PersonalInfoStep';
import { ShippingStep } from './components/ShippingStep';
import { PaymentStep } from './components/PaymentStep';
import { Stepper } from './components/Stepper';
import { SuccessScreen } from './components/SuccessScreen';
import { type CheckoutData, INITIAL_DATA } from './types';
import styles from './CheckoutForm.module.scss';

export const CheckoutForm = () => {
  const [data, setData] = useState<CheckoutData>(INITIAL_DATA);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutData, string>>>({});

  const updateFields = (fields: Partial<CheckoutData>) => {
    setData(prev => ({ ...prev, ...fields }));
    setErrors(prev => {
      const updated = { ...prev };
      Object.keys(fields).forEach(key => delete updated[key as keyof CheckoutData]);
      return updated;
    });
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof CheckoutData, string>> = {};

    if (currentStep === 0) {
      if (!data.firstName.trim()) {
        newErrors.firstName = 'Имя обязательно для заполнения';
      } else if (data.firstName.trim().length < 2) {
        newErrors.firstName = 'Минимум 2 символа';
      }
      if (!data.lastName.trim()) {
        newErrors.lastName = 'Фамилия обязательна для заполнения';
      } else if (data.lastName.trim().length < 2) {
        newErrors.lastName = 'Минимум 2 символа';
      }
      if (!data.email.trim()) {
        newErrors.email = 'Email обязателен';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        newErrors.email = 'Некорректный email';
      }
      if (!data.phone.trim()) {
        newErrors.phone = 'Телефон обязателен';
      } else if (data.phone.replace(/\D/g, '').length < 10) {
        newErrors.phone = 'Минимум 10 цифр';
      }
    } else if (currentStep === 1) {
      if (!data.address.trim()) {
        newErrors.address = 'Адрес обязателен';
      } else if (data.address.trim().length < 5) {
        newErrors.address = 'Укажите более подробный адрес';
      }
      if (!data.city.trim()) {
        newErrors.city = 'Город обязателен';
      }
      if (!data.zipCode.trim()) {
        newErrors.zipCode = 'Индекс обязателен';
      } else if (!/^\d{5,6}$/.test(data.zipCode)) {
        newErrors.zipCode = 'Индекс должен быть из 5-6 цифр';
      }
    } else if (currentStep === 2) {
      const cleanCard = data.cardNumber.replace(/\s/g, '');
      if (!data.cardNumber.trim()) {
        newErrors.cardNumber = 'Номер карты обязателен';
      } else if (!/^\d{16}$/.test(cleanCard)) {
        newErrors.cardNumber = 'Номер карты должен содержать 16 цифр';
      }
      if (!data.expiryDate.trim()) {
        newErrors.expiryDate = 'Срок действия обязателен';
      } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(data.expiryDate)) {
        newErrors.expiryDate = 'Формат MM/YY';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const stepsLabels = ['Личные данные', 'Доставка', 'Оплата'];
  const steps = [
    <PersonalInfoStep data={data} updateFields={updateFields} errors={errors} />,
    <ShippingStep data={data} updateFields={updateFields} errors={errors} />,
    <PaymentStep data={data} updateFields={updateFields} errors={errors} />
  ];

  const isFirstStep = step === 0;
  const isLastStep = step === steps.length - 1;

  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    if (!isLastStep) return setStep(s => s + 1);
    
    setIsSubmitting(true);
    setTimeout(() => {
      setOrderNumber(Math.floor(100000 + Math.random() * 900000));
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setData(INITIAL_DATA);
    setStep(0);
    setErrors({});
    setIsSubmitted(false);
    setOrderNumber(null);
  };

  if (isSubmitted && orderNumber) {
    return (
      <div className={styles.card}>
        <SuccessScreen data={data} onReset={handleReset} orderNumber={orderNumber} />
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <Stepper currentStep={step} steps={stepsLabels} />
      
      <form onSubmit={handleNext} noValidate>
        <div key={step} className={styles.content}>
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

