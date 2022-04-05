import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { CreateAlbumDto } from './create-album.dto';

@Controller('album')
export class AlbumController {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}

  @Get()
  getAll(@Query() artist: string) {
    if (artist) {
      return this.albumModel.find({ artist: artist });
    }
    return this.albumModel.find();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.albumModel.findById(id);
  }

  @Post()
  create(@Body() albumDto: CreateAlbumDto) {
    const album = new this.albumModel({
      title: albumDto.title,
      artist: albumDto.artist,
      year: albumDto.year,
    });

    return album.save();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.albumModel.deleteOne({ _id: id });
    await this.trackModel.deleteMany({ album: id });

    return { message: 'Album deleted!' };
  }
}
