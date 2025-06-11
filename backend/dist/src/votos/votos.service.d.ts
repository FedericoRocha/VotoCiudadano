import { Model } from 'mongoose';
import { Voto, VotoDocument } from '../entities/voto.entity';
import { Partido } from '../entities/partido.entity';
export declare class VotosService {
    private votoModel;
    private partidoModel;
    constructor(votoModel: Model<VotoDocument>, partidoModel: Model<Partido>);
    findAll(): Promise<Voto[]>;
    findById(id: string): Promise<Voto | null>;
    findFiltered(provincia?: string, localidad?: string, partidoId?: string): Promise<Voto[]>;
    getVotingStats(): Promise<{
        totalVotos: number;
        porPartido: any[];
        porProvincia: any[];
        topLocalidades: any[];
        timestamp: Date;
    }>;
    stats(): Promise<{
        total: number;
        totalPorPartido: any[];
    }>;
    create(data: {
        mesa: string;
        provincia: string;
        localidad: string;
        partidoSigla: string;
        cantidad?: number;
    }): Promise<Voto>;
}
