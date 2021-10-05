import { IsString, IsUUID } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  @IsUUID()
  id: string;

  @Column({ name: 'firstname' })
  @IsString()
  firstName: string;

  @Column({ name: 'lastname' })
  @IsString()
  lastName: string;
}
