import { Document, Types } from 'mongoose';
export type LocalidadDocument = Localidad & Document;
export declare class Localidad {
    nombre: string;
    provincia: Types.ObjectId;
    codigoPostal: string;
    codigoIndec: string;
}
export declare const LocalidadSchema: import("mongoose").Schema<Localidad, import("mongoose").Model<Localidad, any, any, any, Document<unknown, any, Localidad, any> & Localidad & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Localidad, Document<unknown, {}, import("mongoose").FlatRecord<Localidad>, {}> & import("mongoose").FlatRecord<Localidad> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
