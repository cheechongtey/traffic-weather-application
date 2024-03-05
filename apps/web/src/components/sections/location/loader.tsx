import { Loader2 } from 'lucide-react';
import React from 'react';

const LocationLoader = () => {
  return (
    <section>
      <div className='container py-6 border-b'>
        <h3 className='text-xl font-bold mb-6'>Popular Locations</h3>
        <Loader2 className='mr-2 h-8 w-8 animate-spin' />
      </div>
    </section>
  );
};

export default LocationLoader;
