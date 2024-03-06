'use client';
import React, { useMemo, useState } from 'react';
import FormSection from './form';
import Location from './location';
import WeatherSection from './weather';
import { endpoints } from '@/lib/endpoints';
import { TrafficCameraData } from '@/common/type/location';
import { ForecastData } from '@/common/type/weather';
import { cn } from '@/lib/utils';
import CameraSection from './camera';

const Listing = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isForecastFetching, setIsForecastFetching] = useState<boolean>(false);
  const [showForecast, setShowForecast] = useState<boolean>(false);
  const [dateTime, setDateTime] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [locationData, setLocationData] = useState<TrafficCameraData[]>([]);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);

  const selectedLocationData = useMemo(() => {
    if (selectedIndex === null) {
      return null;
    }
    return locationData[selectedIndex];
  }, [locationData, selectedIndex]);

  const onFetchLocation = async (dateTime: string) => {
    setIsFetching(true);
    const searchParams = new URLSearchParams({ dateTime });
    const resp = await fetch(`${endpoints.traffic}?${searchParams}`);
    const locationData = await resp.json();

    setLocationData(locationData);
    setForecastData([]);
    setShowForecast(false);
    setDateTime(dateTime);

    setTimeout(() => {
      setIsFetching(false);
    }, 1500);
  };

  const onSelectLocation = async (
    index: number,
    latitude: number,
    longitude: number
  ) => {
    setSelectedIndex(index);
    setIsForecastFetching(true);
    const searchParams = new URLSearchParams({
      dateTime,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    });
    const resp = await fetch(`${endpoints.weather}?${searchParams}`);
    const data: ForecastData[] = await resp.json();

    setForecastData(data);
    setShowForecast(true);

    setTimeout(() => {
      setIsForecastFetching(false);
    }, 1500);
  };

  return (
    <>
      <FormSection onFetchLocation={onFetchLocation} isFetching={isFetching} />
      <section>
        <div className='container py-6 border-b'>
          <Location
            locationData={locationData}
            forecastData={forecastData}
            selectedIndex={selectedIndex}
            isFetching={isFetching}
            isForecastFetching={isForecastFetching}
            showForecast={showForecast}
            onSelectLocation={onSelectLocation}
          />
        </div>
      </section>
    </>
  );
};

export default Listing;
