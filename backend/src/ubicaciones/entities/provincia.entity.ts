import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProvinciaDocument = Provincia & Document;

@Schema({ timestamps: true })
export class Provincia {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop()
  codigoIndec: string;
}

export const ProvinciaSchema = SchemaFactory.createForClass(Provincia);
