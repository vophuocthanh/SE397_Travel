import { Link } from 'react-router-dom';
import logo from '@/assets/logo/logo_Sigup.png';
import { Input } from '@/components/ui/input';

const TopBar = () => {
  return (
    <div className='flex items-center justify-between px-5 py-4 bg-[#FCFCFC]'>
      <div className='flex items-center gap-[82px] flex-1'>
        <Logo />
        <Input
          className='w-[300px] bg-[#F4F4F4] outline-none'
          placeholder='Search...'
        />
      </div>
      <User />
    </div>
  );
};

function Logo() {
  return (
    <Link to='/' className='flex items-center gap-4'>
      <img src={logo} alt='logo' className='object-cover w-16 h-16' />
    </Link>
  );
}

function User() {
  return (
    <div className='flex items-center flex-shrink-0 gap-5'>
      <span className='flex-shrink-0'></span>
      <div className='flex items-center gap-[10px] flex-shrink-0'>
        <img
          src='https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
          alt='avatar'
          width={40}
          height={40}
          className='object-cover w-10 h-10 rounded-full'
        ></img>
        <div className='flex flex-col'>
          <h4 className='font-semibold'>Hawkins Maru</h4>
          <span className='text-[#808191] '>Company Manager</span>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
