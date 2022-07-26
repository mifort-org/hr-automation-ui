/**
 * @typedef CommunicationHistory
 * @prop {number} id Id
 * @prop {string} createDate Creation date
 * @prop {string} updateDate Update date
 * @prop {string} comment Comment text
 * @prop {boolean} archived Is archived
 */

export interface CommunicationHistory {
  id: number;
  createDate: string;
  updateDate: string;
  comment: string;
  archived: boolean;
}
