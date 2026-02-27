import { BadRequestException, Controller, Get, InternalServerErrorException, Query, Res } from '@nestjs/common';
import { StatsService } from './stats.service';
import { json } from 'stream/consumers';

@Controller('stats')
export class StatsController {
    constructor(private statsService: StatsService){}

    @Get()
    async getStats(@Query('username') username:string){
        if(!username){
            throw new BadRequestException('Username is Required')
        }

        const stats = await this.statsService.getLanguageStats(username)
        if(!stats){
            throw new InternalServerErrorException("Failed to calculate stats")
        }

        return stats
    }
}
