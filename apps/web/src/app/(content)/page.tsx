import Banner from '@/components/sections/banner';
import Features from '@/components/sections/features';
import Form from '@/components/sections/form';
import Pricing from '@/components/sections/pricing';

export default async function Home() {
  return (
    <>
      <Banner />
      <Form />
      <Features />
      <Pricing />
    </>
  );
}
