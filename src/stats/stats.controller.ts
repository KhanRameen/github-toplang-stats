import { BadRequestException, Controller, Get, InternalServerErrorException, Query, Res } from '@nestjs/common';
import { StatsService } from './stats.service';
import { SvgService } from './svg/svg.service';
import type { Response } from 'express';
import { ThemeName } from './svg/theme';

@Controller('stats')
export class StatsController {
    constructor(private statsService: StatsService, private svgService: SvgService  ){}

    @Get()
    async getStats(
        @Res({passthrough: true}) res: Response,
        @Query('username') username:string, 
        @Query('theme') theme?: string,
        @Query('hide') hide?: string,
    ){
        if(!username){
            throw new BadRequestException('Username is Required')
        }
        const hiddenLangs=hide? hide.split(',').map((lang)=>lang.trim().toLowerCase()) : []
        
        const raw = await this.statsService.getLanguageStats(username, hiddenLangs)
        if(!raw){
            throw new InternalServerErrorException("Failed to calculate stats")
        }

        const stats = raw
        const safeTheme: ThemeName | undefined = theme as ThemeName 

        const svg = this.svgService.generate(username, stats, safeTheme)

        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'public, max-age=43,200') //12hrs    
        res.send(svg?? "")
    }
}
