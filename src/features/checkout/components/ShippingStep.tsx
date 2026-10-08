import React from 'react';
import { Input } from '../../../shared/ui/Input';
import { type CheckoutData } from '../types';

interface StepProps {
  data: CheckoutData;
  updateFields: (fields: Partial<CheckoutData>) => void;
  errors: Partial<Record<keyof CheckoutData, string>>;
}

export const ShippingStep: React.FC<StepProps> = ({ data, updateFields, errors }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ marginBottom: '0.5rem' }}>Адрес доставки</h2>
      <Input
        label="Адрес (Улица, дом, квартира)"
        value={data.address}
        onChange={e => updateFields({ address: e.target.value })}
        error={errors.address}
        placeholder="ул. Ленина, д. 10, кв. 25"
      />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
        <Input
          label="Город"
          value={data.city}
          onChange={e => updateFields({ city: e.target.value })}
          error={errors.city}
          placeholder="Москва"
        />
        <Input
          label="Индекс"
          value={data.zipCode}
          onChange={e => updateFields({ zipCode: e.target.value })}
          error={errors.zipCode}
          placeholder="101000"
          maxLength={6}
        />
      </div>
    </div>
  );
};
