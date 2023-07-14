import { Module } from '@nestjs/common';
import { SexoTiposService } from './sexo_tipos.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SexoTipo } from './entities/sexo_tipo.entity';
import { SexoTiposController } from './sexo_tipos.controller';

@Module({
  providers: [SexoTiposService],
  imports: [ConfigModule, TypeOrmModule.forFeature([SexoTipo])],
  exports: [SexoTiposService],
  controllers: [SexoTiposController],
})
export class SexoTiposModule {}
