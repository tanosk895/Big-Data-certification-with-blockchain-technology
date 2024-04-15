import { Body, Controller, Get, Param, Post, Render, Req, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import * as crypto from 'crypto-js'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import path = require('path');
import { createHash } from 'crypto';
const storage = diskStorage({
  destination: './video',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    cb(null, `${name}-${randomName}${extension}`);
  },
});
@Controller()
export class AppController {
  
  // Cartella temporanea per memorizzare i chunk
  private tempFolder = './video';
  constructor(private readonly appService: AppService) {
    // Crea la cartella temporanea se non esiste
    if (!fs.existsSync(this.tempFolder)) {
      fs.mkdirSync(this.tempFolder);
    }
  }
  @Get()
  @Render('home')
  root() {
    return { title: 'Home Page' };
  }

  @Get('/diga-real-time')
  @Render('diga-real-time')
  diga_real_time() {
    return { title: 'Controllo livello diga' };
  }

  @Get('/history-diga')
  @Render('history')
  history_diga() {
    return { title: 'storico' };
  }

  @Get('/controllo')
  @Render('controllo')
  async controllo() {
    return { title: 'Controllo certificazione dei dati'};
  }

  @Post('/check')
  async check(@Body() body) {
    const cry = crypto.SHA256(JSON.stringify(body)).toString();
    const resp = await this.appService.retriveData(cry);
    return { cert: resp };
  }

  // @Get('/video')
  // @Render('uploadVideo')
  // async video(){

  // }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Buffer[]) {

    async function calculateHashOfLastModifiedFile() {
    try {
      // Leggi tutti i file nella directory
      let directoryPath = "./video"
      const files = await fs.promises.readdir(directoryPath);

      // Trova l'ultimo file in base all'ultima modifica
      let lastFile;
      let lastModifiedTime;

      for (const file of files) {
          const filePath = path.join(directoryPath, file);
          const stats = await fs.promises.stat(filePath);
          if (!lastModifiedTime || stats.mtimeMs > lastModifiedTime) {
              lastModifiedTime = stats.mtimeMs;
              lastFile = file;
          }
      }

      if (!lastFile) {
          throw new Error('Nessun file trovato nella directory');
      }

      // Calcola l'hash SHA-256 del file
      const fileStream = require('fs').createReadStream(path.join(directoryPath, lastFile));
      const hash = createHash('sha256');

      fileStream.on('data', chunk => {
          hash.update(chunk);
      });

      return new Promise((resolve, reject) => {
          fileStream.on('end', () => {
              const digest = hash.digest('hex');
              resolve(digest);
          });
          fileStream.on('error', err => {
              reject(err);
          });
      });
  } catch (error) {
      throw error;
  }
}

  const hash = await calculateHashOfLastModifiedFile();
  console.log(hash);
  this.appService.retriveData(hash.toString());
  this.appService.uploadDataOnIpfs(file);
  return { certificazione : true, hash : hash} 
}

}