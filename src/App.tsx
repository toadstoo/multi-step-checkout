import { CheckoutForm } from './features/checkout/CheckoutForm';
import './shared/styles/main.scss';

function App() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '1rem'
    }}>
      <CheckoutForm />
    </div>
  );
}

export default App;

