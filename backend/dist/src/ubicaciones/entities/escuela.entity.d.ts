import { Document, Types } from 'mongoose';
export type EscuelaDocument = Escuela & Document;
export declare class Escuela {
    nombre: string;
    localidad: Types.ObjectId;
    direccion: string;
    telefono: string;
    codigo: string;
}
export declare const EscuelaSchema: import("mongoose").Schema<Escuela, import("mongoose").Model<Escuela, any, any, any, Document<unknown, any, Escuela, any> & Escuela & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Escuela, Document<unknown, {}, import("mongoose").FlatRecord<Escuela>, {}> & import("mongoose").FlatRecord<Escuela> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
