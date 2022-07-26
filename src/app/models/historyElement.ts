/**
 * @typedef HistoryElement
 * Represents one history episode of communication with the candidate
 */

export interface HistoryElement {
  archived: boolean;
  comment: string;
  createDate: string;
  id: number;
  updateDate: string;
}
