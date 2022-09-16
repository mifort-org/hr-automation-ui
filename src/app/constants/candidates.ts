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
  [CandidateStatus.UNEMPLOYED]: '#F44336',
  [CandidateStatus.EMPLOYED]: '#28C265',
  [CandidateStatus.CREATED]: '#0089FF',
};
