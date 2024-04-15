import { Controller, Post } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('recompose')
  ricomponiVideo() {
    const directoryPath = './chunks'; // Directory contenente i chunk del video
    const fileName = 'video'; // Nome del file del video
    const outputFile = 'video_originale.mp4'; // Nome del file del video originale

  //  this.videoService.ricomponiVideo(directoryPath, fileName, outputFile);
    return { message: 'Video ricomposto con successo' };
  }
}