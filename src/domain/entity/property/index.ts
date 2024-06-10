import { AddressEntity } from '@domain/entity/address';
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
import { FlockEntity } from '@domain/entity/flock';
import { ProjectEntity } from '@domain/entity/project';
import { UserEntity } from '@domain/entity/user';

@Entity('property')
export class PropertyEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 255, type: 'varchar' })
  public name: string;

  @Column({ type: 'float' })
  public totalArea: number;

  @OneToOne(() => AddressEntity, { cascade: true, eager: true })
  @JoinColumn()
  public address: AddressEntity;

  @ManyToOne(() => UserEntity, (user) => user.properties)
  public user: UserEntity;

  @OneToMany(() => ProjectEntity, (project) => project.property)
  public projects: ProjectEntity[];

  @OneToMany(() => FlockEntity, (flock) => flock.property)
  public flocks: FlockEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
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
    projects: ProjectEntity[],
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
    this.projects = projects;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.finishedAt = finishedAt;
  }
}
