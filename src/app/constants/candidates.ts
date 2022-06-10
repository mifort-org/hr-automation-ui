export enum ECandidateStatus {
  UNEMPLOYED = 'unemployed',
  EMPLOYED = 'employed',
  CREATED = 'created',
}

export const CANDIDATE_STATUSES = [
  {
    label: 'Unemployed',
    value: ECandidateStatus.UNEMPLOYED,
  },
  {
    label: 'Employed',
    value: ECandidateStatus.EMPLOYED,
  },
  {
    label: 'Created',
    value: ECandidateStatus.CREATED,
  },
];
