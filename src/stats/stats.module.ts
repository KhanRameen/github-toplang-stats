import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { GithubService } from './github/github.service';
import { SvgService } from './svg/svg.service';

@Module({
  controllers: [StatsController],
  providers: [StatsService, GithubService, SvgService]
})
export class StatsModule {}
