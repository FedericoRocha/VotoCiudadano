import { VotosService } from './votos.service';
import { CreateVotoDto } from './dto/create-voto.dto';
import { Voto } from '../entities/voto.entity';
export declare class VotosController {
    private readonly votosService;
    constructor(votosService: VotosService);
    findAll(provincia?: string, localidad?: string, partidoId?: string): Promise<Voto[]>;
    findOne(id: string): Promise<Voto>;
    getStats(): Promise<{
        totalVotos: number;
        porPartido: any[];
        porProvincia: any[];
        topLocalidades: any[];
        timestamp: Date;
    }>;
    create(data: CreateVotoDto): Promise<Voto>;
    getEstadisticas(): Promise<{
        total: number;
        totalPorPartido: any[];
    }>;
}
