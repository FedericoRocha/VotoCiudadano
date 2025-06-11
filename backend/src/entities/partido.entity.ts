import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PartidoDocument = Partido & Document;

@Schema({ timestamps: true })
export class Partido {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  sigla: string;

  @Prop({ required: true })
  color: string;

  // Relación con Voto (virtual)
  votos?: Types.ObjectId[];
}

export const PartidoSchema = SchemaFactory.createForClass(Partido);

// Índices para mejorar el rendimiento de búsqueda
PartidoSchema.index({ nombre: 1 });
PartidoSchema.index({ sigla: 1 }, { unique: true });
