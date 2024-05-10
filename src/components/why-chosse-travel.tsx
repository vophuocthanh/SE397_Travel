import { BadgeDollarSign } from "lucide-react";
import { RadioTower } from 'lucide-react';
import { UserCheck } from 'lucide-react';
import { PhoneForwarded } from 'lucide-react';
import { HandPlatter } from 'lucide-react';
import { HandCoins } from 'lucide-react';

export default function WhyChosseTravel() {
  return <div className='mx-auto mb-20 max-w-7xl '>
    <h2 className="mb-10 text-4xl font-semibold text-black">Vì sao chọn Tour</h2>
    <div>
      <div className="flex justify-between text-center">
        <div className="">
          <div className="flex justify-center mb-6 text-blue-500"> <RadioTower className="w-20 h-20"  /></div>
          <h4 className="mb-4 text-xl font-semibold text-black">Mạng bán tour</h4>
          <p className="mb-1">Đầu tiên tại Việt Nam</p>
          <p>Ứng dụng công nghệ mới nhất</p>
        </div>
        <div>
        <div className="flex justify-center mb-6 text-blue-500"> <BadgeDollarSign className="w-20 h-20"  /></div>
          <h4 className="mb-4 text-xl font-semibold text-black">Thanh toán</h4>
          <p>An toàn & linh hoạt</p>
        </div>
        <div>
        <div className="flex justify-center mb-6 text-blue-500"> <PhoneForwarded className="w-20 h-20"  /></div>
          <h4 className="mb-4 text-xl font-semibold text-black">Đặt tour</h4>
          <p>Dễ dàng & nhanh chóng chỉ với 3 bước</p>
        </div>
      </div>

      <div className="flex justify-between mt-10 text-center">
        <div>
        <div className="flex justify-center mb-6 text-blue-500"> <HandCoins className="w-20 h-20"  /></div>
          <h4 className="mb-4 text-xl font-semibold text-black">Giá cả</h4>
          <p>Luôn có mức giá tốt nhất</p>
        </div>
        <div>
        <div className="flex justify-center mb-6 text-blue-500"> <HandPlatter className="w-20 h-20"  /></div>
          <h4 className="mb-4 text-xl font-semibold text-black">Sản phẩm & Dịch vụ</h4>
          <p>Đa dạng – Chất lượng – An toàn</p>
        </div>
        <div>
        <div className="flex justify-center mb-6 text-blue-500"> <UserCheck className="w-20 h-20"  /></div>
          <h4 className="mb-4 text-xl font-semibold text-black">Hỗ trợ</h4>
          <p>Hotline & trực tuyến (08h00 - 22h00)</p>
        </div>
      </div>
    </div>
  </div>;
}
