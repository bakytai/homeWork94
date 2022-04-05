import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { Model } from 'mongoose';
import { CreateTrackDto } from './create-track.dto';

@Controller('track')
export class TrackController {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}

  @Get()
  getAll(@Query() album: string) {
    if (album) {
      return this.trackModel.find({ _id: album });
    }
    return this.trackModel.find();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.trackModel.findById(id);
  }

  @Post()
  create(@Body() trackDto: CreateTrackDto) {
    const track = new this.trackModel({
      trackName: trackDto.trackName,
      album: trackDto.album,
      duration: trackDto.duration,
    });

    return track.save();
  }
}
