import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ProjectEntity } from '@entity/project';
import { PropertyEntity } from '@entity/property';

@Entity('flock')
export class FlockEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 255, type: 'varchar' })
  public name: string;

  @ManyToOne(() => PropertyEntity, (property) => property.flocks)
  public property: PropertyEntity;

  @OneToMany(() => ProjectEntity, (project) => project.flock)
  public projects: ProjectEntity[];

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
    projects: ProjectEntity[],
    createdAt: Date,
    updatedAt: Date | null,
    finishedAt: Date | null
  ) {
    this.id = id;
    this.name = name;
    this.property = property;
    this.projects = projects;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.finishedAt = finishedAt;
  }
}
