import { Injectable } from '@nestjs/common';
import { MyInfo } from 'src/models/MyInfo';

@Injectable()
export class MemoryRepository {
    private static myInfo = new MyInfo('none', 'none')
    public setInfo(newInfo: MyInfo) {
        MemoryRepository.myInfo = newInfo
    }
    public getInfo() {
        return MemoryRepository.myInfo
    }
}