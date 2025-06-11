import { Document, Types } from 'mongoose';
import { Partido } from './partido.entity';
export type VotoDocument = Voto & Document;
export declare class Voto {
    mesa: string;
    provincia: string;
    localidad: string;
    partido: Types.ObjectId | Partido;
    cantidad: number;
}
export declare const VotoSchema: import("mongoose").Schema<Voto, import("mongoose").Model<Voto, any, any, any, Document<unknown, any, Voto, any> & Voto & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Voto, Document<unknown, {}, import("mongoose").FlatRecord<Voto>, {}> & import("mongoose").FlatRecord<Voto> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
