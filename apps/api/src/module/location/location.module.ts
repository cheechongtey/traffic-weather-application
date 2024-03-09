import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { HttpModule } from '@nestjs/axios';
import { UpdateLocationCacheListener } from './listeners/update-location-cache.listener';
import { PrismaService } from '../persistence/prisma/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [LocationController],
  providers: [LocationService, UpdateLocationCacheListener, PrismaService],
})
export class LocationModule {}
