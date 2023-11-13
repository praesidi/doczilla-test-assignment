export interface ITask {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  date: string;
  status: boolean;
}

export type IDate = Date | string | number | undefined;

export interface IDateRange {
  from: IDate;
  to: IDate;
}
