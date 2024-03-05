'use client';
import React, { Suspense, useState } from 'react';
import FormSection from './form';
import Location from './location';
import LocationLoader from './location/loader';

const Listing = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [dateTime, setDateTime] = useState<string>('');

  return (
    <>
      <FormSection onChangeDateTime={setDateTime} isFetching={isFetching} />
      <Suspense fallback={<LocationLoader />}>
        <Location dateTime={dateTime} />
      </Suspense>
    </>
  );
};

export default Listing;
