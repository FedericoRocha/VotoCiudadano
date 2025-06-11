import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Localidad } from './localidad.entity';

export type EscuelaDocument = Escuela & Document;

@Schema({ timestamps: true })
export class Escuela {
  @Prop({ required: true })
  nombre: string;

  @Prop({ type: Types.ObjectId, ref: 'Localidad', required: true })
  localidad: Types.ObjectId;

  @Prop({ required: true })
  direccion: string;

  @Prop()
  telefono: string;

  @Prop()
  codigo: string;
}

export const EscuelaSchema = SchemaFactory.createForClass(Escuela);
