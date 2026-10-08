import React from 'react';
import { Input } from '../../../shared/ui/Input';
import { type CheckoutData } from '../types';

interface StepProps {
  data: CheckoutData;
  updateFields: (fields: Partial<CheckoutData>) => void;
  errors: Partial<Record<keyof CheckoutData, string>>;
}

export const PaymentStep: React.FC<StepProps> = ({ data, updateFields, errors }) => {
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // only digits
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    // Format as XXXX XXXX XXXX XXXX
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    updateFields({ cardNumber: formatted });
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // only digits
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    // Format as MM/YY
    let formatted = value;
    if (value.length > 2) {
      formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    updateFields({ expiryDate: formatted });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ marginBottom: '0.5rem' }}>Оплата заказа</h2>
      <Input
        label="Номер карты"
        value={data.cardNumber}
        onChange={handleCardNumberChange}
        error={errors.cardNumber}
        placeholder="0000 0000 0000 0000"
        maxLength={19} // 16 digits + 3 spaces
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        <Input
          label="Срок действия"
          value={data.expiryDate}
          onChange={handleExpiryDateChange}
          error={errors.expiryDate}
          placeholder="MM/YY"
          maxLength={5} // 4 digits + 1 slash
        />
      </div>
    </div>
  );
};
