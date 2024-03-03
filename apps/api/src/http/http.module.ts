import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { HttpModule as BaseHttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    // I prefer temporarily aliasing the homonymous module rather than naming my module MyHttpModule
    BaseHttpModule,
  ],
  exports: [BaseHttpModule],
})
export class HttpModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  public onModuleInit(): any {
    const logger = new Logger('Axios');

    // Add request interceptor and response interceptor to log request infos
    const axios = this.httpService.axiosRef;
    axios.interceptors.request.use(function (config) {
      config['metadata'] = { ...config['metadata'], startDate: new Date() };
      return config;
    });
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        logger.log('====== Start Error ======');
        if (err.isAxiosError) {
          err.message = err.response?.data?.message ?? '';
        }
        // err.message =
        logger.log('====== End Error ======');

        // Don't forget this line like I did at first: it makes your failed HTTP requests resolve with "undefined" :-(
        return Promise.reject(err);
      },
    );
  }
}
