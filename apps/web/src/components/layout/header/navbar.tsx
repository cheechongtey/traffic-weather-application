'use client';

import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
export default function Navbar({
  headerText,
}: {
  headerText: {
    forecast: string;
    report: string;
    [key: string]: string;
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <div className='hidden items-center gap-12 lg:flex 2xl:gap-16'>
        <div className='space-x-4 text-center text-md leading-loose text-muted-foreground md:text-left'>
          <Link
            href='/'
            className='font-semibold hover:underline hover:underline-offset-4'
          >
            {headerText.forecast}
          </Link>
          <Link
            href='/report'
            className='font-semibold hover:underline hover:underline-offset-4'
          >
            {headerText.report}
          </Link>
        </div>
      </div>
      <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
        <SheetTrigger className='lg:hidden'>
          <span className='sr-only'>Open Menu</span>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          <div className='flex flex-col items-center space-y-10 py-10'>
            <div className='space-y-4 text-center text-sm leading-loose text-muted-foreground'>
              <Link
                href='/'
                className='block font-semibold hover:underline hover:underline-offset-4'
                onClick={() => setIsModalOpen(false)}
              >
                {headerText.forecast}
              </Link>
              <Link
                href='/report'
                className='block font-semibold hover:underline hover:underline-offset-4'
                onClick={() => setIsModalOpen(false)}
              >
                {headerText.report}
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
