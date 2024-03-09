import { AllExceptionsFilter } from './all-exceptions.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Test } from '@nestjs/testing';

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  let httpAdapterHost: HttpAdapterHost;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AllExceptionsFilter,
        {
          provide: HttpAdapterHost,
          useValue: {
            httpAdapter: {
              getRequestUrl: jest.fn(),
              reply: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    filter = moduleRef.get<AllExceptionsFilter>(AllExceptionsFilter);
    httpAdapterHost = moduleRef.get<HttpAdapterHost>(HttpAdapterHost);
  });

  it('should catch HttpException and set the response', () => {
    const exception = new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const host = {
      switchToHttp: () => ({
        getRequest: () => ({}),
        getResponse: () => ({}),
      }),
    };

    filter.catch(exception, host as any);

    expect(httpAdapterHost.httpAdapter.reply).toHaveBeenCalled();
  });

  it('should catch AxiosError and set the response', () => {
    const exception = {
      response: {
        status: 404,
      },
      message: 'Not Found',
    } as AxiosError;
    const host = {
      switchToHttp: () => ({
        getRequest: () => ({}),
        getResponse: () => ({}),
      }),
    };

    filter.catch(exception, host as any);

    expect(httpAdapterHost.httpAdapter.reply).toHaveBeenCalled();
  });
});
