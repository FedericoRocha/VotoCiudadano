import { IsString, IsInt, Min, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVotoDto {
  @ApiProperty({ example: 'Mesa 101' })
  @IsString()
  @IsNotEmpty()
  mesa: string;

  @ApiProperty({ example: 'Buenos Aires' })
  @IsString()
  @IsNotEmpty()
  provincia: string;

  @ApiProperty({ example: 'La Plata' })
  @IsString()
  @IsNotEmpty()
  localidad: string;

  @ApiProperty({ example: 'FDT' })
  @IsString()
  @IsNotEmpty()
  partidoSigla: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  cantidad?: number;
}
