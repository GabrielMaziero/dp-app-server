import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 500 })
  name: string;
  @Column()
  email: string;
  @Column()
  gender?: string;
  @Column()
  birthday?: string;
  @Column({ nullable: true })
  accessToken?: string;
}