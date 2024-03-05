'use client';
import React, { useState } from 'react';
import FormSection from './form';
import Location from './location';
import { TrafficCameraData } from '@/common/type/location';
import { endpoints } from '@/lib/endpoints';

const Listing = () => {
  const [locationData, setLocationData] = useState<TrafficCameraData[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const onFetchLocation = async (dateTime: string) => {
    setIsFetching(true);
    const searchParams = new URLSearchParams({ dateTime });
    const resp = await fetch(`${endpoints.traffic}?${searchParams}`);
    setIsFetching(false);
    const data: TrafficCameraData[] = await resp.json();

    setLocationData(data);
  };

  return (
    <>
      <FormSection onFetchLocation={onFetchLocation} isFetching={isFetching} />
      <Location locationData={locationData} />
    </>
  );
};

export default Listing;
