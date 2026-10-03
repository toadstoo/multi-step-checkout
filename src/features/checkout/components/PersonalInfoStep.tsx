import React from 'react';
import { Input } from '../../../shared/ui/Input';
import { type CheckoutData } from '../types';


interface StepProps {
  data: CheckoutData;
  updateFields: (fields: Partial<CheckoutData>) => void;
}

export const PersonalInfoStep: React.FC<StepProps> = ({ data, updateFields }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ marginBottom: '0.5rem' }}>Личные данные</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Input
          label="Имя"
          required
          value={data.firstName}
          onChange={e => updateFields({ firstName: e.target.value })}
        />
        <Input
          label="Фамилия"
          required
          value={data.lastName}
          onChange={e => updateFields({ lastName: e.target.value })}
        />
      </div>
      <Input
        label="Email"
        type="email"
        required
        value={data.email}
        onChange={e => updateFields({ email: e.target.value })}
      />
      <Input
        label="Телефон"
        type="tel"
        required
        value={data.phone}
        onChange={e => updateFields({ phone: e.target.value })}
      />
    </div>
  );
};
