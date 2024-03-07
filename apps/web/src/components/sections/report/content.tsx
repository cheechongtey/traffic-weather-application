'use client';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { ReportData } from '@/common/type/report/type';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMemo } from 'react';

dayjs.extend(utc);

export function TabsDemo({ data }: { data: ReportData }) {
  const mostSearchedNumber = useMemo(() => {
    return data?.mostSearched?.search_count ?? 0;
  }, [data]);

  const mostSearchedFrom = useMemo(() => {
    if (!data?.mostSearched || !data?.mostSearched?.datetime) {
      return null;
    }
    return dayjs(data.mostSearched.datetime).utc().format('DD/MM/YYYY hh:mma');
  }, [data]);

  const mostSearchedTo = useMemo(() => {
    if (!data?.mostSearched || !data?.mostSearched?.datetime) {
      return null;
    }
    return dayjs(data.mostSearched.datetime)
      .add(1, 'hour')
      .utc()
      .format('DD/MM/YYYY hh:mma');
  }, [data]);
  return (
    <Tabs
      defaultValue='recent'
      className='w-full max-w-[500px] overflow-hidden'
    >
      <TabsList className='flex justify-normal w-full md:grid md:grid-cols-3 md:justify-center max-md:overflow-x-scroll'>
        <TabsTrigger value='recent'>Recent</TabsTrigger>
        <TabsTrigger value='top'>Top 10</TabsTrigger>
        <TabsTrigger value='most'>Most Searches</TabsTrigger>
      </TabsList>
      <TabsContent value='recent'>
        <Card>
          <CardHeader>
            <CardTitle>Most Recent Searches</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2 text-left mx-6'>
            <ol className='list-decimal'>
              {(data?.recentSearch ?? []).map((x) => (
                <li className='mb-2'>
                  <div className='font-semibold mb-1'>{x.location_name}</div>
                  <div className='text-xs italic'>
                    {dayjs(x.datetime).utc().format('DD/MM/YYYY hh:mma')}
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='top'>
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Search on </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2 text-left mx-6'>
            <ol className='list-decimal'>
              {(data?.topSearch ?? []).map((x) => (
                <li className='mb-2'>
                  <div className='font-semibold mb-1'>{x.location_name}</div>
                  <div className='text-xs italic'>
                    Total{' '}
                    <span className='font-semibold'>{x.search_count} </span>
                    search for{' '}
                    {dayjs(x.search_date).utc().format('DD/MM/YYYY hh:mma')}
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='most'>
        <Card>
          <CardHeader>
            <CardTitle>Most Performed Search </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2 text-left mx-6'>
            <p className='p-0'>
              {mostSearchedNumber} searches performed for {mostSearchedFrom} -{' '}
              {mostSearchedTo}
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
