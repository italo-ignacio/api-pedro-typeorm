import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { PropertyEntity } from '@entity/property';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 9, type: 'varchar' })
  public zipCode: string;

  @Column({ length: 50, type: 'varchar' })
  public state: string;

  @Column({ length: 50, type: 'varchar' })
  public city: string;

  @Column({ length: 255, type: 'varchar' })
  public street: string;

  @Column({ length: 20, type: 'varchar' })
  public number: string;

  @OneToOne(() => PropertyEntity, (property) => property.address)
  public property: PropertyEntity;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
  public updatedAt: Date | null;

  @Column({ name: 'finishedAt', nullable: true, type: 'timestamp' })
  public finishedAt: Date | null;

  public constructor(
    id: string,
    zipCode: string,
    state: string,
    city: string,
    street: string,
    number: string,
    property: PropertyEntity,
    createdAt: Date,
    updatedAt: Date | null,
    finishedAt: Date | null
  ) {
    this.id = id;
    this.zipCode = zipCode;
    this.state = state;
    this.city = city;
    this.street = street;
    this.number = number;
    this.property = property;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.finishedAt = finishedAt;
  }
}
