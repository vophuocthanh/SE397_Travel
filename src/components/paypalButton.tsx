import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

interface PaypalButtonInterface {
  totalValue: string;
  invoice: string;
  onSuccess: () => void;
}

const PaypalButton: React.FC<PaypalButtonInterface> = (props) => {
  const [orderId, setOrderId] = useState<string | null>(null);

  const handlePaymentSuccess = () => {
    props.onSuccess();
  };

  return (
    <div>
      {orderId && <p>Đã đặt hàng thành công với ID đơn hàng: {orderId}</p>}
      <PayPalButtons
        createOrder={(_data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: props.invoice,
                amount: {
                  value: props.totalValue,
                  currency_code: 'USD',
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order?.capture();
          const orderId = order?.id;
          console.log('orderId:', orderId);
          setOrderId(orderId ?? null);
          handlePaymentSuccess();
        }}
      />
    </div>
  );
};

export default PaypalButton;
