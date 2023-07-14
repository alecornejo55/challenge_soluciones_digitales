import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfiguration } from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SexoTiposModule } from './sexo_tipos/sexo_tipos.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [AppConfiguration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.host'),
        port: +configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    ClientesModule,
    SexoTiposModule,
    CommonModule,
  ],
})
export class AppModule {}
