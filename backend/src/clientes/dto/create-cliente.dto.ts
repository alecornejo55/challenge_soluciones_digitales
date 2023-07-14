import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsNumber()
  tipo_sexo_id: number;

  @IsNotEmpty()
  @IsString()
  telefono: string;
}
