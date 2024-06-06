import { AddressEntity } from '@entity/address';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { FlockEntity } from '@entity/flock';
import { UserEntity } from '@entity/user';

@Entity('property')
export class PropertyEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 255, type: 'varchar' })
  public name: string;

  @Column({ type: 'float' })
  public totalArea: number;

  @OneToOne(() => AddressEntity, { cascade: true })
  @JoinColumn()
  public address: AddressEntity;

  @ManyToOne(() => UserEntity, (user) => user.properties)
  public user: UserEntity;

  @OneToMany(() => FlockEntity, (flock) => flock.property)
  public flocks: FlockEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true, type: 'timestamp' })
  public updatedAt: Date | null;

  @Column({ name: 'finishedAt', nullable: true, type: 'timestamp' })
  public finishedAt: Date | null;

  public constructor(
    id: string,
    name: string,
    totalArea: number,
    address: AddressEntity,
    user: UserEntity,
    flocks: FlockEntity[],
    createdAt: Date,
    updatedAt: Date | null,
    finishedAt: Date | null
  ) {
    this.id = id;
    this.name = name;
    this.totalArea = totalArea;
    this.address = address;
    this.user = user;
    this.flocks = flocks;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.finishedAt = finishedAt;
  }
}
