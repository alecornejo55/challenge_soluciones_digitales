import { Controller, Get } from '@nestjs/common';
import { SexoTipo } from './entities/sexo_tipo.entity';
import { SexoTiposService } from './sexo_tipos.service';

@Controller('sexo-tipos')
export class SexoTiposController {
  constructor(private readonly sexoTiposService: SexoTiposService) {}
  @Get()
  findAll(): Promise<SexoTipo[]> {
    return this.sexoTiposService.findAll();
  }
}
