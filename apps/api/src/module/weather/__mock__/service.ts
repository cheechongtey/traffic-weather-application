import { WeatherApiResponse } from '../type/weather-api.type';

export const weatherApiMockData: WeatherApiResponse = {
  area_metadata: [
    {
      name: 'Ang Mo Kio',
      label_location: {
        latitude: 1.375,
        longitude: 103.839,
      },
    },
    {
      name: 'Bedok',
      label_location: {
        latitude: 1.321,
        longitude: 103.924,
      },
    },
    {
      name: 'Bishan',
      label_location: {
        latitude: 1.350772,
        longitude: 103.839,
      },
    },
  ],
  items: [
    {
      update_timestamp: '2024-01-01T01:04:33+08:00',
      timestamp: '2024-01-01T01:00:00+08:00',
      valid_period: {
        start: '2024-01-01T01:00:00+08:00',
        end: '2024-01-01T03:00:00+08:00',
      },
      forecasts: [
        {
          area: 'Ang Mo Kio',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Bedok',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Bishan',
          forecast: 'Fair (Night)',
        },
      ],
    },
  ],
  api_info: {
    status: 'healthy',
  },
};

export const fullApiMockFeb29: WeatherApiResponse = {
  area_metadata: [
    {
      name: 'Ang Mo Kio',
      label_location: {
        latitude: 1.375,
        longitude: 103.839,
      },
    },
    {
      name: 'Bedok',
      label_location: {
        latitude: 1.321,
        longitude: 103.924,
      },
    },
    {
      name: 'Bishan',
      label_location: {
        latitude: 1.350772,
        longitude: 103.839,
      },
    },
    {
      name: 'Boon Lay',
      label_location: {
        latitude: 1.304,
        longitude: 103.701,
      },
    },
    {
      name: 'Bukit Batok',
      label_location: {
        latitude: 1.353,
        longitude: 103.754,
      },
    },
    {
      name: 'Bukit Merah',
      label_location: {
        latitude: 1.277,
        longitude: 103.819,
      },
    },
    {
      name: 'Bukit Panjang',
      label_location: {
        latitude: 1.362,
        longitude: 103.77195,
      },
    },
    {
      name: 'Bukit Timah',
      label_location: {
        latitude: 1.325,
        longitude: 103.791,
      },
    },
    {
      name: 'Central Water Catchment',
      label_location: {
        latitude: 1.38,
        longitude: 103.805,
      },
    },
    {
      name: 'Changi',
      label_location: {
        latitude: 1.357,
        longitude: 103.987,
      },
    },
    {
      name: 'Choa Chu Kang',
      label_location: {
        latitude: 1.377,
        longitude: 103.745,
      },
    },
    {
      name: 'Clementi',
      label_location: {
        latitude: 1.315,
        longitude: 103.76,
      },
    },
    {
      name: 'City',
      label_location: {
        latitude: 1.292,
        longitude: 103.844,
      },
    },
    {
      name: 'Geylang',
      label_location: {
        latitude: 1.318,
        longitude: 103.884,
      },
    },
    {
      name: 'Hougang',
      label_location: {
        latitude: 1.361218,
        longitude: 103.886,
      },
    },
    {
      name: 'Jalan Bahar',
      label_location: {
        latitude: 1.347,
        longitude: 103.67,
      },
    },
    {
      name: 'Jurong East',
      label_location: {
        latitude: 1.326,
        longitude: 103.737,
      },
    },
    {
      name: 'Jurong Island',
      label_location: {
        latitude: 1.266,
        longitude: 103.699,
      },
    },
    {
      name: 'Jurong West',
      label_location: {
        latitude: 1.34039,
        longitude: 103.705,
      },
    },
    {
      name: 'Kallang',
      label_location: {
        latitude: 1.312,
        longitude: 103.862,
      },
    },
    {
      name: 'Lim Chu Kang',
      label_location: {
        latitude: 1.423,
        longitude: 103.717332,
      },
    },
    {
      name: 'Mandai',
      label_location: {
        latitude: 1.419,
        longitude: 103.812,
      },
    },
    {
      name: 'Marine Parade',
      label_location: {
        latitude: 1.297,
        longitude: 103.891,
      },
    },
    {
      name: 'Novena',
      label_location: {
        latitude: 1.327,
        longitude: 103.826,
      },
    },
    {
      name: 'Pasir Ris',
      label_location: {
        latitude: 1.37,
        longitude: 103.948,
      },
    },
    {
      name: 'Paya Lebar',
      label_location: {
        latitude: 1.358,
        longitude: 103.914,
      },
    },
    {
      name: 'Pioneer',
      label_location: {
        latitude: 1.315,
        longitude: 103.675,
      },
    },
    {
      name: 'Pulau Tekong',
      label_location: {
        latitude: 1.403,
        longitude: 104.053,
      },
    },
    {
      name: 'Pulau Ubin',
      label_location: {
        latitude: 1.404,
        longitude: 103.96,
      },
    },
    {
      name: 'Punggol',
      label_location: {
        latitude: 1.401,
        longitude: 103.904,
      },
    },
    {
      name: 'Queenstown',
      label_location: {
        latitude: 1.291,
        longitude: 103.78576,
      },
    },
    {
      name: 'Seletar',
      label_location: {
        latitude: 1.404,
        longitude: 103.869,
      },
    },
    {
      name: 'Sembawang',
      label_location: {
        latitude: 1.445,
        longitude: 103.818495,
      },
    },
    {
      name: 'Sengkang',
      label_location: {
        latitude: 1.384,
        longitude: 103.891443,
      },
    },
    {
      name: 'Sentosa',
      label_location: {
        latitude: 1.243,
        longitude: 103.832,
      },
    },
    {
      name: 'Serangoon',
      label_location: {
        latitude: 1.357,
        longitude: 103.865,
      },
    },
    {
      name: 'Southern Islands',
      label_location: {
        latitude: 1.208,
        longitude: 103.842,
      },
    },
    {
      name: 'Sungei Kadut',
      label_location: {
        latitude: 1.413,
        longitude: 103.756,
      },
    },
    {
      name: 'Tampines',
      label_location: {
        latitude: 1.345,
        longitude: 103.944,
      },
    },
    {
      name: 'Tanglin',
      label_location: {
        latitude: 1.308,
        longitude: 103.813,
      },
    },
    {
      name: 'Tengah',
      label_location: {
        latitude: 1.374,
        longitude: 103.715,
      },
    },
    {
      name: 'Toa Payoh',
      label_location: {
        latitude: 1.334304,
        longitude: 103.856327,
      },
    },
    {
      name: 'Tuas',
      label_location: {
        latitude: 1.294947,
        longitude: 103.635,
      },
    },
    {
      name: 'Western Islands',
      label_location: {
        latitude: 1.205926,
        longitude: 103.746,
      },
    },
    {
      name: 'Western Water Catchment',
      label_location: {
        latitude: 1.405,
        longitude: 103.689,
      },
    },
    {
      name: 'Woodlands',
      label_location: {
        latitude: 1.432,
        longitude: 103.786528,
      },
    },
    {
      name: 'Yishun',
      label_location: {
        latitude: 1.418,
        longitude: 103.839,
      },
    },
  ],
  items: [
    {
      update_timestamp: '2024-02-29T00:05:32+08:00',
      timestamp: '2024-02-29T00:00:00+08:00',
      valid_period: {
        start: '2024-02-29T00:00:00+08:00',
        end: '2024-02-29T02:00:00+08:00',
      },
      forecasts: [
        {
          area: 'Ang Mo Kio',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Bedok',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Bishan',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Boon Lay',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Bukit Batok',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Bukit Merah',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Bukit Panjang',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Bukit Timah',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Central Water Catchment',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Changi',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Choa Chu Kang',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Clementi',
          forecast: 'Fair (Night)',
        },
        {
          area: 'City',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Geylang',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Hougang',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Jalan Bahar',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Jurong East',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Jurong Island',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Jurong West',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Kallang',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Lim Chu Kang',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Mandai',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Marine Parade',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Novena',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Pasir Ris',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Paya Lebar',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Pioneer',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Pulau Tekong',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Pulau Ubin',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Punggol',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Queenstown',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Seletar',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Sembawang',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Sengkang',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Sentosa',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Serangoon',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Southern Islands',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Sungei Kadut',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Tampines',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Tanglin',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Tengah',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Toa Payoh',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Tuas',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Western Islands',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Western Water Catchment',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Woodlands',
          forecast: 'Fair (Night)',
        },
        {
          area: 'Yishun',
          forecast: 'Fair (Night)',
        },
      ],
    },
  ],
  api_info: {
    status: 'healthy',
  },
};

export const getWeatherForecastResponse = [
  {
    area: 'Bedok',
    forecast: 'Fair (Night)',
  },
  {
    area: 'Ang Mo Kio',
    forecast: 'Fair (Night)',
  },
];

export const apiDateTime = '2024-02-29T00:00:00';
export const apiLocation = {
  latitude: 1.29531332,
  longitude: 103.871146,
};
