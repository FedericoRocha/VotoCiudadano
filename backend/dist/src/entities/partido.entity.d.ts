import { Document, Types } from 'mongoose';
export type PartidoDocument = Partido & Document;
export declare class Partido {
    nombre: string;
    sigla: string;
    color: string;
    votos?: Types.ObjectId[];
}
export declare const PartidoSchema: import("mongoose").Schema<Partido, import("mongoose").Model<Partido, any, any, any, Document<unknown, any, Partido, any> & Partido & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Partido, Document<unknown, {}, import("mongoose").FlatRecord<Partido>, {}> & import("mongoose").FlatRecord<Partido> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
