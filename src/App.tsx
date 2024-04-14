import useRoutesElements from '@/hooks/useRoutesElements';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialOptions = {
  clientId: 'test',
  currency: 'USD',
  intent: 'capture',
};

function App() {
  const routerDom = useRoutesElements();
  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className='w-full mx-auto'>{routerDom}</div>;
    </PayPalScriptProvider>
  );
}

export default App;
