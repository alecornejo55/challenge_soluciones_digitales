import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sexo_tipos' })
export class SexoTipo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 100, nullable: false })
  nombre: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP', nullable: false })
  fecha_hora_creacion: string;

  @OneToMany(() => Cliente, (cliente) => cliente.sexoTipo)
  cliente: Cliente;
}
