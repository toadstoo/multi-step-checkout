import React from 'react';
import { Button } from '../../../shared/ui/Button';
import { type CheckoutData } from '../types';
import styles from './SuccessScreen.module.scss';

interface SuccessScreenProps {
  data: CheckoutData;
  onReset: () => void;
  orderNumber: number;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ data, onReset, orderNumber }) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <svg
          className={styles.checkmarkIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      <h2 className={styles.title}>Заказ успешно оформлен!</h2>
      <p className={styles.orderNumber}>Номер заказа: <strong>#{orderNumber}</strong></p>
      
      <p className={styles.description}>
        Спасибо за ваш заказ, <strong>{data.firstName}</strong>! Подтверждение и детальная информация были отправлены на ваш email: <span className={styles.email}>{data.email}</span>.
      </p>

      <div className={styles.summaryCard}>
        <h3 className={styles.summaryTitle}>Детали доставки</h3>
        <div className={styles.summaryRow}>
          <span className={styles.label}>Получатель:</span>
          <span className={styles.value}>{data.firstName} {data.lastName}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.label}>Телефон:</span>
          <span className={styles.value}>{data.phone}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.label}>Адрес доставки:</span>
          <span className={styles.value}>
            {data.zipCode}, {data.city}, {data.address}
          </span>
        </div>
      </div>

      <Button onClick={onReset} className={styles.resetButton} size="lg">
        Новый заказ
      </Button>
    </div>
  );
};
