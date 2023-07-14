import { SexoTipo } from 'src/sexo_tipos/entities/sexo_tipo.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'clientes' })
export class Cliente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Column('varchar', { length: 8, nullable: false })
  dni: string;

  @Column('varchar', { length: 100, nullable: false })
  nombre: string;

  @Column('varchar', { length: 100, nullable: false })
  apellido: string;

  @Column('integer', { nullable: false })
  tipo_sexo_id: number;

  @Column('varchar', { length: 50, nullable: false })
  telefono: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP', nullable: false })
  fecha_hora_creacion: string;

  @Column('datetime', { nullable: true })
  fecha_hora_modificacion: Date;

  @ManyToOne(() => SexoTipo, (sexoTipo) => sexoTipo.cliente)
  @JoinColumn({ name: 'tipo_sexo_id' })
  sexoTipo: SexoTipo;

  @BeforeUpdate()
  updateDates() {
    this.fecha_hora_modificacion = new Date();
  }
}
