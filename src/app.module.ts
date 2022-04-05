import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumController } from './album/album.controller';
import { TrackController } from './track/track.controller';

@Module({
  imports: [],
  controllers: [AppController, AlbumController, TrackController],
  providers: [AppService],
})
export class AppModule {}
