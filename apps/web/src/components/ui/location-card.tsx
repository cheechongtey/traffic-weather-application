import React from 'react';
import { Card, CardContent } from './card';
import { cn } from '@/lib/utils';

const LocationCard = ({
  name,
  onClick,
  className,
}: {
  name: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        'p-6 rounded-lg cursor-pointer hover:bg-secondary transition-all',
        className
      )}
      onClick={onClick}
    >
      <CardContent className='p-0'>
        <p className='text-sm'>{name}</p>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
