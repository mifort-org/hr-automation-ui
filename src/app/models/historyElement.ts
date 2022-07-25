/**
 * @typedef HistoryElement
 * @prop {boolean} archived Is archived
 * @prop {string} comment Comment text
 * @prop {string} createDate Creation date
 * @prop {number} id Id
 * @prop {string} updateDate Update date
 */

export interface HistoryElement {
  archived: boolean;
  comment: string;
  createDate: string;
  id: number;
  updateDate: string;
}
