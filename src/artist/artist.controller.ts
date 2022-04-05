import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Track, TrackDocument } from '../schemas/track.schema';
import { CreateArtistDto } from './create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {
    this.artistModel = artistModel;
  }

  @Get()
  getAll() {
    return this.artistModel.find();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.artistModel.findById(id);
  }

  @Post()
  create(@Body() artistDto: CreateArtistDto) {
    const artist = new this.artistModel({
      name: artistDto.name,
      info: artistDto.info,
    });

    return artist.save();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const albums = await this.albumModel.find({ artist: id });
    await this.artistModel.deleteOne({ _id: id });
    await this.albumModel.deleteMany({ artist: id });
    await this.trackModel.deleteMany({ album: { $in: albums } });

    return { message: 'Artist deleted!' };
  }
}
