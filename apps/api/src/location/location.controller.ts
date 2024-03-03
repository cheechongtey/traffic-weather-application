import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { LocationService } from './location.service';
import { Response } from 'express';

@Controller('location')
export class LocationController {
  constructor(private service: LocationService) {}

  @Get('/')
  async getTrafficLocation(@Req() req: Request, @Res() res: Response) {
    const resp = await this.service.getTrafficLocation();

    return res.status(HttpStatus.OK).json(resp);
  }
}
