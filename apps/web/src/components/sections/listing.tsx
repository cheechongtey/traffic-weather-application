'use client';
import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import FormSection from './form';
import Location from './location';
import { TrafficCameraData } from '@/common/type/location';
import { ForecastData } from '@/common/type/weather';
import Report from './report';
import { ReportData } from '@/common/type/report/type';
import {
  onFetchLocationApi,
  onFetchReportApi,
  onFetchWeatherApi,
} from '@/actions/api';

const DEFAULT_DATE_TIME = dayjs('2024-02-29 00:00:00').toDate();

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
  const [isSuggestMode, setIsSuggestMode] = useState<boolean>(false);
  const [suggestedDate, setSuggestedDate] = useState<string>('');

  const selectedLocationData = useMemo(() => {
    if (selectedIndex === null) {
      return null;
    }
    return locationData[selectedIndex];
  }, [locationData, selectedIndex]);

  const onFetchLocation = async (dateTime: string) => {
    setIsFetching(true);
    const resp = await onFetchLocationApi(dateTime);
    const isSuggestMode = resp.status && resp.status === 202;

    setLocationData(resp.locationData ?? []);
    setIsSuggestMode(isSuggestMode);
    setSuggestedDate(resp.dateTime);
    setForecastData([]);
    setShowForecast(false);
    setDateTime(dateTime);

    if (isSuggestMode) {
      onFetchReport(resp.dateTime);
    }

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
    setIsSuggestMode(false);
    setSuggestedDate('');

    onFetchLocation(dateTime);
    onFetchReport(dateTime);
  };

  useEffect(() => {
    const formattedDate = dayjs(DEFAULT_DATE_TIME).format('YYYY-MM-DD');
    const formattedTime = dayjs(DEFAULT_DATE_TIME).format('HH:mm:ss');
    const dateTime = formattedDate + 'T' + formattedTime;

    onFetchLocation(dateTime);
    onFetchReport(dateTime);
  }, []);

  return (
    <>
      <FormSection
        isFetching={isFetching}
        defaultDateTime={DEFAULT_DATE_TIME}
        onFormSubmitCallback={onFormSubmitCallback}
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
            isSuggestMode={isSuggestMode}
            suggestedDate={suggestedDate}
            onSelectLocation={onSelectLocation}
          />
        </div>
      </section>
      <Report data={reportData} isFetching={isFetchingReport} />
    </>
  );
};

export default Listing;
