import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../sevices/app.service';
import { MemoryRepository } from 'src/repositories/MemoryRepository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    MemoryRepository
  ],
})
export class AppModule {}
