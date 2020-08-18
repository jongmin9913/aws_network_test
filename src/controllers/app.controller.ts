import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import { AppService } from '../sevices/app.service';
import { MyInfo } from 'src/models/MyInfo';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/my')
  public getMyInfo(): MyInfo {
    return this.appService.getMyInfo()
  }

  @Put('/my')
  public setMyInfo(@Body('newInfo') newInfo: MyInfo): MyInfo {
    return this.appService.setMyInfo(newInfo)
  }
}
