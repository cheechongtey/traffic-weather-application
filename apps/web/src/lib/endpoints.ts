const API_HOST = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const endpoints = {
  traffic: `${API_HOST}/api/location`,
  weather: `${API_HOST}/api/weather`,
  report: `${API_HOST}/api/search-history`,
};
