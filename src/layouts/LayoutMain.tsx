import SideBar from '@/layouts/SideBar';
import TopBar from '@/layouts/TopBar';
import React, { Fragment } from 'react';

interface ILayoutMainProps {
  children: React.ReactNode;
}
const LayoutMain = ({ children }: ILayoutMainProps) => {
  return (
    <Fragment>
      <TopBar />
      <div className='grid grid-cols-[250px_minmax(0,1fr)] min-h-screen'>
        <SideBar />
        <div className='px-6 py-7 bg-[#F4F4F4]'>{children}</div>
      </div>
    </Fragment>
  );
};

export default LayoutMain;
