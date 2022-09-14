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

export interface Color {
  [key: string]: string;
}

export const STATUS_COLOR: Color = {
  [CandidateStatus.UNEMPLOYED]: 'rgba(244, 67, 54, 1)',
  [CandidateStatus.EMPLOYED]: 'rgba(40, 194, 101, 1)',
  [CandidateStatus.CREATED]: 'rgba(0, 137, 255, 1)',
};
