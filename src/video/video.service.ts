import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VideoService {
  constructor() {}

  ricomponiESalvaVideo(directoryPath: string, fileName: string, outputFile: string, outputDirectory: string) {
    const chunkFiles = fs.readdirSync(directoryPath).filter(file => file.startsWith(fileName));
    chunkFiles.sort((a, b) => {
      const seqA = parseInt(a.split('.')[1]);
      const seqB = parseInt(b.split('.')[1]);
      return seqA - seqB;
    });

    const chunkPaths = chunkFiles.map(chunk => path.join(directoryPath, chunk));
    const outputStream = fs.createWriteStream(outputFile);

    chunkPaths.forEach(chunkPath => {
      const chunkBuffer = fs.readFileSync(chunkPath);
      outputStream.write(chunkBuffer);
    });

    outputStream.end();

    const outputFilePath = path.join(outputDirectory, outputFile);
    fs.writeFileSync(outputFilePath, outputStream.toString(), 'base64'); // Salva il file sul disco

    console.log('Video salvato con successo:', outputFilePath);
    return outputFilePath;
  }
}