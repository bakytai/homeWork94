import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ required: true })
  trackName: string;

  @Prop({ ref: 'Album', required: true })
  album: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  duration: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
