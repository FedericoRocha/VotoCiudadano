import { PartidosService } from './partidos.service';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { Partido } from '../entities/partido.entity';
export declare class PartidosController {
    private readonly partidosService;
    constructor(partidosService: PartidosService);
    findAll(): Promise<Partido[]>;
    findOne(id: string): Promise<Partido>;
    create(data: CreatePartidoDto): Promise<Partido>;
}
