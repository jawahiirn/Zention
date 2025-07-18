import { Navbar } from './_components/navbar';
import React from 'react';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'h-full'}>
      <Navbar />
      <main className={'h-full pt-2'}>{children}</main>
    </div>
  );
};
export default MarketingLayout;
