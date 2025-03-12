import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

export enum ACTIVE_STATUS {
  ACTIVE = 1,
  NOT_ACTIVE = 0,
}

@Entity("company")
export class Customers {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  company_name: string;
  @Column({ nullable: true })
  company_code: string;
  @Column({ nullable: true })
  company_address: string;
  @Column({ nullable: true })
  company_address_building: string;
  @Column({ nullable: true })
  company_street_number: number;
  @Column({ nullable: true })
  company_street_name: string;
  @Column({ nullable: true })
  company_building_no: number;
  @Column({ nullable: true })
  company_building_unit: string;
  @Column({ nullable: true })
  company_building_name: string;
  @Column({ nullable: true })
  company_city: string;
  @Column({ nullable: true })
  company_state: string;
  @Column({ nullable: true })
  company_country: string;
  @Column({ nullable: true })
  company_zip_code: number;
  @Column({ nullable: true })
  company_fax: number;
  @Column({ nullable: true })
  company_website: string;
  @Column({ nullable: true })
  company_pic: string;
  @Column({ nullable: true })
  company_designation: string;
  @Column({ nullable: true })
  company_email: string;
  @Column({ nullable: true })
  company_phone: string;
  @Column("enum", { enum: ACTIVE_STATUS, default: ACTIVE_STATUS.ACTIVE })
  active_status_id: ACTIVE_STATUS;
  @Column({ type: "datetime" })
  created_at: Date | null;
  @Column({ nullable: true })
  created_by: string;
  @Column({ type: "datetime", nullable: true })
  updated_at: Date | null;
  @Column({ nullable: true })
  updated_by: string;
  // @Column({ type: "datetime", nullable: true })
  // deleted_at: Date | null;
  // @Column({ nullable: true })
  // deleted_by: string;
}
