import { ForecastData } from '@/common/type/weather';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';
import WeatherList from './list';

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
    <Card className={cn('w-full md:flex-[0_0_250px] h-fit', className)}>
      <CardContent className='p-6'>
        <h3 className='text-md font-bold mb-4'>Weather Forecast</h3>
        <div>
          {isFetching ? (
            <Loader2 className='w-4 h-4 animate-spin' />
          ) : (
            <>
              {data.length !== 0 ? (
                <WeatherList data={data} />
              ) : (
                <p className='text-xs'>
                  Click on the location to show weather forecast
                </p>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherSection;
