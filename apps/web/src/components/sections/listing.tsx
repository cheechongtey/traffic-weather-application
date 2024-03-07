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
import Report from './report';
import { ReportData } from '@/common/type/report/type';
import {
  onFetchLocationApi,
  onFetchReportApi,
  onFetchWeatherApi,
} from '@/actions/api';

const Listing = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isForecastFetching, setIsForecastFetching] = useState<boolean>(false);
  const [isFetchingReport, setIsFetchingReport] = useState<boolean>(false);
  const [showForecast, setShowForecast] = useState<boolean>(false);
  const [dateTime, setDateTime] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [locationData, setLocationData] = useState<TrafficCameraData[]>([]);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const selectedLocationData = useMemo(() => {
    if (selectedIndex === null) {
      return null;
    }
    return locationData[selectedIndex];
  }, [locationData, selectedIndex]);

  const onFetchLocation = async (dateTime: string) => {
    setIsFetching(true);
    const locationData = await onFetchLocationApi(dateTime);

    setLocationData(locationData);
    setForecastData([]);
    setShowForecast(false);
    setDateTime(dateTime);

    setTimeout(() => {
      setIsFetching(false);
    }, 1500);
  };

  const onFetchReport = async (dateTime: string) => {
    setIsFetchingReport(true);
    const reportData = await onFetchReportApi(dateTime);

    setReportData(reportData);

    setTimeout(() => {
      setIsFetchingReport(false);
    }, 1500);
  };

  const onSelectLocation = async (
    index: number,
    latitude: number,
    longitude: number
  ) => {
    setSelectedIndex(index);
    setIsForecastFetching(true);
    const data = await onFetchWeatherApi(dateTime, latitude, longitude);

    setForecastData(data);
    setShowForecast(true);

    setTimeout(() => {
      setIsForecastFetching(false);
    }, 1500);
  };

  const onFormSubmitCallback = (dateTime: string) => {
    onFetchLocation(dateTime);
    onFetchReport(dateTime);
  };

  return (
    <>
      <FormSection
        onFormSubmitCallback={onFormSubmitCallback}
        isFetching={isFetching}
      />
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
      <Report data={reportData} isFetching={isFetchingReport} />
    </>
  );
};

export default Listing;
