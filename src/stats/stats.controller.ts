import { BadRequestException, Controller, Get, InternalServerErrorException, Query, Res } from '@nestjs/common';
import { StatsService } from './stats.service';
import { SvgService } from './svg/svg.service';
import type { Response } from 'express';

@Controller('stats')
export class StatsController {
    constructor(private statsService: StatsService, private svgService: SvgService  ){}

    @Get()
    async getStats(@Query('username') username:string,  @Res({passthrough: true}) res: Response ){
        if(!username){
            throw new BadRequestException('Username is Required')
        }

        const raw = await this.statsService.getLanguageStats(username)
        if(!raw){
            throw new InternalServerErrorException("Failed to calculate stats")
        }

        const stats = raw

        const svg = this.svgService.generate(username, stats)

        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svg)

    }
}
