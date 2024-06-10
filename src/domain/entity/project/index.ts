import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { FlockEntity } from '@domain/entity/flock';
import { PropertyEntity } from '@domain/entity/property';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 255, type: 'varchar' })
  public name: string;

  @ManyToOne(() => PropertyEntity, (property) => property.projects)
  public property: PropertyEntity;

  @ManyToOne(() => FlockEntity, (flock) => flock.projects)
  public flock: FlockEntity;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
  public updatedAt: Date | null;

  @Column({ name: 'finishedAt', nullable: true, type: 'timestamp' })
  public finishedAt: Date | null;

  public constructor(
    id: string,
    name: string,
    property: PropertyEntity,
    flock: FlockEntity,
    createdAt: Date,
    updatedAt: Date | null,
    finishedAt: Date | null
  ) {
    this.id = id;
    this.name = name;
    this.property = property;
    this.flock = flock;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.finishedAt = finishedAt;
  }
}
