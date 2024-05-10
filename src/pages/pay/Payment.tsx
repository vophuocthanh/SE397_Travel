import { Button } from '@/components/ui/button';
import Header from '@/pages/header/Header';
import { deleteProduct } from '@/redux/slice/cardSlice';
import { RootState } from '@/redux/store';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Payment() {
  const dispatch = useDispatch();
  const CartProducts = useSelector((state: RootState) => state.cart.CartArr);
  console.log('CartProducts:', CartProducts);

  const giaFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(CartProducts.reduce((total, product) => total + product.price, 0));
  return (
    <div>
      <Header className='flex items-center justify-between w-full px-10 mx-auto bg-gradient-to-r from-purple-600 via-red-300 to-yellow-500' />
      <h1 className='flex justify-center my-10 text-3xl font-bold'>Payment</h1>
      <div className='flex flex-col flex-wrap w-full mx-auto my-10 gap-14 max-w-7xl'>
        <h2 className='text-2xl'>
          Giỏ hàng của bạn hiện đang có{' '}
          <span className='font-bold text-red-500'>
            {CartProducts.length} sản phẩm{' '}
          </span>{' '}
        </h2>
        <div className='flex gap-16'>
          <div className='flex flex-col max-w-5xl space-y-4'>
            <div className='flex justify-between w-full max-w-4xl px-20 text-xl font-bold'>
              <p>Tên tour</p>
              <p>Số lượng</p>
              <p>Tổng tiền</p>
            </div>
            {CartProducts.map((product) => (
              <div
                className='flex justify-between items-center gap-4 px-4 py-2 mb-4 border rounded-md w-[60rem]'
                key={product.id}
              >
                <img
                  src={product.image}
                  alt='best trip'
                  className='object-cover h-40 border rounded-md w-[32rem]'
                />
                <h1 className='ml-[-20erm]'>
                  {product.name || product.location}
                </h1>
                <div className='flex ml-40 justify-between gap-2 pr-2 w-[30rem]'>
                  <span>x{product.quantity}</span>
                </div>
                <div className='flex gap-2 mr-20'>
                  <span>{giaFormatted}</span>
                  <X
                    className='text-white bg-red-500 rounded-lg cursor-pointer'
                    onClick={() => dispatch(deleteProduct(product.id))}
                  ></X>
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-col max-w-[24rem] p-4 mt-10 h-80 space-y-4 bg-gray-100 rounded-md'>
            <h1 className='text-2xl font-bold'>Tổng tiền trong giỏ hàng</h1>
            <div className='flex items-center gap-2 text-xl font-bold'>
              <h2>Tổng sản phẩm</h2>
              <span>{CartProducts.length}</span>
            </div>
            <div className='flex items-center gap-2'>
              <h2 className='text-gray-300 w-60'>Tổng tiền hàng</h2>
              <span className='font-bold'>
                $
                {CartProducts.reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <h2 className='text-gray-300 w-60'>Tổng thành tiền</h2>
              <span className='font-bold'>
                $
                {CartProducts.reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <h2 className='text-xl w-60'>Tạm tính</h2>
              <span className='font-bold'>
                $
                {CartProducts.reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )}
              </span>
            </div>

            <Link to='/payment/checkoutDetail'>
              <Button>Đặt hàng</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
