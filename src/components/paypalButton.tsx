import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

interface PaypalButtonInterface {
  totalValue: string;
  invoice: string;
  onSuccess: () => void;
}

const PaypalButton: React.FC<PaypalButtonInterface> = (props) => {
  const handlePaymentSuccess = () => {
    props.onSuccess();
  };
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: props.invoice,
              amount: {
                value: props.totalValue,
                currency_code: "USD",
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order?.capture();
        console.log("order", order);
        handlePaymentSuccess();
      }}
    />
  );
};

export default PaypalButton;
