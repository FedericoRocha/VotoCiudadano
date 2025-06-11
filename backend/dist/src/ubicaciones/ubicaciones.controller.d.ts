import { UbicacionesService } from './ubicaciones.service';
export declare class UbicacionesController {
    private readonly ubicacionesService;
    constructor(ubicacionesService: UbicacionesService);
    getProvincias(): Promise<(import("mongoose").Document<unknown, {}, import("./entities/provincia.entity").ProvinciaDocument, {}> & import("./entities/provincia.entity").Provincia & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getProvincia(id: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/provincia.entity").ProvinciaDocument, {}> & import("./entities/provincia.entity").Provincia & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getLocalidadesByProvincia(provinciaId: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/localidad.entity").LocalidadDocument, {}> & import("./entities/localidad.entity").Localidad & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getLocalidad(id: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/localidad.entity").LocalidadDocument, {}> & import("./entities/localidad.entity").Localidad & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getEscuelasByLocalidad(localidadId: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/escuela.entity").EscuelaDocument, {}> & import("./entities/escuela.entity").Escuela & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getEscuela(id: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/escuela.entity").EscuelaDocument, {}> & import("./entities/escuela.entity").Escuela & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
