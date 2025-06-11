import { Model } from 'mongoose';
import { Partido, PartidoDocument } from '../entities/partido.entity';
export declare class PartidosService {
    private partidoModel;
    constructor(partidoModel: Model<PartidoDocument>);
    findAll(): Promise<Partido[]>;
    findById(id: string): Promise<Partido | null>;
    create(data: Partial<Partido>): Promise<Partido>;
}
