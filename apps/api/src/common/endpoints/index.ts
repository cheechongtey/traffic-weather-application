const endpoints = {
  geopifyReverseGeo: `https://api.geoapify.com/v1/batch/geocode/reverse?id=${process.env.GEOPIFY_API_TOKEN}`,
  trafficImage: `https://api.data.gov.sg/v1/transport/traffic-images`,
};

export default endpoints;
