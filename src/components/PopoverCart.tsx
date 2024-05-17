import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ShoppingCart, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { deleteProduct } from '@/redux/slice/cardSlice';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export function PopoverCart() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const CartProducts = useSelector((state: RootState) => state.cart.CartArr);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='mb-[23px]'>
          <strong className='relative flex items-center justify-center w-6 h-6 text-center text-white bg-red-500 rounded-full left-4 top-2'>
            {CartProducts.length}
          </strong>
          <ShoppingCart className='w-6 h-6 mr-8 text-white'></ShoppingCart>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <h1 className='mb-6 text-xl font-bold'>{t("Cart")}  </h1>
        {CartProducts.length === 0 ? (
          <p className='text-center'>{t("No products in the cart")}</p>
        ) : (
          <div className='flex flex-col space-y-2'>
            <table>
              <tbody>
                {CartProducts.map((product) => (
                  <div
                    className='flex justify-between gap-4 px-4 py-2 mb-4 border rounded-md w-72'
                    key={product.id}
                  >
                    <div className='flex justify-between gap-2 pr-2 border-r-2 w-60'>
                      <div className='flex gap-2'>
                        <h1 className='textCard'>
                          {product.name || product.location}
                        </h1>
                        <span>x{product.quantity}</span>
                      </div>
                      <span>${product.price * product.quantity}</span>
                    </div>
                    <X
                      className='text-white bg-red-500 rounded-lg cursor-pointer'
                      onClick={() => dispatch(deleteProduct(product.id))}
                    ></X>
                  </div>
                ))}
              </tbody>
            </table>
            <div className='flex items-center justify-between'>
              <h1 className='font-bold'>
                Total: $
                {CartProducts.reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )}
              </h1>
              <Link
                to='/payment/checkout'
                className='px-6 py-2 bg-white rounded-3xl hover:text-blue-400'
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
