import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { FlockEntity } from '@entity/flock';
import { ProjectEntity } from '@entity/project';
import { PropertyEntity } from '@entity/property';
import { Role } from '@domain/enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 255, type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public password: string;

  @Column({ type: 'varchar' })
  public email: string;

  @Column({ length: 15, type: 'varchar' })
  public phone: string;

  @Column({ default: Role.COMMON, type: 'varchar' })
  public role: Role;

  @OneToMany(() => PropertyEntity, (property) => property.user)
  public properties: PropertyEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.user)
  public projects: ProjectEntity[];

  @OneToMany(() => FlockEntity, (flock) => flock.user)
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
    email: string,
    password: string,
    phone: string,
    role: Role,
    properties: PropertyEntity[],
    projects: ProjectEntity[],
    flocks: FlockEntity[],
    createdAt: Date,
    updatedAt: Date | null,
    finishedAt: Date | null
  ) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.role = role;
    this.properties = properties;
    this.projects = projects;
    this.flocks = flocks;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.finishedAt = finishedAt;
  }
}
