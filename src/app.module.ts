import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatsModule } from './stats/stats.module';
import { ConfigModule } from '@nestjs/config';
import {  StandardResponseModule } from 'nest-standard-response';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StandardResponseModule.forRoot(),
    StatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
