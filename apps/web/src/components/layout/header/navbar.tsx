'use client';

import Image from 'next/image';
import Link from 'next/link';
export default function Navbar({
  headerText,
}: {
  headerText: {
    forecast: string;
    report: string;
    [key: string]: string;
  };
}) {
  return (
    <nav className='flex h-full items-center justify-between'>
      <Link href='/' className='flex items-center text-2xl font-bold'>
        <Image
          src='/chad-next.png'
          alt='ChadNext logo'
          width='30'
          height='30'
          className='mr-2 rounded-sm object-contain'
        />
        <p>ChadNext</p>
      </Link>
    </nav>
  );
}
