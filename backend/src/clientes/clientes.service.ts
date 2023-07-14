import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { SexoTiposService } from '../sexo_tipos/sexo_tipos.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class ClientesService {
  private readonly logger = new Logger(ClientesService.name);
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    private readonly sexoTiposService: SexoTiposService,
  ) {}

  async create(
    createClienteDto: CreateClienteDto,
  ): Promise<ApiResponse<Cliente>> {
    const cliente = await this.clienteRepository.findOne({
      where: {
        dni: createClienteDto.dni,
      },
    });

    if (cliente) throw new BadRequestException('El usuario ya existe');

    const tipoSexo = await this.sexoTiposService.findOne(
      createClienteDto.tipo_sexo_id,
    );
    if (!tipoSexo)
      throw new BadRequestException('El sexo seleccionado no existe');
    try {
      const cliente = this.clienteRepository.create(createClienteDto);
      await this.clienteRepository.save(cliente);
      return {
        statusCode: 201,
        message: 'Cliente creado con éxito',
        data: cliente,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error en el servidor, chequear logs',
      );
    }
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({
      relations: ['sexoTipo'],
      order: {
        id: 'ASC',
      },
    });
  }

  async findByDni(dni: string): Promise<Cliente[]> {
    return this.clienteRepository
      .createQueryBuilder('cliente')
      .where('cliente.dni like :dni', { dni: `${dni}%` })
      .leftJoinAndSelect('cliente.sexoTipo', 'sexoTipo')
      .orderBy('dni', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: {
        id,
      },
      relations: ['sexoTipo'],
    });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    return cliente;
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<ApiResponse<Cliente>> {
    const cliente = await this.clienteRepository.preload({
      id,
      ...updateClienteDto,
    });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    try {
      await this.clienteRepository.save(cliente);
      return {
        statusCode: 200,
        message: 'Cliente actualizado con éxito',
        data: cliente,
      };
    } catch (error) {
      this.logger.error(error);
      if (error?.code == 'ER_DUP_ENTRY') {
        throw new BadRequestException(
          'El dni ingresado ya existe en otro cliente',
        );
      }
      throw new InternalServerErrorException(
        'Error en el servidor, chequear logs',
      );
    }
  }

  async remove(id: number): Promise<ApiResponse> {
    const cliente = await this.findOne(id);
    try {
      await this.clienteRepository.remove(cliente);
      return {
        statusCode: 200,
        message: 'Cliente eliminado con éxito',
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error en el servidor, chequear logs',
      );
    }
  }
}
