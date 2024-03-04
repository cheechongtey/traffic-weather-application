const endpoints = {
  geopifyReverseGeo: `https://api.geoapify.com/v1/batch/geocode/reverse?apiKey=${process.env.GEOPIFY_API_TOKEN}`,
  trafficImage: `https://api.data.gov.sg/v1/transport/traffic-images`,
  weatherForecast: `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast`,
};

export default endpoints;
