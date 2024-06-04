import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 255, type: 'varchar' })
  public name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true, type: 'timestamp' })
  public updatedAt: Date | null;

  @Column({ name: 'finishedAt', nullable: true, type: 'timestamp' })
  public finishedAt: Date | null;

  public constructor(
    id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date | null,
    finishedAt: Date | null
  ) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.finishedAt = finishedAt;
  }
}
