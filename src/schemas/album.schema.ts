import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true })
  title: string;

  @Prop({ ref: 'Artist', required: true })
  artist: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  year: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
