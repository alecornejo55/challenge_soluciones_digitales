import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SexoTipo } from './entities/sexo_tipo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SexoTiposService {
  constructor(
    @InjectRepository(SexoTipo)
    private readonly sexoTipoRepository: Repository<SexoTipo>,
  ) {}
  async findAll() {
    return this.sexoTipoRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<SexoTipo> {
    const sexoTipo = await this.sexoTipoRepository.findOne({
      where: {
        id,
      },
    });
    if (!sexoTipo)
      throw new NotFoundException('No se encontró el tipo de dato buscado');

    return sexoTipo;
  }
}
