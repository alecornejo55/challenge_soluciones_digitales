import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { SexoTiposModule } from 'src/sexo_tipos/sexo_tipos.module';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService],
  imports: [ConfigModule, TypeOrmModule.forFeature([Cliente]), SexoTiposModule],
})
export class ClientesModule {}
