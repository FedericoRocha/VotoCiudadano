import { Model } from 'mongoose';
import { Provincia, ProvinciaDocument } from './entities/provincia.entity';
import { Localidad, LocalidadDocument } from './entities/localidad.entity';
import { Escuela, EscuelaDocument } from './entities/escuela.entity';
export declare class UbicacionesService {
    private provinciaModel;
    private localidadModel;
    private escuelaModel;
    constructor(provinciaModel: Model<ProvinciaDocument>, localidadModel: Model<LocalidadDocument>, escuelaModel: Model<EscuelaDocument>);
    findAllProvincias(): Promise<(import("mongoose").Document<unknown, {}, ProvinciaDocument, {}> & Provincia & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findProvinciaById(id: string): Promise<(import("mongoose").Document<unknown, {}, ProvinciaDocument, {}> & Provincia & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    findLocalidadesByProvincia(provinciaId: string): Promise<(import("mongoose").Document<unknown, {}, LocalidadDocument, {}> & Localidad & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findLocalidadById(id: string): Promise<(import("mongoose").Document<unknown, {}, LocalidadDocument, {}> & Localidad & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    findEscuelasByLocalidad(localidadId: string): Promise<(import("mongoose").Document<unknown, {}, EscuelaDocument, {}> & Escuela & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findEscuelaById(id: string): Promise<(import("mongoose").Document<unknown, {}, EscuelaDocument, {}> & Escuela & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
