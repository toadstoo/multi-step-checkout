export interface CheckoutData {
  // Step 1: Personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Step 2: Shipping
  address: string;
  city: string;
  zipCode: string;
  
  // Step 3: Payment (Fake)
  cardNumber: string;
  expiryDate: string;
}

export const INITIAL_DATA: CheckoutData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zipCode: '',
  cardNumber: '',
  expiryDate: '',
};
