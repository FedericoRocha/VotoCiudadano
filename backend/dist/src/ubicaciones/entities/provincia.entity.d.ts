import { Document } from 'mongoose';
export type ProvinciaDocument = Provincia & Document;
export declare class Provincia {
    nombre: string;
    codigoIndec: string;
}
export declare const ProvinciaSchema: import("mongoose").Schema<Provincia, import("mongoose").Model<Provincia, any, any, any, Document<unknown, any, Provincia, any> & Provincia & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Provincia, Document<unknown, {}, import("mongoose").FlatRecord<Provincia>, {}> & import("mongoose").FlatRecord<Provincia> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
