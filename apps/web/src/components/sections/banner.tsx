import React from 'react';
import { DatePicker } from '../ui/date-picker';

const Banner = () => {
  return (
    <section>
      <div className='container py-10 border-b'>
        <h1 className='text-md font-semibold uppercase mb-6 text-blue-500'>
          Traffic Cam + Weather Forecast Data Portal
        </h1>
        <h2 className='font-extrabold text-3xl mb-4'>Dashboards</h2>
        <p className='lg:w-8/12 text-slate-400'>
          Your one-stop interface to explore data-driven insights and analytics
          on all areas of the public sector, powered by the data made open on
          this site.
        </p>
      </div>
    </section>
  );
};

export default Banner;
