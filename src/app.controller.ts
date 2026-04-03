import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { THEMES } from './stats/svg/theme';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHome();
  }

  @Get('themes')
    getThemes(){
        return THEMES
    }
}
