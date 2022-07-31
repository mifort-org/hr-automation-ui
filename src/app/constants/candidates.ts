export enum CandidateStatus {
  UNEMPLOYED = 'unemployed',
  EMPLOYED = 'employed',
  CREATED = 'created',
}

export const CANDIDATE_STATUSES = [
  {
    label: 'Unemployed',
    value: CandidateStatus.UNEMPLOYED,
  },
  {
    label: 'Employed',
    value: CandidateStatus.EMPLOYED,
  },
  {
    label: 'Created',
    value: CandidateStatus.CREATED,
  },
];
