export interface HistoryElement {
  archived: boolean;
  comment: string;
  createDate: string;
  id: number;
  updateDate: string;
}

export interface CommentData {
  comment: string;
  id?: number;
  archived?: boolean;
}
