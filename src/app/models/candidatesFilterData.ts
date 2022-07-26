/**
 * @typedef CandidatesFilterData
 * @prop {number} pageNumber Page number
 * @prop {number} pageSize Page size
 * @prop {string} keyword Keyword
 */

export interface CandidatesFilterData {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string[];
}
