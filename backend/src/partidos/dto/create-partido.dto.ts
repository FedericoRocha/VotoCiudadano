import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePartidoDto {
  @ApiProperty({ example: 'Unión Cívica Radical' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'UCR' })
  @IsString()
  @IsNotEmpty()
  sigla: string;

  @ApiProperty({ example: '#FF0000' })
  @IsString()
  @IsNotEmpty()
  color: string;
}
