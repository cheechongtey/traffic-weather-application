import React from 'react';
import { Card, CardContent } from './card';

const LocationCard = ({ name, image, location, onClick }) => {
  return (
    <Card
      className='p-6 rounded-lg cursor-pointer hover:bg-secondary transition-all'
      onClick={onClick}
    >
      <CardContent className='p-0'>
        <p className='text-sm'>{name}</p>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
