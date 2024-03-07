import { ForecastData } from '@/common/type/weather';
import React from 'react';

const WeatherList = ({ data }: { data: ForecastData[] }) => {
  return (
    <>
      {data.map((x, key) => (
        <div className='flex justify-between text-slate-300 text-sm' key={key}>
          <span>{x.area}</span>
          <span>{x.forecast}</span>
        </div>
      ))}
    </>
  );
};

export default WeatherList;
