import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ShoppingCart, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { deleteProduct } from '@/redux/slice/cardSlice';

export function PopoverCart() {
  const dispatch = useDispatch();
  const CartProducts = useSelector((state: RootState) => state.cart.CartArr);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className=''>
          <strong className='relative flex items-center justify-center w-6 h-6 text-center text-white bg-red-500 rounded-full left-4 top-2'>
            {CartProducts.length}
          </strong>
          <ShoppingCart className='w-6 h-6 text-white'></ShoppingCart>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <h1 className='mb-6 text-xl font-bold'>Your shopping cart</h1>
        <div className='table-responsive'>
          <table className='table'>
            <tbody>
              {CartProducts.map((product) => (
                <div
                  className='flex justify-between gap-4 px-4 py-2 border rounded-md w-72'
                  key={product.id}
                >
                  <div className='flex gap-2'>
                    <h1>{product.name}</h1>
                    <span>x{product.quantity}</span>
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
