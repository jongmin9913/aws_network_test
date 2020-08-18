import { Controller, Get, Post, Put, Body, Query, Headers, Request as Req } from '@nestjs/common';
import { AppService } from '../sevices/app.service';
import { MyInfo } from 'src/models/MyInfo';
import { DigResult } from 'src/models/DigResult';
import { Ping } from 'src/models/Ping';
import { SendPing } from 'src/models/SendPing';
import Axios from 'axios';
import { Request } from 'express';

@Controller()
export class AppController {
  private readonly axiosClient = Axios.create()
  constructor(private readonly appService: AppService) {}

  @Get('/my')
  public getMyInfo(): MyInfo {
    return this.appService.getMyInfo()
  }

  @Put('/my')
  public setMyInfo(@Body('newInfo') newInfo: MyInfo): MyInfo {
    return this.appService.setMyInfo(newInfo)
  }

  @Get('/dig')
  public async dig(@Query('args') args: string[], @Query('raw') raw?: string): Promise<DigResult>{
    const result = await this.appService.executeDig(args, { raw: raw === 'true' })
    const res = new DigResult()
    res.myInfo = this.appService.getMyInfo()
    res.result = result
    return res
  }

  @Post('/ping')
  public ping(@Body('client') client: MyInfo, @Headers() headers: string[], @Req() req: Request): Ping {
    const res = new Ping()
    res.client = client
    res.server = this.appService.getMyInfo()
    res.headers = headers
    res.remoteAddress = req.connection.remoteAddress
    return res
  }

  @Post('/send/ping')
  public async sendPing(@Body('target') target: SendPing): Promise<any> {
    const result = await this.axiosClient.post('target', this.appService.getMyInfo())
    return result.data
  }
}
