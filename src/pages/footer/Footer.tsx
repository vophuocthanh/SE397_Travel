import logo from '@/assets/logo/logo-home.png';
import SectionInViewUp from '@/components/SectionInViewUp';
import { Facebook} from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Youtube } from 'lucide-react';
import { Phone } from 'lucide-react';
import { MailCheck } from 'lucide-react';
import { Search } from 'lucide-react';
import cn1 from '@/assets/images/footer1.webp';
import cn2 from '@/assets/images/footer2.webp';
import visa from '@/assets/images/visa.png';
import paypal from '@/assets/images/paypal.png';
import { useTranslation } from "react-i18next";

const Footer = () => {
  const {t} = useTranslation();
  return (
    <div className='pt-[3rem] bg-slate-200'>
      <div className='mx-auto mb-20 max-w-7xl'>
        <div className="lg:flex text-left justify-normal lg:gap-x-[8rem] ">
          <div className="lg:ml-[7rem] w-65 lg:block ml-[2rem]">
            <h1 className="mb-4 text-2xl font-bold text-black">{t("domestic")} </h1>
            <ul className='grid grid-cols-2 gap-4 pt-2'>
              <li>Hà Nội</li>
              <li>Phan Thiết</li>
              <li>Hạ Long</li>
              <li>Bà Rịa - Vũng Tàu</li>
              <li>Huế</li>
              <li>Phú Quốc</li>
              <li>Quảng Bình</li>
              <li>Cần Thơ</li>
              <li>Đà Nẵng</li>
              <li>Hà Tiên</li>
              <li>Quảng Nam</li>
              <li>Bắc Kạn</li>
              <li>Nha Trang</li>
              <li>Hà Giang</li>
              <li>Đà Lạt</li>
              <li>Côn Đảo</li>
            </ul>
          </div>
          <div className='ml-[2rem] flex mt-5 lg:mt-0'>
          <div className="lg:mr-[7rem] w-45 lg:w-60 mr-[1rem]">
            <h1 className="mb-4 text-xl font-semibold text-black">{t("foreign")} </h1>
            <ul className='grid grid-cols-2 gap-4 pt-2'>
              <li>Trung Quốc</li>
              <li>Ấn Độ</li>
              <li>Thái Lan</li>
              <li>Nga</li>
              <li>Malaysia</li>
              <li>Philippines</li>
              <li>Singapore</li>
              <li>Brazil</li>
              <li>Hàn Quốc</li>
              <li>Na Uy</li>
              <li>Úc</li>
              <li>Tây Ban Nha</li>
              <li>Mỹ - Hoa Kỳ</li>
              <li>Hà Lan</li>
              <li>Nhật Bản</li>
              <li>Đức</li>
            </ul>
          </div>
          <div>
            <h1 className="mb-4 text-xl font-semibold text-black">{t("Tour_line")}  </h1>
            <ul className='grid gap-4 pt-2'>
              <li>Cao cấp</li>
              <li>Tiêu chuẩn</li>
              <li>Tiết kiệm</li>
              <li>Giá tốt</li>
            </ul>
            <h1 className="mt-2 mb-4 text-xl font-semibold text-black">{t("Retail_service")}   </h1>
            <ul className='grid gap-4'>
              <li>Vé máy bay</li>
              <li>Khách sạn</li>
              <li>Combo du lịch</li>
            </ul>
          </div>
          </div>
        </div>
        <div className='mt-4 text-center lg:text-left lg:flex justify-normal'>
        <div className='lg:ml-[7rem] lg:w-60 lg:block w-full  '>
            <h1 className="mb-4 text-xl font-semibold text-black">{t("Contact")}  </h1>
            <ul className='grid gap-4 pt-2'>
              <li>(+84) 0386725641</li>
              <li>(+84) 0399931256</li>
              <li>cskhtour2024@gmail.com</li>
            </ul>
            <h1 className="mt-5 mb-4 text-xl font-semibold text-black">{t("Social_network")} </h1>
           <div className='flex justify-center gap-6 mx-auto'>
            <div className="mb-6 text-blue-500 "> <Facebook className="w-10 h-10"  /></div>
            <div className="mb-6 text-blue-500"> <Instagram  className="w-10 h-10"  /></div>
            <div className="mb-6 text-blue-500"> <Youtube className="w-10 h-10"  /></div>
           </div>
           <div className='flex justify-center p-2 mb-2 text-white bg-red-500 rounded-lg border-5 gap-x-5 w-[15rem] mx-0 items-center ml-[20%] mr-[20%] lg:ml-0'>
              <div className="flex justify-center mx-0 "> <Phone className="w-10 h-10"/></div>
              <h1 className='mx-0 text-xl font-bold'>1900 1839</h1>
           </div>
            <p>Từ 8:00 - 22:00 hàng ngày</p>
        </div>
        <div className='mt-5 lg:ml-auto lg:mt-0'>
            <h1 className="mb-4 text-xl font-semibold text-black">{t("Information")}  </h1>
            <ul className='grid gap-4 pt-2'>
              <li>Tạp chí du lịch</li>
              <li>Cẩm nang du lịch</li>
              <li>Tin tức</li>
              <li>Sitemap</li>
              <li>FAQs</li>
              <li>Chính sách riêng tư</li>
              <li>Thảo thuận sử dụng</li>
            </ul>
        </div>
        <div className='lg:block ml-auto mr-[2rem]'>
        <h1 className="mb-4 text-xl font-semibold text-black">Email</h1>
          <div className='flex mb-[2rem] ml-[2rem] lg:ml-0'>
            <input type="text" name="EmailRegister" id="" placeholder="Email của Quý khách" className='rounded-lg w-[20rem] h-10 mt-2 rounded-md border border-input bg-background px-3 py-2 text-sm   '/>
            <button className="mt-2.5 ml-2.5 "> < MailCheck className="w-8 h-8"  /></button>
          </div>
          <h1 className="mb-4 text-xl font-semibold text-black">{t("search_information")} </h1>
          <div className='flex mb-4 ml-[2rem] lg:ml-0'>
            <input type="text" name="Search" id="" placeholder="Tour du lịch, điểm đến..." className='rounded-lg w-[20rem] h-10 mt-2 rounded-md border border-input bg-background px-3 py-2 text-sm   '/>
            <button className="mt-2.5 ml-2.5"> < Search className="w-8 h-8"  /></button>
          </div>
          <div className='flex justify-between mt-4 text-left gap-x-[2rem]'>
          <div className='ml-[1rem] lg:ml-0'>
            <h1 className="mb-4 text-xl font-semibold text-black">{t("Certification")}  </h1>
            <img src={cn1} className='mb-5 mt-7 '/>
             <img src={cn2} className='mb-3 '/>
          </div>
          <div>
            <h1 className="mb-4 text-xl font-semibold text-black">{t("Accept_payment")} </h1>
            <img src={visa} className='flex h-20 w-25'/>
            <img src={paypal} className='flex h-20 w-25'/>
          </div>
          </div>
        </div>
        </div>
      </div>
    
    <SectionInViewUp className='flex w-full space-y-2 bg-blue-500 gap-x-[2rem] mx-0 justify-center items-center flex-col lg:block lg:flex-row'>
      <img src={logo} alt='logo' className='object-cover w-16 h-16 text-blue-500 lg:ml-[10rem]' />
      <p className=' text-white lg:ml-[10rem]'>{t("Copyright")}</p>
    </SectionInViewUp>
    </div>);
};

export default Footer;
