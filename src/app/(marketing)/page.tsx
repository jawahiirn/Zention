import { Heading } from '@/app/(marketing)/_components/heading';
import { Heroes } from '@/app/(marketing)/_components/heroes';
import { Footer } from '@/app/(marketing)/_components/footer';

const MarketingPage = () => {
  return (
    <div className={'min-h-full flex flex-col'}>
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
