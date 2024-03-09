'use client';

import Banner from '@/components/sections/banner';
import Listing from '@/components/sections/listing';
import { SessionProvider } from 'next-auth/react';

export default function Home() {
  return (
    <SessionProvider>
      <Banner />
      <Listing />
    </SessionProvider>
  );
}
