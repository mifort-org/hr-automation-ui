export type History = HistoryElement[];

export interface HistoryElement {
  archived: boolean;
  comment: string;
  createDate: string;
  id: number;
  updateDate: string;
}

export interface CreateDate {
  date: number;
  day: number;
  hours: number;
  minutes: number;
  month: number;
  nanos: number;
  seconds: number;
  time: number;
  timezoneOffset: number;
  year: number;
}

export interface UpdateDate {
  date: number;
  day: number;
  hours: number;
  minutes: number;
  month: number;
  nanos: number;
  seconds: number;
  time: number;
  timezoneOffset: number;
  year: number;
}

export interface CommentData {
  comment: string;
  id?: number;
  archived?: boolean;
}
