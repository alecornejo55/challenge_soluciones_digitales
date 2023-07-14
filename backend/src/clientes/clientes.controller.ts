import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { Cliente } from './entities/cliente.entity';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createClienteDto: CreateClienteDto,
  ): Promise<ApiResponse<Cliente>> {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  findAll(): Promise<Cliente[]> {
    return this.clientesService.findAll();
  }

  @Get('dni/:dni')
  findByDni(@Param('dni') dni: string): Promise<Cliente[]> {
    return this.clientesService.findByDni(dni);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return this.clientesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    return this.clientesService.update(id, updateClienteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.remove(id);
  }
}
