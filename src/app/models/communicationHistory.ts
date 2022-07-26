/**
 * @typedef CommunicationHistory
 * Represents full description of communication history with candidate
 */

export interface CommunicationHistory {
  id: number;
  createDate: string;
  updateDate: string;
  comment: string;
  archived: boolean;
}
