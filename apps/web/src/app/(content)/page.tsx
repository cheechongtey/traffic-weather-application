import Banner from '@/components/sections/banner';
import Features from '@/components/sections/features';
import Form from '@/components/sections/form';
import Location from '@/components/sections/location';

export default async function Home() {
  return (
    <>
      <Banner />
      <Form />
      <Location />
      <Features />
    </>
  );
}
