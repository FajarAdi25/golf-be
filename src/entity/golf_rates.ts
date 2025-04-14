import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum ACTIVE_STATUS {
  ACTIVE = "1",
  NOT_ACTIVE = "0",
}

export enum NATIONALITY {
  MALAYSIAN = "Malaysian",
  NON_MALAYSIAN = "Non-Malaysian",
}

export enum REMARKS {
  AGENT_RATES = "Agent Rates",
  PUBLISHED_RATES = "Published Rates",
  NA = "N/A",
}

@Entity("golf_rates")
export class GolfRates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column({ nullable: true })
  golf_course: string;

  @Column("enum", { enum: NATIONALITY })
  nationality: NATIONALITY;

  @Column({ nullable: true })
  week_day: number;

  @Column({ nullable: true })
  week_day_visitor: number;

  @Column({ nullable: true })
  weekend_public_holiday: number;

  @Column({ nullable: true })
  weekend_public_holiday_visitor: number;

  @Column({ nullable: true })
  weekend_saturday_afternoon: number;

  @Column({ nullable: true })
  weekend_saturday_afternoon_visitor: number;

  @Column({ nullable: true })
  weekend_sunday_afternoon: number;

  @Column({ nullable: true })
  weekend_sunday_afternoon_visitor: number;

  @Column("enum", { enum: REMARKS, default: REMARKS.NA })
  remarks: REMARKS;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ nullable: true })
  created_by: string;

  @Column({ type: "timestamp", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date | null;

  @Column({ nullable: true })
  updated_by: string;

  @Column("enum", { enum: ACTIVE_STATUS, default: ACTIVE_STATUS.ACTIVE })
  active_status_id: ACTIVE_STATUS;
}
