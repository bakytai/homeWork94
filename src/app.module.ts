import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumController } from './album/album.controller';

@Module({
  imports: [],
  controllers: [AppController, AlbumController],
  providers: [AppService],
})
export class AppModule {}
