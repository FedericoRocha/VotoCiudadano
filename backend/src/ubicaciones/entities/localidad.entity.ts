import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LocalidadDocument = Localidad & Document;

@Schema({ timestamps: true })
export class Localidad {
  @Prop({ required: true })
  nombre: string;

  @Prop({ type: Types.ObjectId, ref: 'Provincia', required: true })
  provincia: Types.ObjectId;

  @Prop()
  codigoPostal: string;

  @Prop()
  codigoIndec: string;
}

export const LocalidadSchema = SchemaFactory.createForClass(Localidad);
