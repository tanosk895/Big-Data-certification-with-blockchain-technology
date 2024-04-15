import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from './firefly.service';

@Module({
  imports: [HttpModule],
  providers: [ApiService],
  exports: [ApiService],
})
export class fireflyModule {}