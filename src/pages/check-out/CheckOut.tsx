import { useSelector } from "react-redux";
import payment from "../../assets/images/checkout/payment.svg";
import { RootState } from "@/redux/store";
import PaypalButton from "@/components/paypalButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearCart } from "@/redux/slice/cardSlice";
import { useDispatch } from "react-redux";


const CheckOut = () => {
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const dispatch = useDispatch();
  const CartProducts = useSelector((state: RootState) => state.cart.CartArr);
  console.log("CartProducts:", CartProducts);
  const total = CartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  useEffect(() => {
    if (paymentSuccess) {
      navigate("/payment/checkout");
      toast.success("Payment successfully!");
      dispatch(clearCart());
    }
  }, [paymentSuccess, navigate, dispatch]);

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
  };

  return (
    <div className="grid h-full max-h-screen grid-cols-10 gap-6 p-8 overflow-y-auto">
      <div className="flex items-center justify-center w-full col-span-4">
        <img src={payment} alt="payment" className="h-[70%] object-contain" />
      </div>
      <div className="flex flex-col items-center w-full col-span-6 gap-6">
        <h2 className="text-2xl font-bold">Check Out Your Order </h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 border ">
              <th className="p-2 text-center">Tour</th>
              <th className="p-2 text-center">Quantity</th>
              <th className="p-2 text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {CartProducts?.map((element) => (
              <tr key={element.id} className="text-center border">
                <td>{element.name}</td>
                <td>{element.quantity}</td>
                <td>{element.price} $</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>input address</div>
        <div>
          <PaypalButton
            totalValue={total.toString()}
            invoice={"Hanoi"}
            onSuccess={handlePaymentSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
