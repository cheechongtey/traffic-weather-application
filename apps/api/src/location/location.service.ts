import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  async getTrafficLocation(): Promise<any> {
    try {
      const resp = await fetch(
        'https://api.data.gov.sg/v1/transport/traffic-images',
        {
          body: JSON.stringify({ date_time: '2024-01-01 14:30:00' }),
        },
      );
      console.log(resp.ok);
      if (!resp.ok) {
        throw new Error('Failed to fetch traffic images');
      }
      const data = await resp.json();
      console.log(data);
      // Store into cache
      return data;
    } catch (error) {
      console.error(error);
      // Loggging and send to sentry
    }
  }
}
