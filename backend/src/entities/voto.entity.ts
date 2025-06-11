import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Partido } from './partido.entity';

export type VotoDocument = Voto & Document;

@Schema({ timestamps: true })
export class Voto {
  @Prop({ required: true })
  mesa: string;

  @Prop({ required: true })
  provincia: string;

  @Prop({ required: true })
  localidad: string;

  @Prop({ type: Types.ObjectId, ref: 'Partido', required: true })
  partido: Types.ObjectId | Partido;

  @Prop({ required: true, min: 0 })
  cantidad: number;
}

export const VotoSchema = SchemaFactory.createForClass(Voto);

// Índices para mejorar el rendimiento de búsqueda
VotoSchema.index({ mesa: 1 });
VotoSchema.index({ provincia: 1 });
VotoSchema.index({ localidad: 1 });
VotoSchema.index({ partido: 1 });
