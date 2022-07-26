/**
 * @typedef CommentData
 * @prop {string} comment Comment text
 * @prop {number} id Id
 * @prop {boolean} archived Is archived
 */

export interface CommentData {
  comment: string;
  id?: number;
  archived?: boolean;
}
