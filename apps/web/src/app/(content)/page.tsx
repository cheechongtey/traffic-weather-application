import Banner from '@/components/sections/banner';
import Features from '@/components/sections/features';
import Listing from '@/components/sections/listing';

export default async function Home() {
  return (
    <>
      <Banner />
      <Listing />
      <Features />
    </>
  );
}
