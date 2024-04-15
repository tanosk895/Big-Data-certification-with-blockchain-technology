import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketsGateway } from './gateway/websockets.gateway';
import { fireflyModule } from './firefly/firefly.module';
import { MerkleTreeModule } from './MerkleTree/merkletree.module';
import { MerkleTreeService } from './MerkleTree/merkletree.service';
;import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({
    dest: './video', // Directory di destinazione per i file caricati
  }),fireflyModule],
  controllers: [AppController, ],
  providers: [AppService, WebsocketsGateway],
})

export class AppModule {
  constructor(private readonly appService: AppService) {
      this.appService.sensorActiveTransactionMinute();
      this.appService.getAllDataCertificated()
  } 
}
