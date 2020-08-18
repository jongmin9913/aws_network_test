import { Injectable } from '@nestjs/common';
import { MemoryRepository } from 'src/repositories/MemoryRepository';
import { MyInfo } from 'src/models/MyInfo';
const dig = require('node-dig-dns')

@Injectable()
export class AppService {
  constructor(
    private readonly memory: MemoryRepository
  ){

  }

  public setMyInfo(newInfo: MyInfo): MyInfo {
    this.memory.setInfo(newInfo)
    return this.memory.getInfo()
  }

  public getMyInfo(): MyInfo {
    return this.memory.getInfo()
  }

  public async executeDig(args: string[], options: { raw?: boolean, dig?: string }): Promise<any> {
    return dig(args, options)
  }
}
