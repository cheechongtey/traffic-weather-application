import { ForecastData } from '@/common/type/weather';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';

const WeatherSection = ({
  isFetching,
  data,
  className,
}: {
  isFetching: boolean;
  data: ForecastData[];
  className?: string;
}) => {
  return (
    <Card className={cn('w-full md:max-w-[300px]', className)}>
      <CardContent className='p-4'>
        <h3 className='text-md font-bold mb-4'>Weather Forecast</h3>
        <div className=''>
          {data.map((x) => (
            <div className='flex justify-between text-slate-300 text-sm'>
              <span>{x.area}</span>
              <span>{x.forecast}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherSection;
