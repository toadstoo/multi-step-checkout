import React from 'react';
import { Input } from '../../../shared/ui/Input';
import { type CheckoutData } from '../types';


interface StepProps {
  data: CheckoutData;
  updateFields: (fields: Partial<CheckoutData>) => void;
  errors: Partial<Record<keyof CheckoutData, string>>;
}

export const PersonalInfoStep: React.FC<StepProps> = ({ data, updateFields, errors }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ marginBottom: '0.5rem' }}>Личные данные</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Input
          label="Имя"
          value={data.firstName}
          onChange={e => updateFields({ firstName: e.target.value })}
          error={errors.firstName}
          placeholder="Иван"
        />
        <Input
          label="Фамилия"
          value={data.lastName}
          onChange={e => updateFields({ lastName: e.target.value })}
          error={errors.lastName}
          placeholder="Иванов"
        />
      </div>
      <Input
        label="Email"
        type="email"
        value={data.email}
        onChange={e => updateFields({ email: e.target.value })}
        error={errors.email}
        placeholder="ivan@example.com"
      />
      <Input
        label="Телефон"
        type="tel"
        value={data.phone}
        onChange={e => updateFields({ phone: e.target.value })}
        error={errors.phone}
        placeholder="+7 (999) 999-99-99"
      />
    </div>
  );
};

